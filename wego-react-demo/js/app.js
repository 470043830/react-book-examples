/* eslint-disable no-undef */
var App = 'app.js';
var VERSION = 100;

window._wxReady = false;
$(document).ready(function () {
    $.ajaxSetup({
        cache: false
    });
});
var _debug = false;
var allUrl = document.location.href;
if (allUrl.indexOf('szwego.com') || allUrl.indexOf('szwego.com') >= 0) {
    _debug = false;
} else {
    _debug = true;
}


$('#J_GoTop').click(function () {

    $('html, body').animate({
        scrollTop: 0
    }, 'fast');
});

motify = {
    show: function (texts, times, callback) {
        var t = 2000;
        var text = '';

        (typeof texts == 'string') && (text = texts.split('#$&')[0]);

        if (!$('body').is('.motify') && $('.motify').length <= 0) {
            //$("body").append("<div class='motify'><div class='motify-inner'></div></div>")
            $('body').prepend('<div class=\'motify\'><div class=\'motify-inner\'></div></div>')
        }
        $('.motify').css('display', 'block');
        $('.motify-inner').text(text);

        switch (typeof times) {
            case 'undefined':
                times = t;
                break;

            case 'number':
                times <= 0 && (times = t);
                break;

            case 'function':
                callback = times;
                times = 1200;
                break;

            default:
                times = t;
                break;
        }

        setTimeout(function () {
            $('.motify').css('display', 'none');
            typeof callback === 'function' && callback();
        }, times)
    }
}

function getBtnLoadingSrc() {
    return 'data:image/gif;base64,R0lGODlhEAAQAMQRACYmJri4u5CQkKGhoVxcXLq6ugYGBm5ubisrKzY2Nri4uI2NjWpqalhYWJ+fnwAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4NTZDOEExMEMyMjI2ODExODhDNjg0NzQyMTc1OEU5OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4RTIzQzY2RUJCMDExMUUxOEM4RkFCQ0U5MUQxQjAzQSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4RTIzQzY2REJCMDExMUUxOEM4RkFCQ0U5MUQxQjAzQSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjhCNkM4QTEwQzIyMjY4MTE4OEM2ODQ3NDIxNzU4RTk4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg1NkM4QTEwQzIyMjY4MTE4OEM2ODQ3NDIxNzU4RTk4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQcAEQAsAAAAABAAEAAABU9gJI4RBJGkopAm+Tyiuoqt+MKxSp/Rjcqlkw8V0Y1exGTSwWQSAVBo04mKQpXY0WJBajSSWy6DEfESUGHRWGTWbkdrduMcecPJI68yjgoBACH5BAUHABEALAAAAAAQABAAAAVPYCSOkaKQpOOQJglBorqKrfjCsUqf0Y3KpZMPFdGNXsRkcsFkEh9QaNOJikKV2BGDQQIAkltuoxHxIlBh0Vhk1m5HazbgHHnDySOvMo4KAQAh+QQFBwARACwAAAAAEAAQAAAFT2AkjpHjkOSykCapKKK6iq34wrFKn9GNyqWTDxXRjV7EZJLBZBIhUGjTiYpCldhRo0F6PJJbbiIR8RpQYdFYZNZuR2v24xx5w8kjrzKOCgEAIfkEBQcAEQAsAAAAABAAEAAABU5gJI7RspAkw5Am6Tiiuoqt+MKxSp/Rjcqlkw8V0Y1exGSywWQSFVBo04mKQpXYUSJBgkCSW+7jEfF+SWHRWGTWbkdrtlf0hpNH82QcFQIAIfkEBQcAEQAsAAAAABAAEAAABU9gJI4Rw5Bk05AmuSyiuoqt+MKxSp/Rjcqlkw8V0Y1exGQywWQSHVBo04mKQpXY0eNBUiiSWy4EEvEWUGHRWGTWbkdrtuIcecPJI68yjgoBACH5BAUHABEALAAAAAAQABAAAAVPYCSOUdOQZJKQJskworqKrfjCsUqf0Y3KpZMPFdGNXsRk8sFkEhdQaNOJikKV2BEEQnI4kluuQhHxDlBh0Vhk1m5Ha7bjHHnDySOvMo4KAQAh+QQFBwARACwAAAAAEAAQAAAFT2AkjlGSkOTzkCbZNKK6iq34wrFKn9GNyqWTDxXRjV7EZBLCZBIZUGjTiYpCldhRIEBaLJJbrsMR8QpQYdFYZNZuR2v24hx5w8kjrzKOCgEAIfkEBQcAEQAsAAAAABAAEAAABU9gJI7R85AkBJEmmSSiuoqt+MKxSp/Rjcqlkw8V0Y1exGRSwWQSG1Bo04mKQpXYkcNBYjCSW+5iEfEeUGHRWGTWbkdrNuMcecPJI68yjgoBADs='
}

function getLoadingSrc() {
    return 'data:image/gif;base64,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'
}

function getLoadingImg(txtTmp) {
    var txt = txtTmp || '正在加载...';

    return '<div class="loadingImg"><img src="' + getLoadingSrc() + '" width="109" height="75"><span class="loading-txt" style="color:#999;">' + txt + '</span></div>'
}

loading = {
    is_loading: false,
    text_bak: '',
    btn_obj: null,
    is_btn: false,
    show: function (obj, newTxt) {
        if (this.is_loading) {
            return
        }


        this.text_bak = obj.text()
        this.btn_obj = obj;
        this.is_loading = true;

        if (newTxt && newTxt.length > 0) {
            this.btn_obj.text(newTxt)
        }

        if (obj.get(0).tagName.toLowerCase() == 'button') {
            obj.attr('disabled', 'true');
        } else {
            obj.css({
                'pointer-events': 'none'
            });
        }
        this.is_btn = true;

        obj.prepend('<img src="' + getBtnLoadingSrc() + '" width="10" height="10">&nbsp;')
    },
    remove: function () {
        // $(".loader").remove()
        this.is_loading = false;

        // this.text_bak为空时，无法remove
        // if (this.btn_obj && this.text_bak) {
        if (this.btn_obj) {
            this.btn_obj.text(this.text_bak)
        }

        if (this.is_btn) {
            this.is_btn = false;
            this.btn_obj.removeAttr('disabled').css({
                'pointer-events': 'auto'
            });
        }

    }
}

loadingImg = {
    is_loading: false,
    show: function (obj, txtTmp) {
        if (this.is_loading) {
            return
        }
        this.is_loading = true;

        txtTmp ? obj.after(getLoadingImg(txtTmp)) : obj.after(getLoadingImg());
    },
    remove: function () {
        $('.loadingImg').remove()
        this.is_loading = false;
    }
}


$('.js-anchor-back').click(function (e) {
    //location.replace("")
    //window.history.replaceState(null, null, "");
    $(this).parent().parent().hide();
    window.history.replaceState(null, null, location.href.split('#')[0]);
    // history.go(-1)
    return false
});

$('.js-open-anchor').click(function (e) {
    //window.history.replaceState(null, null, $(this).attr("href"));
    //location.replace($(this).attr("href"))

});

var addEvent = function (elId, listener) {
    document.getElementById(elId)
        .addEventListener('click', function (e) {
            if (!window.WeixinJSBridge) {
                alert('请确认您是在微信内置浏览器中打开的');
                e.preventDefault();
                return false;
            }
            listener(this, e);
        }, false);
};

function changeShareURL(url) {
    // if (isMobile.AppClient()){
    //     return url;
    // }
    var share_link = url;
    var strs = new Array();
    strs = url.split('.')
    share_link = url.replace(strs[0], 'https://www')
    return share_link;
}

function shareFriend(theData, successDo, cancelDo) {
    wx.onMenuShareAppMessage({
        title: theData.title, // 分享标题
        desc: theData.desc, // 分享描述
        link: changeShareURL(theData.link), // 分享链接
        imgUrl: theData.cover, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
            if (successDo) {
                successDo();
            }
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            if (cancelDo) {
                cancelDo();
            }
            // alert(JSON.stringify(theData));
            // alert(this.title+"\n"+this.desc+"\n"+this.link+"\n"+this.imgUrl);
            console.log('theData:\n' + theData);
            console.log('wx:\n' + this.title + '\n' + this.desc + '\n' + this.link + '\n' + this.imgUrl);
        }
    });

}

function shareTimeline(theData, successDo, cancelDo) {
    wx.onMenuShareTimeline({
        title: theData.title, // 分享标题
        desc: theData.desc, // 分享描述
        link: changeShareURL(theData.link), // 分享链接
        imgUrl: theData.cover, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
            if (successDo) {
                successDo();
            }
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            if (cancelDo) {
                cancelDo();
            }
            // alert(JSON.stringify(theData));
            // alert(this.title+"\n"+this.desc+"\n"+this.link+"\n"+this.imgUrl);
            console.log('theData:\n' + theData);
            console.log('wx:\n' + this.title + '\n' + this.desc + '\n' + this.link + '\n' + this.imgUrl);
        }

    });
}

function shareQZone(theData, successDo, cancelDo) {
    wx.onMenuShareQZone({
        title: theData.title, // 分享标题
        desc: theData.desc, // 分享描述
        link: theData.link, // 分享链接
        imgUrl: theData.cover, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            if (successDo) {
                successDo();
            }
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            if (cancelDo) {
                cancelDo();
            }
            // alert(JSON.stringify(theData));
            // alert(this.title+"\n"+this.desc+"\n"+this.link+"\n"+this.imgUrl);
            console.log('theData:\n' + theData);
            console.log('wx:\n' + this.title + '\n' + this.desc + '\n' + this.link + '\n' + this.imgUrl);
        }
    });
}

function shareQQ(theData, successDo, cancelDo) {
    wx.onMenuShareQQ({
        title: theData.title, // 分享标题
        desc: theData.desc, // 分享描述
        link: theData.link, // 分享链接
        imgUrl: theData.cover, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            if (successDo) {
                successDo();
            }
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            if (cancelDo) {
                cancelDo();
            }
            // alert(JSON.stringify(theData));
            // alert(this.title+"\n"+this.desc+"\n"+this.link+"\n"+this.imgUrl);
            console.log('theData:\n' + theData);
            console.log('wx:\n' + this.title + '\n' + this.desc + '\n' + this.link + '\n' + this.imgUrl);
        }
    });
}

function shareWeibo(theData, successDo, cancelDo) {
    wx.onMenuShareWeibo({
        title: theData.title, // 分享标题
        desc: theData.desc, // 分享描述
        link: theData.link, // 分享链接
        imgUrl: theData.cover, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            if (successDo) {
                successDo();
            }
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            if (cancelDo) {
                cancelDo();
            }
            // alert(JSON.stringify(theData));
            // alert(this.title+"\n"+this.desc+"\n"+this.link+"\n"+this.imgUrl);
            console.log('theData:\n' + theData);
            console.log('wx:\n' + this.title + '\n' + this.desc + '\n' + this.link + '\n' + this.imgUrl);
        }
    });
}

function chooseOwnImage(callback, pic_num, fail) {
    var _num = 9;
    if (pic_num) {
        if (pic_num > 9) {
            _num = 9;
        } else {
            _num = pic_num;
        }
    }

    wx.chooseImage({
        count: _num,
        success: function (res) {
            var localIds = res.localIds;
            console.log(localIds);
            console.log(localIds.length);
            if (callback) {
                callback(localIds);
            }
        },
        fail: function (res) {
            alert('choose:' + JSON.stringify(res));
            if (callback) {
                callback(null);
            }
        },
        cancel: function() {
            console.log('用户点击了取消', fail);
            if (fail) fail();
        }
    });
}

function uploadOwnImage(localId, isShowProgressTips, callback) {
    wx.uploadImage({
        localId: localId.toString(), // 需要上传的图片的本地ID,
        isShowProgressTips: isShowProgressTips,
        success: function (res) {
            var serverId = res.serverId; // 返回图片的服务器端ID
            console.log(serverId);
            if (callback) {
                callback(serverId);
            }
        },
        fail: function (res) {
            alert('upload:' + JSON.stringify(res));
            if (callback) {
                callback(null);
            }
        }
    });
}

function previewOwnImage(current, urls) {
    wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: urls // 需要预览的图片http链接列表
    });
}

function getNetworkType(callback) {
    wx.getNetworkType({
        success: function (res) {
            var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
            if (callback) {
                callback(networkType);
            }
        },
        fail: function (res) {
            alert(JSON.stringify(res));
            if (callback) {
                callback(null);
            }
        }
    });
}

function openLocation(data) {
    wx.openLocation({
        latitude: data.latitude, // 纬度，浮点数，范围为90 ~ -90
        longitude: data.longitude, // 经度，浮点数，范围为180 ~ -180。
        name: data.name, // 位置名
        address: data.address, // 地址详情说明
        scale: data.scale, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: data.infoUrl // 在查看位置界面底部显示的超链接,可点击跳转
    });
}

function openAddr(callback) {
    //wx.checkJsApi({
    //	jsApiList: [
    //		'openAddress',
    //	],
    //	success: function (res) {
    //		alert(JSON.stringify(res));
    //	}
    //});
    wx.openAddress({
        trigger: function (res) {
            callback(res, 'trigger')
            //alert('用户开始拉出地址');
        },
        success: function (res) {
            callback(res, 'success')
        },
        cancel: function (res) {
            //alert('用户取消拉出地址');
            callback(res, 'cancel')
        },
        fail: function (res) {
            callback(res, 'fail')
            //alert(JSON.stringify(res));
        }
    });
}

function getLocation(type, callback) {
    wx.getLocation({
        type: type, // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度
            if (callback) {
                callback(latitude, longitude, speed, accuracy);
            }
        },
        fail: function (res) {
            alert(JSON.stringify(res));
            if (callback) {
                callback(null);
            }
        }
    });
}

function hideMenuItems(menuList, success, fail) {
    wx.hideMenuItems({
        /*
         menuList: [
         'menuItem:readMode', // 阅读模式
         'menuItem:share:timeline', // 分享到朋友圈
         'menuItem:copyUrl' // 复制链接
         ],*/
        menuList: menuList,
        success: function (res) {
            // alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
            success && success();
        },
        fail: function (res) {
            // alert(JSON.stringify(res));
            fail && fail();
        }
    });
}

function scanQRCode(successDo, cancelDo, failDo) {
    var conf = {
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果

            console.log(result);
            successDo && successDo(result);
        },
        fail: function (res) {
            console.log(res);
            loading.remove();

            failDo ? failDo(res) : motify.show('扫描失败，请稍后重试~');
        },
        cancel: function (res) {
            console.log(res);
            loading.remove();

            cancelDo && cancelDo(res);
        }
    };

    successDo ? wx.scanQRCode(conf) : wx.scanQRCode();
}

function wxConfig(data) {
    wx.config({
        debug: data.debug,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: data.jsApiList
    });
}

function wxPay(data, successDo, cancelDo, failDo) {

    function onBridgeReady() {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                'appId': data.appId, //公众号id，由商户传入
                'timeStamp': data.timeStamp, //时间戳，自1970年以来的秒数
                'nonceStr': data.nonceStr, //随机串
                'package': data.packages, //订单详情扩展字符串
                'signType': data.signType, //微信签名方式:
                'paySign': data.paySign //微信签名
            },
            function (res) {

                console.log('pay res: ' + JSON.stringify(res));
                loading.remove();
                switch (res.err_msg) {
                    case 'get_brand_wcpay_request:ok':
                        // 支付成功
                        successDo && successDo();
                        break;

                    case 'get_brand_wcpay_request:cancel':
                        // 取消支付
                        cancelDo && cancelDo();
                        break;

                    case 'get_brand_wcpay_request:fail':
                        // 支付失败
                        failDo ? failDo(res.err_desc) : motify.show('支付失败，请稍后重试~');
                        break;

                    default:
                        motify.show('支付失败，请稍后重试~');
                        break;
                }

            }
        );
    }

    if (typeof WeixinJSBridge == 'undefined') {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    } else {
        onBridgeReady();
    }
}

// var _wxJsDownload = 0;
function initWxJs(shop_id, cur_url, opts) {
    var _wxJsDownload = 0;
    if (cur_url.indexOf('#') >= 0) {
        cur_url = cur_url.substring(0, cur_url.indexOf('#'));
    }
    var url = encodeURIComponent(cur_url)
    if (window._wxReady != true) {
        $.ajax({
            type: 'get',
            url: getAjaxUrl('/service/jsapi_service.jsp?act=get_config&shop_id=' + shop_id + '&url=' + url),
            success: function (result) {
                console.log(result);
                console.log('222');
                if (result.errcode == 0) {
                    wxConfig(result.config);
                    window._wxReady = true;

                    if (window._wxReady) {
                        wx.ready(function () {
                            if (opts) {
                                if (opts['type'] == 'share') {
                                    shareFriend(opts['data'], opts['successDo'], opts['cancelDo']);
                                    shareTimeline(opts['data'], opts['successDo'], opts['cancelDo']);
                                    shareQZone(opts['data'], opts['successDo'], opts['cancelDo']);
                                    shareQQ(opts['data'], opts['successDo'], opts['cancelDo']);
                                    shareWeibo(opts['data'], opts['successDo'], opts['cancelDo']);
                                } else if (opts['type'] == 'chooseImage') {
                                    chooseOwnImage(opts['callback'], opts['count'], opts['fail']);
                                } else if (opts['type'] == 'uploadImage') {
                                    uploadOwnImage(opts['localId'], opts['isShowProgressTips'], opts['callback']);
                                } else if (opts['type'] == 'previewImage') {
                                    previewOwnImage(opts['current'], opts['urls']);
                                } else if (opts['type'] == 'getNetworkType') {
                                    getNetworkType(opts['callback']);
                                } else if (opts['type'] == 'openLocation') {
                                    openLocation(opts['data']);
                                } else if (opts['type'] == 'getLocation') {
                                    getLocation(opts['typeOwn'], opts['callback']);
                                } else if (opts['type'] == 'hideMenuItems') {
                                    hideMenuItems(opts['menuList'], opts['success'], opts['fail']);
                                } else if (opts['type'] == 'openAddress') {
                                    openAddr(opts['callback']);
                                } else if (opts['type'] == 'shareFriend') {
                                    shareFriend(opts['data'], opts['successDo'], opts['cancelDo']);
                                } else if (opts['type'] == 'shareTimeline') {
                                    shareTimeline(opts['data'], opts['successDo'], opts['cancelDo']);
                                } else if (opts['type'] == 'shareQZone') {
                                    shareQZone(opts['data'], opts['successDo'], opts['cancelDo']);
                                } else if (opts['type'] == 'shareQQ') {
                                    shareQQ(opts['data'], opts['successDo'], opts['cancelDo']);
                                } else if (opts['type'] == 'shareWeibo') {
                                    shareWeibo(opts['data'], opts['successDo'], opts['cancelDo']);
                                } else if (opts['type'] == 'hideOption') {
                                    wxJsBridgeReady(_wx.hide_option);
                                } else if (opts['type'] == 'showOption') {
                                    wxJsBridgeReady(_wx.show_option);
                                } else if (opts['type'] == 'scanQRCode') {
                                    scanQRCode(opts['successDo'], opts['cancelDo'], opts['failDo']);
                                } else {
                                    alert('type参数错误~');
                                }
                            }
                        });
                    }
                } else {
                    //  motify.show(JSON.stringify(result));
                }
                _wxJsDownload++;
            },
            error: function (msg) {
                _wxJsDownload++;
            }
        });
    }
    console.log(opts);
}

function wxJsBridgeReady(wxReadyFunc) {
    if (wxReadyFunc && typeof wxReadyFunc == 'function') {

        if (typeof window.WeixinJSBridge == 'undefined') {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', wxReadyFunc, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', wxReadyFunc);
                document.attachEvent('onWeixinJSBridgeReady', wxReadyFunc);
            }
        } else {
            wxReadyFunc();
        }
    }
}

function wx_init(showOption) {
    if (!window._wxReady) {
        if (_debug || showOption) {
            initWxJs('', window.location.href, {
                type: 'showOption'
            });
        } else {
            initWxJs('', window.location.href, {
                type: 'hideOption'
            });
        }
    }
}

_wx = {

    share: function (data, successDo, cancelDo) {
        // appCall(5, data);
        if (!window._wxReady) {
            initWxJs('', window.location.href, {
                type: 'share',
                data: data,
                successDo: successDo,
                cancelDo: cancelDo
            });
        }
        console.log(window._wxReady);
        if (window._wxReady) {
            wx.ready(function () {
                shareFriend(data, successDo, cancelDo);
                shareTimeline(data, successDo, cancelDo);
            });
        }
        console.log(data);
    },

    shareFriend: function (data, successDo, cancelDo) {
        // 隐藏分享到朋友圈菜单项
        var menuList = ['menuItem:share:timeline'];
        _wx.hideMenuItems(menuList);

        if (!window._wxReady) {
            initWxJs('', window.location.href, {
                type: 'shareFriend',
                data: data,
                successDo: successDo,
                cancelDo: cancelDo
            });
        }
        console.log(window._wxReady);
        if (window._wxReady) {
            wx.ready(function () {
                shareFriend(data, successDo, cancelDo);
            });
        }
        console.log(data);
    },

    shareTimeline: function (data, successDo, cancelDo) {
        if (!window._wxReady) {
            initWxJs('', window.location.href, {
                type: 'shareTimeline',
                data: data,
                successDo: successDo,
                cancelDo: cancelDo
            });
        }
        console.log(window._wxReady);
        if (window._wxReady) {
            wx.ready(function () {
                shareTimeline(data, successDo, cancelDo);
            });
        }
        console.log(data);
    },

    shareQZone: function (data, successDo, cancelDo) {
        if (!window._wxReady) {
            initWxJs('', window.location.href, {
                type: 'shareQZone',
                data: data,
                successDo: successDo,
                cancelDo: cancelDo
            });
        }
        console.log(window._wxReady);
        if (window._wxReady) {
            wx.ready(function () {
                shareQZone(data, successDo, cancelDo);
            });
        }
        console.log(data);
    },

    shareQQ: function (data, successDo, cancelDo) {
        if (!window._wxReady) {
            initWxJs('', window.location.href, {
                type: 'shareQQ',
                data: data,
                successDo: successDo,
                cancelDo: cancelDo
            });
        }
        console.log(window._wxReady);
        if (window._wxReady) {
            wx.ready(function () {
                shareQQ(data, successDo, cancelDo);
            });
        }
        console.log(data);
    },

    shareWeibo: function (data, successDo, cancelDo) {
        if (!window._wxReady) {
            initWxJs('', window.location.href, {
                type: 'shareWeibo',
                data: data,
                successDo: successDo,
                cancelDo: cancelDo
            });
        }
        console.log(window._wxReady);
        if (window._wxReady) {
            wx.ready(function () {
                shareWeibo(data, successDo, cancelDo);
            });
        }
        console.log(data);
    },

    chooseImage: function (callback, pic_num, fail) {
        var picNum = 9;
        if (pic_num) {
            picNum = pic_num;
            if (picNum > 9) {
                picNum = 9
            }
        }

        if (!window._wxReady) {
            console.log('----!wxReady');
            initWxJs('', window.location.href, {
                type: 'chooseImage',
                count: picNum,
                callback: callback,
                fail: fail,
            });
        }
        if (window._wxReady) {
            console.log('----wxReady');
            wx.ready(function () {
                chooseOwnImage(callback, pic_num, fail);
            });
        }
    },

    uploadImage: function (localId, isShowProgressTips, callback) {
        if (!window._wxReady) {
            initWxJs('', window.location.href, {
                type: 'uploadImage',
                localId: localId,
                isShowProgressTips: isShowProgressTips,
                callback: callback
            });
        }
        if (window._wxReady) {
            wx.ready(function () {
                uploadOwnImage(localId, isShowProgressTips, callback);
            });
        }
    },

    previewImage: function (current, urls) {
        if (!window._wxReady) {
            initWxJs('', window.location.href, {
                type: 'previewImage',
                current: current,
                urls: urls
            });
        }
        if (window._wxReady) {
            wx.ready(function () {
                previewOwnImage(current, urls);
            });
        }
    },

    getNetworkType: function (callback) {
        if (!window._wxReady) {
            initWxJs('', window.location.href, {
                type: 'getNetworkType',
                callback: callback
            });
        }
        if (window._wxReady) {
            wx.ready(function () {
                getNetworkType(callback);
            });
        }
    },

    openLocation: function (data) {
        if (!window._wxReady) {
            initWxJs('', window.location.href, {
                type: 'openLocation',
                data: data
            });
        }
        if (window._wxReady) {
            wx.ready(function () {
                openLocation(data);
            });
        }
    },

    openAddress: function (callback) {
        if (!window._wxReady) {
            initWxJs('', window.location.href, {
                type: 'openAddress',
                callback: callback
            });
        }
        if (window._wxReady) {
            wx.ready(function () {
                openAddr(callback);
            });
        }
    },

    getLocation: function (type, callback) {
        if (!window._wxReady) {
            initWxJs('', window.location.href, {
                type: 'getLocation',
                typeOwn: type,
                callback: callback
            });
        }
        if (window._wxReady) {
            wx.ready(function () {
                getLocation(type, callback);
            });
        }
    },

    hideMenuItems: function (menuList, success, fail) {
        if (!window._wxReady) {
            initWxJs('', window.location.href, {
                type: 'hideMenuItems',
                menuList: menuList,
                success: success,
                fail: fail
            });
        }
        if (window._wxReady) {
            wx.ready(function () {
                hideMenuItems(menuList, success, fail);
            });
        }
    },

    scanQRCode: function (successDo, cancelDo, failDo) {
        if (!window._wxReady) {
            initWxJs('', window.location.href, {
                type: 'scanQRCode',
                successDo: successDo,
                cancelDo: cancelDo,
                failDo: failDo
            });
        }
        if (window._wxReady) {
            wx.ready(function () {
                scanQRCode(successDo, cancelDo, failDo);
            });
        }
    },

    hide_option: function hideOptionMenu() {
        WeixinJSBridge.call('hideOptionMenu');
    },

    show_option: function showOptionMenu() {
        WeixinJSBridge.call('showOptionMenu');
    },

    hideMenu: function () {
        wxJsBridgeReady(_wx.hide_option);
    },

    showMenu: function () {
        wxJsBridgeReady(_wx.show_option);
    },

    is_wx: function openInWeixin() {
        return /MicroMessenger/i.test(navigator.userAgent);
    },

    pay: function (data, successDo, cancelDo, failDo) {
        var tradeType = data.tradeType;

        if (tradeType == 'APP') {
            g_wxpayCallback = successDo;
            g_cancelDo = cancelDo;
            appShare(6, data)
        } else if (tradeType == 'JSAPI') {
            if (!this.is_wx()) {
                loading.remove();
                motify.show('请在微信中支付~');
                return false;
            }
            wxPay(data, successDo, cancelDo, failDo);
        } else if (tradeType == 'ALI_APP') {
            g_wxpayCallback = successDo;
            appShare(13, data)
        } else if (tradeType == 'APPLE') {
            g_wxpayCallback = successDo;
            appShare(42, data)
        }
    },

};

var g_wxpayCallback;
var g_cancelDo;

function appJavaPayResultCB(suc) {
    if (suc == '1') {
        g_wxpayCallback && g_wxpayCallback(suc);
    } else {
        g_cancelDo && g_cancelDo();
        loading.remove();
    }
}

isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod|iOS/i) ? true : false;
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    },
    AppAndroid: function () {
        return getPar('client_type') == 'android' || ReactFn.getLocalData('client_type') == 'android' || !!window.native && !!window.native.appclienShare;
    },
    AppIOS: function () {
        return getPar('client_type') == 'ios' || ReactFn.getLocalData('client_type') == 'ios' || !!window.webkit && !!window.webkit.messageHandlers && !!window.webkit.messageHandlers.webViewApp;
    },
    AppClient: function () {
        return isMobile.AppAndroid() || isMobile.AppIOS()
    },
    Electron: function () {
        return !!navigator.userAgent.match(/Electron/i);
    },
    isAppInput: function () {
        return isMobile.AppClient() && getPar('isKeyboardEnv') == '1';
    },
};

browser = {
    isOpera: function() {
        return navigator.userAgent.indexOf('Opera') > -1;
    },
    isFirefox: function() {
        return navigator.userAgent.indexOf('Firefox') > -1;
    },
    isChrome: function() {
        return navigator.userAgent.indexOf('Chrome') > -1;
    },
    isSafari: function() {
        return navigator.userAgent.indexOf('Safari') > -1;
    },
    isIE: function() {
        return navigator.userAgent.indexOf('compatible') > -1 && navigator.userAgent.indexOf('MSIE') > -1 && !isOpera;
    }
}

function getiOSversion() {
    var match = (navigator.userAgent).match(/OS (\d+)_(\d+)_?(\d+)?/);
    //return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
    return match ? parseInt(match[1]) : false;
}

if (_debug) {
    wxJsBridgeReady(_wx.show_option);
} else {
    wxJsBridgeReady(_wx.hide_option);
}


function is_weixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

function weixinPlat() {
    return is_weixin() || getPar('wg_debug') == 1;
}

function mobilePlat() {
    return isMobile.any() || getPar('wg_debug') == 1;
}

function setUrlParam(url, param, v) {
    var re = new RegExp('(\\\?|&)' + param + '=([^&]+)(&|$)', 'i');
    var m = url.match(re);
    if (m) {
        return (url.replace(re, function ($0, $1, $2) {
            return ($0.replace($2, v));
        }));
    } else {
        if (url.indexOf('?') == -1)
            return (url + '?' + param + '=' + v);
        else
            return (url + '&' + param + '=' + v);
    }
}

function getPar(par) {
    var reg = new RegExp('(^|&)' + par + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg); //截取URL中"?"后面的字符串并匹配url表达式
    if (r != null) return decodeURI(r[2]);
    return '';
    //return get_par;
}

function getHeight(item_width, item_height, scale_width) {
    var wid_tmp
    var hgt_tmp
    if (item_width > scale_width) {
        wid_tmp = scale_width
        hgt_tmp = (scale_width * item_height) / item_width
    } else if (item_width == scale_width) {
        wid_tmp = scale_width
        hgt_tmp = item_height
    } else {
        wid_tmp = item_width
        hgt_tmp = item_height
    }

    return hgt_tmp;
}

function getPageScrollTop(useStyle) {
    var scrollTop = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollTop) {
        return scrollTop;
    } else if (useStyle) {
        var top = document.body.style.top;
        if (top) {
            scrollTop = Math.abs(parseInt(top));
        } else {
            scrollTop = 0;
        }
        return scrollTop;
    } else {
        return scrollTop;
    }
    // return document.documentElement && document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function setPageScrollTop(value) {
    document.documentElement && (document.documentElement.scrollTop = value);
    document.body.scrollTop = value;
}

countDown = {
    timer: function (intDiff, renderFunc, stopCallback) {

        var interval = window.setInterval(function () {
            if (intDiff == 0) {
                clearInterval(interval);
                stopCallback && stopCallback();
            }
            var day = 0,
                hour = 0,
                minute = 0,
                second = 0; //时间默认值
            if (intDiff > 0) {
                day = Math.floor(intDiff / (60 * 60 * 24));
                hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
                minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
            }
            if (minute <= 9) minute = '0' + minute;
            if (second <= 9) second = '0' + second;
            if (hour <= 9) hour = '0' + hour;
            if (day <= 9) day = '0' + day;
            if (renderFunc) {
                renderFunc(day, hour, minute, second)
            } else {
                $('#day_show').html(day);
                $('#hour_show').html('<s id="h"></s>' + hour);
                $('#minute_show').html('<s></s>' + minute);
                $('#second_show').html('<s></s>' + second);
            }
            intDiff--;
            //console.log(intDiff);
        }, 1000);

        return interval;

    },

    timerHour: function (intDiff, renderFunc, stopCallback) {

        var interval = window.setInterval(function () {
            if (intDiff == 0) {
                clearInterval(interval);
                stopCallback && stopCallback();
            }
            var day = 0,
                hour = 0,
                minute = 0,
                second = 0; //时间默认值
            if (intDiff > 0) {
                hour = Math.floor(intDiff / (60 * 60));
                minute = Math.floor(intDiff / 60) - (hour * 60);
                second = Math.floor(intDiff) - (hour * 60 * 60) - (minute * 60);
            }
            if (minute <= 9) minute = '0' + minute;
            if (second <= 9) second = '0' + second;
            if (hour <= 9) hour = '0' + hour;
            if (renderFunc) {
                renderFunc(hour, minute, second)
            } else {
                $('#hour_show').html('<s id="h"></s>' + hour);
                $('#minute_show').html('<s></s>' + minute);
                $('#second_show').html('<s></s>' + second);
            }
            intDiff--;
            //console.log(intDiff);
        }, 1000);

        return interval;

    }
};

(function ($) {
    $.fn.longClick = function (callback, timeout) {
        var timer;
        timeout = timeout || 500;
        $(this).mousedown(function () {
            timer = setTimeout(function () {
                callback();
            }, timeout);
            return false;
        });
        $(document).mouseup(function () {
            clearTimeout(timer);
            return false;
        });
    };

})(jQuery);

changeTwoDecimal = function changeTwoDecimal(floatvar) {
    var f_x = parseFloat(floatvar);
    if (isNaN(f_x)) {
        alert('function:changeTwoDecimal->parameter error');
        return false;
    }
    var f_x = Math.round(floatvar * 100) / 100;
    return f_x;
}


function LOG(json) {
    if (_debug) {
        console.log(json);
        alert(JSON.stringify(json));
    }

}

var RE_INT_GT0 = /^[1-9]+[0-9]*]*$/; //大于0的整数
var RE_INT_GTE0 = /^[0-9]+[0-9]*]*$/; //大于或等于0的整数
var RE_FLOAT_GTE0 = /^[0-9]\d*(\.\d+)?$/; //>=0的数
/**
 * 判断是否为数字
 * @param s
 * @param isnullok
 * @param reg　采用上面定义的正则表达
 * @returns {boolean}
 * @constructor
 */
function IsNum(s, isnullok, reg) {
    if (s == null) {
        return false;
    }
    var _s = s.trim();
    if (isnullok && (_s == '')) {
        _s = 0;
    }
    return reg.test(_s);
}


/**
 * 图片上传接口
 * @param btnid
 * @param callback
 * @param qiniuJsSDK 可选参数
 * @param {boolean} multi 是否多图上传
 * @param {object} resizeObj 图片压缩配置
 * @returns {*}
 */
function _fileUploadInit(btnid, callback, qiniuJsSDK, multi, resizeObj, filekey, dropEl) {
    var _Qiniu = Qiniu;
    if (qiniuJsSDK) {
        _Qiniu = qiniuJsSDK;
    }
    var maxSize = '8mb';
    var multi_selection = multi ? true : false;
    var defaults = {
        'Error': function (up, err, errTip) {
            if (err.code == plupload.FILE_SIZE_ERROR) {
                motify.show('所选图片不能超过' + maxSize + ',视频不超过5mb');
            } else {
                motify.show(errTip);
            }
        },
        'BeforeUpload': function (up, file) {
            // 每个文件上传前,处理相关的事情
        }
    }
    var _callback = $.extend({}, defaults, callback);
    var _resize = {
        size: '614400',
        width: 1024,
        height: 1024,
        crop: false,
        quality: 92,
        preserve_headers: false
    };
    var resize = $.extend({}, _resize, resizeObj || {});

    //wg201505.qiniudn.com
    var uploader = _Qiniu.uploader({
        runtimes: 'html5', //上传模式,依次退化
        browse_button: btnid, //上传选择的点选按钮，**必需**
        uptoken_url: getAjaxUrl('/service/get_qiuniu_token.jsp'),
        unique_names: filekey ? false : true,
        domain: 'https://xcimg.szwego.com/',
        //        container: 'container',           //上传区域DOM ID，默认是browser_button的父元素，
        max_file_size: maxSize, //最大文件体积限制
        //flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
        max_retries: 3, //上传失败最大重试次数
        dragdrop: true, //开启可拖曳上传
        drop_element: dropEl, //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        //chunk_size: '400kb',                //分块上传时，每片的体积
        auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        resize: resize,
        filters: {
            mime_types: [ //只允许上传图片
                {
                    title: 'image',
                    extensions: 'jpg,jpeg,png,bmp,webp'
                },
                {
                    title: 'video',
                    extensions: 'mp4'
                }
            ],
            // prevent_duplicates: true //不允许选取重复文件
        },
        multi_selection: multi_selection,
        init: _callback
    });
    return uploader;
}

/**
 *
 * @param btnid
 * @param callback   eg: { 'FileUploaded': function (up, file, info) {
 * 							var domain = up.getOption('domain');
 * 							var res = JSON.parse(info);
 * 							var sourceLink = domain + res.key; //获取上传成功后的文件的Url
 * 							var imageInfoObj = Qiniu.imageInfo(res.key);}}
 * @param multi
 * @returns {*}
 */
var QiniuNum = 0;

function fileUploadInit(btnid, callback, multi, resizeObj, filekey, dropEl) {
    var Qiniu2 = null;
    if (QiniuNum > 0) {
        Qiniu2 = new QiniuJsSDK();
    }
    QiniuNum++;
    return _fileUploadInit(btnid, callback, Qiniu2, multi, resizeObj, filekey, dropEl);
}

function fileUploadMore(btnid, callback, multi, resizeObj, filekey, dropEl) {
    return fileUploadInit(btnid, callback, multi, resizeObj, filekey, dropEl);
    // var Qiniu2 = new QiniuJsSDK();
    // return _fileUploadInit(btnid, callback, Qiniu2, multi);
}


function parseURL(url) {
    var a = document.createElement('a');
    a.href = url;

    return a;
}

function getAjaxUrl(url) {
    var h5Protocol = 'https:';
    var appProtocol = 'appoffline:'; // app离线协议
    var anchor = parseURL(url);
    let host = anchor.host; //url.substr(url.indexOf(appProtocol) + appProtocol.length + 2);

    if (/^\d/.test(host)){
        h5Protocol = 'http:';
    }
    console.log('anchor.host, anchor.protocol: ', anchor.host, anchor.protocol, host);
    if (anchor.protocol === appProtocol) {
        anchor.protocol = h5Protocol;
        url = anchor.href;
    }
    console.log('url: ', url);
    return url;
}

function getUrlAddPara(url) {
    var _url = getAjaxUrl(url);
    if (getPar('client_type')) {
        _url = setUrlParam(_url, 'client_type', getPar('client_type'));
    }
    if (getPar('token')) {
        _url = setUrlParam(_url, 'token', getPar('token'));
    }
    if (getPar('version')) {
        _url = setUrlParam(_url, 'version', getPar('version'));
    }
    if (getPar('channel')) {
        _url = setUrlParam(_url, 'channel', getPar('channel'));
    }
    if (getPar('env')) {
        _url = setUrlParam(_url, 'env', getPar('env'));
    }
    if (getPar('isKeyboardEnv')) {
        _url = setUrlParam(_url, 'app_source', getPar('isKeyboardEnv'));
    }
    return _url;
}

/**
 *
 * @param {*} data
 */
function _sensorBury(data) {
    if (data.sensorBury && typeof window.effectSensorBury === 'function')
        window.effectSensorBury(data.sensorBury);
}

function getCookieByName(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return '';
}

function getAppendHeader() {
    const channel = getPar('client_type') || 'net';
    const version = getPar('version') || '';
    const albumID = getPar('js_header_albumid') || '';
    let wego_staging = '0';

    if (isMobile.AppClient()) {
        wego_staging = getPar('js_wego_staging') || '0';
    } else {
        const isrundev = getCookieByName('producte_run_to_dev_tomcat') == 'true';
        wego_staging = isrundev && '1';
    }

    // console.warn('getAppendHeader: ', albumID, channel, version, wego_staging);
    return {
        'wego-albumid': albumID,
        'wego-channel': channel,
        'wego-version': version,
        'wego-staging': wego_staging,
    };
}


/**
 * 获取数据
 * @param url
 * @param callback
 */
function ajaxFn(url, callback, async, fail) {
    var _async = true;
    if (async) {
        _async = !!async;
    }
    var _url = getUrlAddPara(url);
    var xhr = $.ajax({
        type: 'get',
        dataType: 'json',
        async: _async,
        url: _url,
        cache: false,
        timeout: 38000,
        headers: getAppendHeader(),
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.readyState + XMLHttpRequest.status + XMLHttpRequest.responseText);
            console.log('XMLHttpRequest.responseText=' + XMLHttpRequest.responseText);
            var errmsg = '网络有点堵，请稍后重试~';
            motify.show(errmsg);
            xhr.abort();
            // if (textStatus == 'timeout') {
            //     //处理超时的逻辑
            //     motify.show('网络有点堵哦，亲稍后再试下~')
            // }
            loadingImg.remove()
            loading.remove();
            XMLHttpRequest = null;
            if (fail && typeof fail === 'function') {
                fail();
            }
            return false;
        },
        success: function (data, t, jqXHR) {
            if (typeof data === 'undefined') {
                loadingImg.remove()
                loading.remove();
                motify.show('数据异常,请稍后再试~')
                return false;
            }

            _sensorBury(data);

            if (typeof data.errcode === 'undefined' || data.errcode != 0) {
                loadingImg.remove()
                loading.remove();
                motify.show(data.errmsg)
                return false;
            }
            if (data.token) {
                if (isMobile.AppClient()) {
                    appShare(17, data.token, null, null)
                }
            }
            if (callback) {
                console.log('callback')
                callback(data)
            }

            data = null;
            return false
        },
        complete: function (jqXHR) {
            jqXHR = null;
            return false
        }

    });
    return xhr;
}

function ajaxFnPost(url, callback, data, failCallback) {
    var _url = getUrlAddPara(url);

    $.ajax({
        type: 'POST',
        url: _url,
        data: data,
        traditional: true,
        dataType: 'json',
        timeout: 30000,
        headers: getAppendHeader(),
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // console.log(XMLHttpRequest.readyState + XMLHttpRequest.status + XMLHttpRequest.responseText);
            // console.log('XMLHttpRequest.responseText=' + XMLHttpRequest.responseText);
            var errmsg = window.navigator.onLine ? '网络有点堵，请稍后重试~' : '网络不可用~';
            // if (textStatus == 'timeout') {
            //     //处理超时的逻辑
            //     motify.show(errmsg);
            // }
            loadingImg.remove()
            loading.remove();
            if (failCallback) {
                failCallback(null, errmsg);
            } else {
                motify.show(errmsg);
            }
            XMLHttpRequest = null;
            return false;
        },
        success: function (data, t, jqXHR) {
            if (typeof data === 'undefined' || typeof data.errcode === 'undefined') {
                var errService = '数据异常,请稍后再试~';
                loadingImg.remove()
                loading.remove();
                if (failCallback) {
                    failCallback(null, errService);
                } else {
                    motify.show(errService)
                }
                return false;
            }

            _sensorBury(data);

            if (data.errcode != 0) {
                loadingImg.remove()
                loading.remove();
                if (failCallback) {
                    if (data.errcode != 0 && data.errmsg) {
                        data.errmsg += ('#$&' + jqXHR.getResponseHeader("X-Trace-Id"));
                    }
                    failCallback(data.errcode, data.errmsg, data.result);
                } else {
                    motify.show(data.errmsg)
                }
                return false;
            }

            if (data.token) {
                if (isMobile.AppClient()) {
                    appShare(17, data.token, null, null)
                }
            }

            if (callback) {
                // console.log('callback')
                callback(data)
            }

            data = null;
            return false;
        }
    });

}

function ajaxFnExt(url, callback, async, failCallback) {

    var _async = true;
    if (async !==undefined) {
        _async = async;
    }
    var _url = getUrlAddPara(url);

    console.log('ajax')
    var xhr = $.ajax({
        type: 'get',
        dataType: 'json',
        async: _async,
        url: _url,
        cache: false,
        timeout: 38000,
        headers: getAppendHeader(),
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // console.log(XMLHttpRequest.readyState + XMLHttpRequest.status + XMLHttpRequest.responseText);
            // console.log('XMLHttpRequest.responseText=' + XMLHttpRequest.responseText);
            // if (textStatus == 'timeout') {
            //     //处理超时的逻辑
            //     motify.show('网络有点堵哦，亲稍后再试下~')
            // }
            if (textStatus == 'abort') return;
            loadingImg.remove()
            loading.remove();

            xhr.abort();
            var errmsg = window.navigator.onLine ? '网络有点堵，请稍后重试~' : '网络不可用~';
            if (failCallback) {
                failCallback(errmsg);
            } else {
                motify.show(errmsg);
            }

            XMLHttpRequest = null;
            return false;
        },
        success: function (data, t, jqXHR) {
            if (typeof data === 'undefined') {
                loadingImg.remove()
                loading.remove();
                motify.show('数据异常,请稍后再试~')
                return false;
            }

            _sensorBury(data);
            if (callback) {
                if (data.errcode != 0 && data.errmsg) {
                    data.errmsg += ('#$&' + jqXHR.getResponseHeader("X-Trace-Id"));
                }
                // console.log('callback')
                callback(data)
            }

            data = null;
            return false
        },
        complete: function (jqXHR) {

            jqXHR = null;
            return false
        }

    });
    return xhr;

}
/**
 * 滚动时显示、隐藏元素
 * @param el        选择器
 * @param speed     毫秒
 */
function scrollSlideToggle(el, speed) {
    var $el = $(el),
        speed = speed || 'fast',
        lastScroll = 0,
        currentScroll = $(window).scrollTop(),
        scrollDiff = 0;

    $(window).scroll(function () {

        lastScroll = currentScroll;
        currentScroll = $(this).scrollTop();
        scrollDiff = currentScroll - lastScroll;

        console.log('scrollDiff: ' + scrollDiff);

        (scrollDiff > 0) ? $el.slideUp(speed): $el.slideDown(speed);

    });
}


/**
 * hack在微信等webview中无法修改document.title的情况
 * @param title        标题
 */
function setHtmlTitle(title) {
    var $body = $('body');
    var $iframe = $('<iframe src="/static/image/icon_up.png" width="0" height="0" frameborder="no" border="0" ></iframe>');
    document.title = title;
    $iframe.on('load', function () {
        setTimeout(function () {
            $iframe.off('load').remove();
        }, 0);
    }).appendTo($body);

    if (isMobile.AppClient() && getPar('version')*1 < 2650) return;
    this.saveTitle({
        title: title,
        location: location.hash,
    });
}

function saveTitle (currObj) {
    const currLocation = currObj.location;
    const currTitle = currObj.title;

    GetDataFromSession('currTitleSessions',function(obj){
        if (obj) {
            obj = JSON.parse(obj);
            const lastLocation = obj.location;//album_home
            if (lastLocation == currLocation) {//shopdetail
                obj.title = currTitle;
                SaveDataToSession('currTitleSessions',JSON.stringify(obj));
                return;
            }
        }
        if (obj) {
            SaveDataToSession('preTitleSessions',JSON.stringify(obj));
        }
        SaveDataToSession('currTitleSessions',JSON.stringify(currObj));
    });
}

function SaveDataToSession (key, data)  {
    isMobile.AppClient() ? SaveDataToApp(key, data) : sessionStorage.setItem(key, data);
};

function GetDataFromSession (key, callback) {
    if (isMobile.AppClient() ) {
        GetAppData(key, function (data) {
            typeof callback === 'function' && callback(data);
        });
    } else {
        const data = sessionStorage.getItem(key);

        typeof callback === 'function' && callback(data);
    }
};

function _uploadImageWxFunc(view, i, localIds, length, type, callback, multi, previewCallback) {
    _wx.uploadImage(localIds[i], 1, function (serverId) {
        if (serverId != null) {
            if (previewCallback) {
                previewCallback(view, type, localIds[i], 0, 0, serverId.toString());
            }
            var tempIdx = type;
            $.ajax({
                type: 'GET',
                url: getAjaxUrl('/service/upload_image_wx_to_qiniu.jsp'),
                data: {
                    serverId: serverId.toString()
                },

                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    if (data.errcode == 0) {
                        console.log('------data: 0xg: ', view, tempIdx, data.image7Url, data.width, data.height, serverId.toString());
                        callback(view, tempIdx, data.image7Url, data.width, data.height, serverId.toString());
                    } else {
                        motify.show('上传图片失败')
                    }
                },
                error: function (msg) {
                    alert(msg)
                }
            });
        } else {}

        i++;
        if (multi) {
            type++;
        }
        if (i < length) {
            _uploadImageWxFunc(view, i, localIds, length, type, callback, multi, previewCallback);
        }
    });
};

/**
 * 判断是否使用微信上传图片
 * @returns {boolean}
 */
function isUseWxUploadImage(multi) {
    if (_wx.is_wx()) {
        if (isMobile.iOS() || isMobile.Android()) {
            return true
        } else {
            return false;
        }
    } else {
        return false
    }

}

var g_appUploadImgCB;
/**
 * app上传图片回调
 * @param data 图片URL
 */
function javaUploadImgCB(data) {
    var json = JSON.parse(data);
    var url = 'https://xcimg.szwego.com/' + json.key;
    if (g_appUploadImgCB) {
        g_appUploadImgCB(url, json.digital_watermark, json.w, json.h, json.view);
    }
}
/**
 * 上传图片接口
 * @param view
 * @param type
 * @param imgMaxNum 最多几张图片
 * @param imgSelected 已经选择了几张
 * @param callback
 * @param multi 是否多选
 * @param previewCallback
 */
function uploadImageFunc(
    view,
    type,
    imgMaxNum,
    imgSelected,
    callback,
    multi,
    previewCallback,
    appCallback,
    actiontype
) {
    g_appUploadImgCB = appCallback;
    _uploadImageFunc(
        view,
        type,
        imgMaxNum,
        imgSelected,
        callback,
        multi,
        previewCallback,
        false,
        actiontype
    );
}

/**
 * reactjs上传图片接口，在页面中自动生成input div
 * @param view
 * @param type
 * @param imgMaxNum
 * @param imgSelected
 * @param callback
 * @param multi
 * @param previewCallback
 */
function uploadImageFuncNew(view, type, imgMaxNum, imgSelected, callback, multi, previewCallback, appCallback, actiontype, fail) {
    g_appUploadImgCB = appCallback;
    _uploadImageFunc(
        view,
        type,
        imgMaxNum,
        imgSelected,
        callback,
        multi,
        previewCallback,
        true,
        actiontype,
        fail
    );
}

function _uploadImageFunc(
    view,
    type,
    imgMaxNum,
    imgSelected,
    callback,
    multi,
    previewCallback,
    react,
    actiontype,
    fail
) {
    if (isUseWxUploadImage(multi)) {
        _wx.chooseImage(function(localIds) {
            console.log(localIds);
            if (localIds != null) {
                if (localIds.length > 0) {
                    if (localIds.length + imgSelected <= imgMaxNum) {
                        var i = 0,
                            length = localIds.length;
                        _uploadImageWxFunc(
                            view,
                            i,
                            localIds,
                            length,
                            type,
                            callback,
                            multi,
                            previewCallback
                        );
                    } else {
                        fail && fail();
                        motify.show('图片最多' + imgMaxNum + '张~');
                    }
                } else {
                    fail && fail();
                    motify.show('亲,请选择图片哟~');
                }
            } else {
                fail && fail();
                motify.show('选取图片失败~');
            }
        }, imgMaxNum - imgSelected, fail);
    } else {
        var uploadImgData = {
            imgNum: imgMaxNum - imgSelected,
            uptoken: Qiniu.token
        };
        if (actiontype) {
            uploadImgData.type = actiontype;
        }
        // view为react组件实例时，在appShare中JSON.stringify出错
        // if (view){
        //     uploadImgData.view = view;
        // }
        if (isMobile.AppClient()) {
            appShare(4, uploadImgData, null, null);
        } else {
            if (!react) {
                if (multi) {
                    $('#img_upload_mul').val(type);
                    $('#img_upload_mul').click();
                } else {
                    $('#img_upload').val(type);
                    $('#img_upload').click();
                }
            }
        }
    }
}

var ReactFn = {};
ReactFn._pageRec = 0;
ReactFn.comInfiniteScrollFn = function (_this, url, callback, callbackall, section, failCallback) {
    var that = _this;
    $('#genericList').infinitescroll({
        itemsToLoad: '#genericList',
        section: section || 0,
        no_show_error: 1,
        path: function (page) {
            ReactFn._pageRec = page;
            return url + '&page_index=' + page + '&search_value=' + encodeURI(encodeURI(that.state.filterText));
        }
    },
    function (data) {
        loadingImg.remove();
        if (data.token) {
            if (isMobile.AppClient()) {
                appShare(17, data.token, null, null)
            }
        }
        if (callbackall) {
            return callbackall(data);
        }
        if (data.errcode == 0) {
            if (callback) return callback(data);
        } else {
            motify.show(data.errmsg);
        }
    },
    function (errmsg) {
        failCallback && failCallback(errmsg);
    });
}
ReactFn.infiniteScrollClear = function (key, _this) {
    $(window).unbind('scrollstop.infinitescroll');
    if (key && _this) {
        ReactFn.setHistory(key, _this);
    }
}

ReactFn.scrollSave = function (type, args) {
    $(window).unbind('scrollstop.infinitescroll');
    var _args = '';
    if (args) {
        for (var i = 0; i < args.length; i++) {
            _args = _args + args[i] + ((i == args.length - 1) ? '' : '&');
        }
    }
    // window.sessionStorage.setItem(type, document.body.scrollTop + '&' + ReactFn._pageRec);
    window.sessionStorage.setItem(type, getPageScrollTop() + '&' + ReactFn._pageRec);
    if (_args != '') {
        window.sessionStorage.setItem(type + '_data', _args);
    }
    // console.log('save:' + document.body.scrollTop + '&' + ReactFn._pageRec)
    console.log('save:' + getPageScrollTop() + '&' + ReactFn._pageRec)
}
ReactFn.scrollGet = function (type) {
    var bak = window.sessionStorage.getItem(type + '_data');
    window.sessionStorage.removeItem(type + '_data');
    return bak ? bak.split('&') : [];
}
ReactFn.scrollBack = function (type) {
    var bak = window.sessionStorage.getItem(type);
    bak = bak ? bak.split('&') : [];
    console.log(bak);
    if (bak.length < 2) {
        return
    }
    if (bak[1] && ReactFn._pageRec < bak[1]) {
        return 99;
    } else {
        window.sessionStorage.removeItem(type);
        // if ((document.body.scrollTop == 0) && (parseInt(bak[0]) == 0)) {
        if ((getPageScrollTop() == 0) && (parseInt(bak[0]) == 0)) {} else {
            $('html, body').animate({
                scrollTop: parseInt(bak[0])
            }, 0);
        }
        console.log('success animate to history.....');
    }
}


ReactFn.setSessionData = function (obj) {
    for (var key in obj) {
        window.sessionStorage.setItem(key, obj[key]);
    };
}
ReactFn.getSessionData = function (key) {
    return window.sessionStorage.getItem(key);
}
ReactFn.removeSessionData = function (key) {
    window.sessionStorage.removeItem(key);
}


ReactFn.setHistory = function (key, _this, state, useStyle) {
    var obj = {};
    var scrollTop = getPageScrollTop(useStyle);
    var val = {
        page: ReactFn._pageRec,
        // scrollTop: window.document.body.scrollTop,
        scrollTop: scrollTop,
        state: state || _this.state
    }
    obj[key] = JSON.stringify(val);

    ReactFn.setSessionData(obj);
}
ReactFn.getHistory = function (key) {
    return JSON.parse(ReactFn.getSessionData(key));
}
ReactFn.toHistory = function (key) {
    var historyData = ReactFn.getHistory(key);
    if (historyData) {

        var scrollTop = historyData.scrollTop;

        $('html, body').animate({
            scrollTop: scrollTop
        }, 0);
        document.body.scrollTop = scrollTop;
        console.log('success animate to history.....');
        return scrollTop;
    }
    return 0;
}
ReactFn.clearHistory = function (key) {
    ReactFn.removeSessionData(key);
}
ReactFn.recoverHistory = function (key) {
    var hisScrollTop = ReactFn.toHistory(key);
    ReactFn.clearHistory(key);
    return hisScrollTop;
}


ReactFn.setLocalData = function (obj, shop_id) {
    shop_id = shop_id ? ('_' + shop_id) : '';

    for (var key in obj) {
        window.localStorage.setItem((key + shop_id), obj[key]);
    };
}
ReactFn.getLocalData = function (key, shop_id) {
    shop_id = shop_id ? ('_' + shop_id) : '';

    return window.localStorage.getItem(key + shop_id);
}
ReactFn.removeLocalData = function (key, shop_id) {
    shop_id = shop_id ? ('_' + shop_id) : '';

    window.localStorage.removeItem(key + shop_id);
}
ReactFn.clearLocalData = function () {
    window.localStorage.clear();
}


ReactFn.insertJs = function (label, json) {
    var div = document.createElement('div');
    div.id = 'var_' + label;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = 'var ' + label + ' = ' + JSON.stringify(json);
    div.appendChild(script);
    document.body.appendChild(div);
};
ReactFn.removeJs = function (label) {
    var div = document.getElementById('var_' + label);
    if (div) document.body.removeChild(div);
};

ReactFn.getJsVar = function (label) {
    var val = '';
    try {
        val = eval(label)
        ReactFn.removeJs(label);
    } catch (exception) {}
    return val;
};
//APP控制台日志输出
ReactFn.AppPrintLog = function (value){
    appShare(79,{
        type: '0',
        log: JSON.stringify(value),
    })
    console.group && console.group('App Print Log');
    console.log(value);
    console.groupEnd && console.groupEnd();
}
//APP控制台日志输出和记录
ReactFn.AppWriteLog = function (value){
    appShare(79,{
        type: '1',
        log: JSON.stringify(value),
    })
    console.group && console.group('App Write Log');
    console.log(value);
    console.groupEnd && console.groupEnd();
}
var g_linkCallBack;

function linkForCallBack(cb) {
    g_linkCallBack = cb;
    appShare(8, '');
}
var g_catchHtmlShareGoods;

function CatchHtmlShareGoods(cb) {
    g_catchHtmlShareGoods = cb;
    appShare(12, '');
}

function linkResultCallBack(data) {
    appShare(9, data);
}
/**
 * app 回调返回其它页面返回的数据
 * @param type
 * @param data
 * @constructor
 */
function JavaCallBack(type, data) {
    if (type == '9') {
        g_linkCallBack ? g_linkCallBack(data) : ''
    } else if (type == '12') {
        g_catchHtmlShareGoods ? g_catchHtmlShareGoods(data) : ''
    } else if (type == '101') {
        scrollTo(0, 0);
    }
}
/**
 *
 * @param type 1.多图分享到朋友圈;2.分享URL到朋友圈和朋友;3.只分享到朋友;4.上传图片;
 * 5.设置分享数据;6.微信支付;7.同步单品;8.设置数据回调;9.设置数据;10.图片查看;11.刷新页面
 * 12.爬取阿里数据;13.支付宝支付;14.保存shop_id;15.调用app一键分享页面;16.设置朋友圈分享的数据
 * 17.更新token; 18.进入分享商品页面; 19.退出登录;20.设置显示取消关注菜单;21.设置显示相册菜单
 * 22.要刷新webview页面;23.复制到剪切板;24.分享多图给朋友 25.编辑加入相册 26.付费成功，清除付费对象
 * 27.保存屏蔽相册ID; 28.无;29.回退back;30.弹出收藏界面;31.通知JS更新数据;32.去下载更新APP
 * 33.评分; 34.保存数据到app; 35.播放视频; 36.显示完成菜单;37.保存手机登录的token并跳转到首页;
 * 38.隐藏右上角完成菜单;39.上传app日志;40.打开图文链接;41.同步qq空间;42.苹果支付;43.批量下载;
 * 44.水印设置;45.群发消息详情页分享;46.剩余未读群发消息数;47.app注册推送;48.打开小程序;49.标签/分组独立页分享;
 * 50.批量转发分享;51.发布图文选项菜单;52.批量转发编辑（类同25）;53.标签管理排序方式入口;54.更新图文编辑历史标签
 * 55.分享小程序;56.清空剪切板;57.获取最近图片;58.分享选择框小程序二维码;59.添加购物车；60.设置右上角事件
 * 61.蓝牙扫描;62.连接设备;63.调用打印功能;64.查询打印机指令；65.删除指定URL的cookies;66.清除小程序码缓存
 * 67.关闭app页面;68.打开半屏显示网页;69.调用app弹出提示语;70.调用系统打开网页;71.扫码识别;72.设置显示输入法按钮；
 * 73.导出记录下载;74.显示输入法中数字键;75.输入法开关设置;76调用微信授权;77通过app打开h5页面,78 H5将输入框信息传给APP
 * 79.app错误日志;80.Android打开特定应用;82.设置app页面缓存json数据;83.获取app页面缓存json数据
 * 85.进入app网络检测页面, 检测{url: ''}, 默认检测当前域名;
 * 88.跳转至android自动粘贴设置;
 * @param shareData
 * @param wxCB
 * @param otherCB
 */
function appShare(type, shareData, wxCB, otherCB) {
    if (weixinPlat()) {
        typeof wxCB == 'function' ? wxCB(shareData) : '';
    } else if (isMobile.AppAndroid()) {

        native.appclienShare(type, shareData ? JSON.stringify(shareData) : '');
    } else if (isMobile.AppIOS()) {
        // if (getPar('version')>=101){
        var iosData = {
            'type': type,
            'shareData': shareData ? JSON.stringify(shareData) : ''
        }
        window.webkit.messageHandlers.webViewApp.postMessage(iosData);
        // }else{
        //     appclienShare(type, shareData?JSON.stringify(shareData):'');
        // }
    } else {
        typeof otherCB == 'function' ? otherCB(shareData) : (type > 3 ? '' : motify.show('请在手机中分享'));
    }
}

function appCall(type, shareData) {
    if (weixinPlat()) {} else if (isMobile.AppAndroid()) {
        native.appclienShare(type, JSON.stringify(shareData));
    } else if (isMobile.AppIOS()) {
        // if (getPar('version')>=101){
        var iosData = {
            'type': type,
            'shareData': JSON.stringify(shareData)
        }
        window.webkit.messageHandlers.webViewApp.postMessage(iosData);
        // }else{
        //     appclienShare(type, JSON.stringify(shareData));
        // }
    }
}

var tempFun;

function temp_fun() {
    typeof tempFun == 'function' ? tempFun() : '';
}

function connectWebViewJavascriptBridge(callback) {
    //    if (window.WebViewJavascriptBridge) {
    //        callback(WebViewJavascriptBridge)
    //    } else {
    //        document.addEventListener(
    //            'WebViewJavascriptBridgeReady'
    //            , function() {
    //                callback(WebViewJavascriptBridge)
    //            },
    //            false
    //        );
    //    }
    if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
    }
    //ios
    if (getPar('version') >= 104) {
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'truedian://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe)
        }, 0)
    }
    //android
    document.addEventListener(
        'WebViewJavascriptBridgeReady',
        function () {
            callback(WebViewJavascriptBridge)
        },
        false
    );
}


/**
 * app回调H5方法
 * 1.不看对方相册;2.取消关注;3.刷新界面数据;4.刷新分享时间;5.更新商品;6.右上角完成事件;
 * 7.页面窗口恢复显示;8.开单界面上传最近照片完成后通知js;9.弹出阻止返回弹窗;10.右上角数据回调回来
 * 11.蓝牙状态回调;12.app通知h5显示购物车入口;13.扫码后返回的数据
 *
 */
$(document).ready(function () {
    connectWebViewJavascriptBridge(function (bridge) {
        //        bridge.init(function(message, responseCallback) {
        //            responseCallback('init');
        //        });

        //注册java调用JS的方法
        bridge.registerHandler('functionInJs', function (data, responseCallback) {
            console.log(data)
            if (data) {
                var nativeData = JSON.parse(data)
                switch (nativeData.type) {
                    case 1:
                        if (window.albumUpdateNosee) {
                            window.albumUpdateNosee(nativeData.data);
                            responseCallback(nativeData.data);
                        } else if (window.albumUpdateNoseeSave) {
                            window.albumUpdateNoseeSave(nativeData.data);
                            responseCallback(nativeData.data);
                        }
                        break;
                    case 2:
                        console.log('albumUpdateFollowed111')
                        if (window.albumUpdateFollowed) {
                            console.log('albumUpdateFollowed333:' + nativeData.data)
                            window.albumUpdateFollowed(nativeData.data);
                            //删除图文
                            if (window.albumUpdateNosee) {
                                window.albumUpdateNosee(nativeData.data);
                            } else if (window.albumUpdateNoseeSave) {
                                window.albumUpdateNoseeSave(nativeData.data);
                            }
                            responseCallback(nativeData.data);
                        }
                        break;
                    case 3:
                        //刷新数据
                        if (window.albumPullFetch) {
                            window.albumPullFetch();
                        }
                        break;
                    case 4:
                        if (window.albumUpdateShareTime) {
                            window.albumUpdateShareTime(JSON.parse(nativeData.data));
                            responseCallback(nativeData.data);
                        }
                        break;
                    case 5:
                        //页面恢复显示通知
                        if (window.albumUpdateTheme) {
                            window.albumUpdateTheme(nativeData.data);
                            responseCallback(nativeData.data);
                        }
                        break;
                    case 6:

                        if (window.albumDone) {

                            window.albumDone();
                            responseCallback(nativeData.data);
                        }
                        break;
                    case 7:
                        //手机页面恢复显示通知
                        if (window.activityResume) {
                            window.activityResume(nativeData.data);
                        }
                        if (window.activityResumeForAddressClipboard) {
                            window.activityResumeForAddressClipboard(nativeData.data);
                        }
                        responseCallback(nativeData.data);
                        break;
                    case 8:
                        if (window.getSearchImage) {
                            window.getSearchImage(nativeData.data);
                            responseCallback(nativeData.data);
                        }
                        break;
                    case 9:
                        // 离开当前路由时的确认框
                        if (window.confirmLeaveRoute) {
                            window.confirmLeaveRoute(nativeData.data);
                        }
                        if (window.confirmLeaveRouteForAddressClipboard) {
                            window.confirmLeaveRouteForAddressClipboard(nativeData.data);
                        }
                        responseCallback(nativeData.data);
                        break;
                    case 10:
                        if (window.rigthTopMenu) {
                            window.rigthTopMenu(nativeData.data);
                        }
                        responseCallback(nativeData.data);
                        break;
                    case 11:
                        if (window.getBleState) {
                            window.getBleState(nativeData.data);
                        }
                        responseCallback(nativeData.data);
                        break;
                    case 12:
                        // app通知h5显示购物车入口
                        if (window.showShoppingCart) {
                            window.showShoppingCart(nativeData.data);
                        }
                        responseCallback(nativeData.data);
                        break;
                    case 13:
                        if (window.scanCodeResult) {
                            window.scanCodeResult(nativeData.data);
                        }
                        responseCallback(nativeData.data);
                        break;
                    case 14:
                        if (window.getKeyboardInputChange) {
                            window.getKeyboardInputChange(nativeData.data);
                        }
                        responseCallback(nativeData.data);
                        break;
                    case 15:
                        if (window.keyboardBottomMenu) {
                            window.keyboardBottomMenu(nativeData.data);
                        }
                        responseCallback(nativeData.data);
                        break;
                    case 16:
                        if (window.keyboardCrash) {
                            window.keyboardCrash(nativeData.data);
                        }
                        responseCallback(nativeData.data);
                        break;
                    case 17:
                        if (window.keyboardContentChange) {
                            window.keyboardContentChange(nativeData.data);
                        }
                        responseCallback(nativeData.data);
                        break;
                    case 18:
                        if (window.buryLogin) {
                            window.buryLogin(nativeData.data);
                        }
                        responseCallback(nativeData.data);
                        break;
                    case 20:
                        // 获取app页面缓存数据{key = '', data = ''}
                        if (window.getAppPageCacheData) {
                            window.getAppPageCacheData(nativeData.data);
                        }
                        responseCallback(nativeData.data);
                        break;
                    case 21:
                        // app页面隐藏回调
                        if (window.onAppPageHide) {
                            window.onAppPageHide(nativeData.data);
                        }
                        responseCallback(nativeData.data);
                        break;
                    case 22:
                        // 删除图片回调
                        if (window.delImageCallback) {
                            window.delImageCallback(nativeData.data);
                        }
                        responseCallback(nativeData.data);
                    default:
                        console.log('nativeData:default')
                        break;
                }
            }
        });
    })
});


function JSCallJava(type, content, respFunc) {
    var data = {
        id: type,
        content: content
    };
    // window.WebViewJavascriptBridge.callHandler(data, respFunc);

    // fix android webview中无法及时注册window.WebViewJavascriptBridge
    var timer;
    var getRes;
    function callback() {
        if (!window.WebViewJavascriptBridge) return;

        WebViewJavascriptBridge.callHandler(
            'callFromTDWeb',
            {
                'param': data
            },
            function(responseData) {
                clearInterval(timer);
                !getRes && respFunc(responseData);
                getRes = true;
            }
        );
    }
    callback();
    timer = setInterval(function() {
        callback();
    }, 200);

    //    window.IOSBridge.callHandler(
    // 	        'callFromTDWeb'
    // 	        , {'param': data}
    // 	        , function(responseData) {
    // 	        	respFunc(responseData);
    // 	        }
    // 	    );


}

//获取app存储的值
function GetAppData(key, respFunc) {
    JSCallJava('get_data', 'js_' + key, respFunc);
}

function GetSystemInfo(cb) {
    if (isMobile.AppClient()) {
        JSCallJava('get_system_info', '', function(appData){
            if (appData) {
                var appDataJson = JSON.parse(appData);
                typeof cb === 'function' && cb(appDataJson);
            }
        });
    }
}

function GetInputPhoneInfo(cb) {
    if (isMobile.AppClient()) {
        JSCallJava('get_input_phone_info', '', function(appData){
            if (appData) {
                var appDataJson = JSON.parse(appData);
                typeof cb === 'function' && cb(appDataJson);
            }
        });
    }
}

function getIosVersion() {
    return (navigator.userAgent).match(/OS (\d+)_(\d+)_?(\d+)?/)[0].match(/(\d+)_(\d+)_?(\d+)?/g)[0].replace(/_/g, '.');
}

// 判断是否为固定body的iOS版本号 10-*
function JungleFixedBodyModel(cb) {
    try {
        var compatibleVersions = ['10.0.1', '10.1', '10.2'];
        if (isMobile.iOS() && compatibleVersions.indexOf(getIosVersion()) > -1) {
            typeof cb === 'function' && cb(true);
        } else {
            typeof cb === 'function' && cb(false);
        }
    } catch (e) {
        cb(false);
    }
}

/**
 * @description 保存数据到APP
 *
 * @param {string} key
 * @param {string} data
 */
function SaveDataToApp(key, data, hasPrefix) {
    hasPrefix = typeof hasPrefix === 'undefined' ? true : hasPrefix;
    // 禁止输入法后退拦截交互
    if (isMobile.isAppInput() && key == 'quit_ok') return;
    var appData = {
        key: hasPrefix ? 'js_' + key : key,
        value: data
    }
    appShare(34, appData);
}

//setTimeout(function(){
//	SaveDataToApp("test", "abc")
//}, 5000)
//
//
//setTimeout(function(){
//	GetAppData("test",function(data){
//		motify.show('getdata:' + data)
//		console.log("getdata:"+data)
//	})
//}, 7000)



//(function(){
//    ajaxFn('/service/version.jsp?v=' + VERSION, function (data) {
//        var urlFileName = url = location.pathname.replace(/(.*\/)*([^.]+).*/ig, '$2');
//        if (VERSION < data.version) {
//            if (window.sessionStorage.getItem(urlFileName)) {
//                if (isMobile.AppAndroid()) {
//                    motify.show('当前缓存' + VERSION + '过旧，请点击右上角选择退出当前账号后重新登录')
//                } else {
//                    motify.show('当前缓存' + VERSION + '过旧，请清空浏览器或微信缓存')
//                }
//            } else {
//                window.sessionStorage.setItem(urlFileName, '1');
//                if (isMobile.AppAndroid()) {
//                    native.appclienShare(11, '');
//                } else {
//                    location.replace(setUrlParam(allUrl, 't', new Date().getTime()))
//                }
//            }
//        }
//    });
//}());

window.requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
        return setTimeout(callback, 1000 / 60)
    };
window.cancelAnimationFrame = window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelAnimationFrame ||
    clearTimeout;

// 非app引入友盟统计
(function () {
    if (isMobile.AppClient()) return;

    var hm = document.createElement('script');
    hm.src = location.protocol + '//s19.cnzz.com/z_stat.php?id=1275056938';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(hm, s);
})();
