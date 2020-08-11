/* eslint-disable react/sort-comp */

/* eslint-disable import/first */

/* eslint-disable taro/this-props-function */
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View } from '@tarojs/components';
import { delayGetClientRect } from '../../common/utils.js';
import WgBubble from '../bubble';
import classNames from 'classnames';
import PropTypes from 'prop-types';
export default class WgSlideContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startX: 0,
      startY: 0,

      /**动画 */
      animation: '',

      /**是否显示气泡 */
      isOpened: false,

      /**控制气泡的位置 */
      left: 0,
      top: 0,
      clientX: 0,
      clientY: 0,
      zindex: 999,
      width: 0,
      proportion: 0,
      isBgcColor: false
    };

    this.refCat = node => {
      if (node) this.cat = node;
    };
  }

  componentDidMount() {
    // 页面渲染完成
    //实例化一个动画
    let animation = Taro.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      delay: 50,
      transformOrigin: 'left top 0',
      success: function () {}
    });
    this.setState({
      animation: animation
    });
  } // 滑动开始


  touchstart(e) {
    this.close();
    /**记录气泡的坐标 */

    this.props.isPopBubble && this.computedBubbleXY(e);
    /**记录动画的坐标 */

    if (!this.props.isScroll) return;
    this.animationRight();

    if (e.changedTouches && e.changedTouches.length > 0) {
      this.setState({
        startX: e.changedTouches[0].clientX,
        startY: e.changedTouches[0].clientY
      });
    }
  } //滑动事件处理 _index当前索引


  touchmove(e) {
    if (!this.props.isScroll) return;
    setTimeout(() => {
      let startX = this.state.startX; //开始X坐标

      let startY = this.state.startY; //开始Y坐标

      let touchMoveX = e.changedTouches[0].clientX; //滑动变化坐标

      let touchMoveY = e.changedTouches[0].clientY; //滑动变化坐标
      // let isLeft = _class.indexOf("leftMove") != -1; //往左滑的位置
      // let isRight = _class.indexOf("rightMove") != -1;//往右滑的位置
      //获取滑动角度

      let angle = this.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      }); //滑动超过30度角 return

      if (Math.abs(angle) > 30) return; //右滑

      if (touchMoveX > startX) {
        //console.log('右滑');
        this.animationRight();
      } else if (touchMoveX - startX < -10) {
        //左滑
        //console.log('左滑');
        //实例化一个动画
        this.animationLeft();
        this.props.watchAnimation(1);
      }
    }, 50);
  }
  /**左滑动画 */


  animationLeft() {
    let _animation = Taro.createAnimation({
      duration: 300,
      timingFunction: 'linear',
      delay: 50,
      transformOrigin: 'left top 0',
      success: () => {}
    });

    let px;
    let totalWidth = this.props.itemsList.length * 160;

    if (process.env.TARO_ENV === 'weapp') {
      // let systemInfo = Taro.getSystemInfoSync();
      px = -160; //-totalWidth / 750 * systemInfo.windowWidth;
    } else if (process.env.TARO_ENV === 'h5') {
      px = Taro.pxTransform(-totalWidth);
    }

    _animation.translateX(px).step();

    this.setState({
      //输出动画
      animation: _animation.export(),
      isFlexEnd: true
    });
  }
  /**右滑动画 */


  animationRight() {
    //console.log('animationRight...');
    //实例化一个动画
    let _animation = Taro.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: 'left top 0',
      success: function () {}
    });

    _animation.translateX(0).step();

    this.setState({
      //输出动画
      animation: _animation.export(),
      isFlexEnd: false
    });
  }
  /**
    * 计算滑动角度
    * @param {Object} start 起点坐标
    * @param {Object} end 终点坐标
    */


  angle(start, end) {
    let _X = end.X - start.X,
        _Y = end.Y - start.Y; //返回角度 /Math.atan()返回数字的反正切值


    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  }

  close() {
    this.animationRight();
    this.setState({
      isOpened: false,
      isBgcColor: false
    });
  }
  /**设置 setBubble 的 X轴 Y轴 的位置 */


  setBubbleXY(e, rect) {
    let width = this.state.width;
    let top = rect.height;
    let left = e.changedTouches[0].clientX;
    left = left < width / 2 + 10 ? width / 2 + 10 : left > rect.width - (width / 2 + 10) ? rect.width - (width / 2 + 10) : left;
    let proportion = Math.ceil((left + 10) / rect.width * 100);
    this.setState({
      clientY: top,
      clientX: left,
      proportion
    });
  }
  /**获取气泡的width */


  queryBubbleStyle() {
    return new Promise(resovle => {
      this.setState({
        isOpened: true,
        zindex: -1
      }, () => {
        this.cat.getClientRect().then(v => {
          this.setState({
            isOpened: false,
            zindex: 999,
            width: v[0].width
          }, () => {
            resovle('ok');
          });
        });
      });
    });
  }
  /**计算气泡在页面的 x轴 和 y轴 的位置*/


  computedBubbleXY(e) {
    delayGetClientRect({
      self: this,
      delayTime: 0,
      selectorStr: `.wg-slide-container`
    }).then(rect => {
      if (this.state.width == 0 || !this.state.width) {
        this.queryBubbleStyle().then(() => {
          this.setBubbleXY(e, rect[0]);
        });
      } else {
        this.setBubbleXY(e, rect[0]);
      }
    });
  }
  /**长按显示气泡 */


  onLongPressFn() {
    if (this.props.isPopBubble) {
      let {
        clientX,
        clientY
      } = this.state;
      this.setState({
        isOpened: true,
        left: clientX,
        top: clientY,
        isBgcColor: true
      }, () => {
        this.props.watchAnimation(2);
      });
    }

    this.props.onLongPress();
  }

  render() {
    const {
      indexState,
      itemsList,
      hideLastLine,
      height,
      lineRightOrCenter
    } = this.props;
    /**气泡 start */

    let {
      isOpened,
      top,
      left,
      zindex,
      proportion,
      isBgcColor,
      isFlexEnd
    } = this.state;
    let arrowStyle = {
      left: `${proportion}%`
    };
    let num = indexState ? '20%' : '-120%';
    let customStyle = `top:${indexState ? top : 0}px;left:${left}px;z-index:${zindex};transform:translate(-50%,${num})`;
    let style = {
      height,
      lineHeight: height
    };
    let itemStyle = {
      // 'margin-right': Taro.pxTransform(this.props.itemsList.length * -160),
      position: 'absolute',
      right: 0,
      transform: 'translateX(100%)'
    };
    let itemstyle = {
      height
    };
    let historyItem = {
      height: `${height}px`,
      justifyContent: isFlexEnd ? 'flex-end' : '',
      overflow: ''
    }; //console.log('top, left:', top, left);

    /**气泡 end */

    return /*#__PURE__*/React.createElement(View, {
      className: "wg-slide-container",
      style: itemstyle
    }, /*#__PURE__*/React.createElement(View, {
      className: "wg-history-item",
      style: historyItem,
      onLongPress: this.onLongPressFn.bind(this),
      animation: this.state.animation,
      onTouchStart: this.touchstart.bind(this),
      onTouchEnd: this.touchmove.bind(this)
    }, /*#__PURE__*/React.createElement(View, {
      className: classNames(isBgcColor ? 'wg-silde-bgc' : 'wg-silde-bgc-white', 'wg-item-cover')
    }, /*#__PURE__*/React.createElement(View, null, this.props.children), !hideLastLine && /*#__PURE__*/React.createElement(View, {
      className: classNames(lineRightOrCenter === 'center' ? 'wg-show-line' : 'wg-show-line1')
    })), /*#__PURE__*/React.createElement(View, {
      className: "wg-item-delete wg-right",
      style: itemStyle
    }, itemsList.map((item, index) => {
      // console.log('item.style', item.style);
      return /*#__PURE__*/React.createElement(View, {
        className: "wg-history-btn wg-overhead",
        key: item.text,
        taroKey: item.text,
        style: { ...item.style,
          ...style
        },
        onClick: item.onClick
      }, item.text);
    }))), /*#__PURE__*/React.createElement(WgBubble, {
      ref: this.refCat,
      isOpened: isOpened,
      isArrowUp: indexState,
      items: itemsList,
      customStyle: customStyle,
      arrowStyle: arrowStyle
    }));
  }

}
WgSlideContainer.defaultProps = {
  /**是否开启滑动 */
  isScroll: false,

  /**是否开启显示气泡 */
  isPopBubble: false,

  /**左滑以后显示的按钮文本和样式以及事件 */
  itemsList: [],

  /**长按事件 */
  onLongPress: () => {},

  /**监听左滑事件 */
  watchAnimation: () => {},

  /**index === 0的时候气泡要特殊处理 */
  indexState: false,

  /** 隐藏最后一项的分隔线 */
  hideLastLine: false,
  lineRightOrCenter: 'center',

  /**高度 */
  height: null
};