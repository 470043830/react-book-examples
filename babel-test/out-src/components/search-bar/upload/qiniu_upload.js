import Taro from '@tarojs/taro';
/**
 * @description 七牛上传组件
 * 1. const qiniuCtx = new QiniuPload();
 * 2. qiniuCtx.upload(filePath, key, name);
 * 3. return Promise(<resolve>, <reject>);
 * @export
 * @class QiniuUpload
 */

export default class QiniuUpload {
  constructor() {
    this.qiniuToken = '';
    this.getQniuTokenStatus = '';
    this.uploadUrl = 'https://upload.qiniup.com/';
    this.API = null;

    this.initQiniu = () => {
      return new Promise((resolve, reject) => {
        this.getQniuTokenStatus = 'getting';

        try {
          this.requestNoToken().then(res => {
            const {
              uptoken
            } = res.data;

            if (uptoken && uptoken.length > 0) {
              this.qiniuToken = uptoken;
              resolve();
            } else {
              console.error('qiniuUploader cannot get your token, please check the uptokenURL or server');
              reject();
            }
          });
        } catch (e) {
          console.error('qiniu UploadToken is null, please check the init config or networking: ' + e);
          reject();
        }
      });
    };

    this.waitCurQequest = () => {
      return new Promise((resolve, reject) => {
        let waitMaxTime = 3000;
        const timer = setInterval(() => {
          if (this.qiniuToken) {
            clearInterval(timer);
            resolve();
          } else {
            waitMaxTime -= 50;

            if (waitMaxTime < 0) {
              clearInterval(timer);
              reject();
            }
          }
        }, 50);
      });
    };
    /**
     * @description 不直接return，因为需要处理success返回数据
     * @memberof QiniuUpload
     */


    this.doUpload = (filePath, key, name) => {
      return new Promise((resolve, reject) => {
        Taro.uploadFile({
          url: this.uploadUrl,
          filePath,
          name: 'file',
          formData: {
            token: this.qiniuToken,
            key,
            name
          },
          success: res => {
            const result = JSON.parse(res.data);
            const {
              error
            } = result;

            if (error) {
              // 一般是失效的token，初始化token，再次上传时重新获取
              this.qiniuToken = '';
              this.getQniuTokenStatus = '';
              reject(error);
            } else {
              resolve(result);
            }
          },
          fail: err => {
            // 网络错误
            reject(err);
          }
        });
      });
    };

    this.upload = (filePath, key, name, api) => {
      if (api) this.API = api;

      if (!this.qiniuToken) {
        if (this.getQniuTokenStatus === 'getting') {
          try {
            return this.waitCurQequest().then(() => {
              return this.doUpload(filePath, key, name);
            });
          } catch (e) {
            return this.initQiniu().then(() => {
              return this.doUpload(filePath, key, name);
            });
          }
        } else {
          return this.initQiniu().then(() => {
            return this.doUpload(filePath, key, name);
          });
        }
      } else {
        return this.doUpload(filePath, key, name);
      }
    };
  }
  /**
   * 不需要token的请求
   * @param {String} api 接口路由
   * @param {Object} params 参数
   * @param {String} method
   * @param {Boolean} pathabs
   */


  requestNoToken() {
    return new Promise((resolve, reject) => {
      Taro.request({
        url: this.API || `https://www.szwego.com/service/get_qiuniu_token.jsp`,
        data: {
          client_type: 'miniapp'
        },
        header: {
          'Content-Type': 'application/json'
        },
        method: 'GET',
        success: res => {
          resolve(res);
        },
        fail: reject
      });
    });
  }

}