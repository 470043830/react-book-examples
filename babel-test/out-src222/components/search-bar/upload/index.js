/* eslint-disable import/first */
import Taro from '@tarojs/taro';
import QiniuUpload from './qiniu_upload.js';
const qiniuCtx = new QiniuUpload();
export default class UpFile {
  /**生成随机字符串 */
  makeRandomName() {
    return 'tempwg63_' + Date.now() + '_' + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
  }

  onUpImg(params = {}) {
    return new Promise(resovle => {
      Taro.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        success: res => {
          const path = res.tempFilePaths[0];
          Taro.showLoading({
            title: '上传中...'
          });

          try {
            const randomKey = this.makeRandomName();
            const cdnUrl = params.spliceImgUrlAPI || 'https://xcimg.szwego.com/';
            qiniuCtx.upload(path, randomKey, randomKey, params.getImgUrlAPI).then(result => {
              const {
                key
              } = result;
              const filterImg = cdnUrl + key;
              resovle(filterImg);
            });
          } catch (error) {
            console.log(error);
            Taro.hideLoading();
            Taro.showToast({
              icon: 'none',
              title: '上传失败，请重新尝试...'
            });
          }
        }
      });
    });
  } // render() {
  //     const obj = {
  //         ...this.props,
  //         onUpImg: this.onUpImg.bind(this),
  //     };
  //     console.log(obj);
  //     return <WgSearchBar {...obj} />;
  // }


}