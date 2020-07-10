import React, { Component } from 'react';
import $ from 'jquery';

export default class JqueryTest extends Component {

    componentDidMount() {
        console.log('$(".test").text(): ', $(".test-jquery-page").text());
        console.log('--------------------------jQuery版本：' + $.fn.jquery);
        // this.ajaxGetReq();
        // this.jsonpReq();
    }

    jsonpReq() {
        $.ajax({
            type: "get",
            async: false,
            url: 'http://127.0.0.1:3009/api/flightHandler?code=CA1998',
            dataType: "jsonp",
            jsonp: "callback",
            // jsonpCallback: "jsonCallback",//自定义的jsonp回调函数名称，不定义默认为jQuery自动生成的随机函数名
            success: function (json) {
                console.log('您查询到航班信息：票价： ' + json.price + ' 元，余票： ' + json.tickets + ' 张。');
            },
            error: function () {
                // alert('fail');
                console.log('fail');
            }
        });
    }

    ajaxGetReq() {
        const url = 'http://127.0.0.1:3009/api/products';
        this.serverRequest = $.get(url, (result) => {
            console.log('ajaxGetReq, result:', result);
        });
    }

    ajaxPostReq() {
        const url = 'http://127.0.0.1:3009/api/products';
        const data = { "name": "XBox---" + Math.random(), "price": 3999 };
        $.post(url, data,
            (data, status) => {
                console.log('data, status: ', data, status);
            });
    }

    render() {
        return (
            <div className="test-jquery-page">
                jQuery
                <button onClick={() => this.jsonpReq()}>jsonpReq</button>
                <button onClick={() => this.ajaxGetReq()}>ajaxGetReq</button>
                <button onClick={() => this.ajaxPostReq()}>ajaxPostReq</button>
            </div>
        );
    }
}
