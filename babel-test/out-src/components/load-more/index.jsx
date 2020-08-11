import Taro from '@tarojs/taro';
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Text, View } from '@tarojs/components';
import WgComponent from '../../common/component';
import WgActivityIndicator from '../activity-indicator/index';
import WgButton from '../button/index';
export default class WgLoadMore extends WgComponent {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.onClick = () => {
      this.props.onClick && this.props.onClick();
    }, _temp;
  }

  render() {
    // console.log('WgLoadMore render...');
    const {
      className,
      customStyle,
      loadingText,
      moreText,
      status,
      moreBtnStyle,
      noMoreTextStyle,
      noMoreText,
      noDataText
    } = this.props;
    let component = null;

    if (status === 'loading') {
      component = /*#__PURE__*/React.createElement(WgActivityIndicator, {
        size: 20,
        mode: "center",
        content: loadingText
      });
    } else if (status === 'more') {
      component = /*#__PURE__*/React.createElement(View, {
        className: "wg-load-more__cnt"
      }, /*#__PURE__*/React.createElement(WgButton, {
        full: true,
        onClick: this.onClick.bind(this),
        customStyle: moreBtnStyle
      }, moreText));
    } else if (status === 'noData') {
      component = /*#__PURE__*/React.createElement(View, {
        className: "wg-load-more__bar"
      }, /*#__PURE__*/React.createElement(View, {
        className: "wg-load-more__line"
      }), /*#__PURE__*/React.createElement(Text, {
        className: "wg-load-more__tip",
        style: noMoreTextStyle
      }, noDataText), /*#__PURE__*/React.createElement(View, {
        className: "wg-load-more__line"
      }));
    } else {
      component = /*#__PURE__*/React.createElement(View, {
        className: "wg-load-more__bar"
      }, /*#__PURE__*/React.createElement(View, {
        className: "wg-load-more__line"
      }), /*#__PURE__*/React.createElement(Text, {
        className: "wg-load-more__tip",
        style: noMoreTextStyle
      }, noMoreText), /*#__PURE__*/React.createElement(View, {
        className: "wg-load-more__line"
      }));
    }

    return /*#__PURE__*/React.createElement(View, {
      className: classNames('wg-load-more', className),
      style: customStyle
    }, component);
  }

}
WgLoadMore.defaultProps = {
  customStyle: '',
  className: '',
  noMoreTextStyle: '',
  moreBtnStyle: '',
  status: 'more',
  loadingText: '正在加载...',
  moreText: '查看更多',
  noMoreText: '没有更多',
  noDataText: '暂无数据',
  onClick: () => {}
};
WgLoadMore.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  noMoreTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  moreBtnStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  status: PropTypes.oneOf(['more', 'loading', 'noMore', 'noData']),
  loadingText: PropTypes.string,
  moreText: PropTypes.string,
  noMoreText: PropTypes.string,
  noDataText: PropTypes.string,
  onClick: PropTypes.func
};