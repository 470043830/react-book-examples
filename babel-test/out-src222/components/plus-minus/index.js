import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { View, Input } from '@tarojs/components';
/**
 * 加减组件
 * @value  {Number}  行数
 */

class WgPlusMinus extends React.Component {
  constructor(props) {
    super(props);

    this.disabledMinus = (val, min) => {
      return val <= min;
    };

    this.disabledPlus = (val, max) => {
      return val >= max;
    };
  }

  render() {
    const {
      className,
      inputClassName,
      onInput,
      onPlus,
      onMinus,
      onBlur,
      min,
      max,
      value,
      editable,
      classCover,
      listidx,
      goodsidx,
      index,
      sku,
      shop_id,
      goods_id
    } = this.props;
    const cls = classNames({
      'f-flex': true,
      'f-vc': true,
      'plus_minus': editable,
      'plus_minus_red': classCover,
      [className]: className
    });
    const inputCls = classNames({
      'plus_minus_input': editable,
      'text-center': true
    }, inputClassName);
    const WgPlusMinusCls = classNames({
      'plus_minus_btn': true
    });
    const styles = {
      disabledIcon: {
        opacity: 0.2
      },
      normalIcon: {
        opaciry: 1
      }
    };
    const minusIconStyle = this.disabledMinus(value, min) ? styles.disabledIcon : styles.normalIcon;
    const plusIconStyle = this.disabledPlus(value, max) ? styles.disabledIcon : styles.normalIcon;
    return /*#__PURE__*/React.createElement(View, {
      className: cls
    }, /*#__PURE__*/React.createElement(View, {
      className: WgPlusMinusCls,
      style: minusIconStyle,
      "data-listidx": listidx,
      "data-goodsidx": goodsidx,
      "data-index": index,
      "data-value": value,
      "data-min": min,
      "data-sku": sku,
      "data-shop-id": shop_id,
      "data-goods-id": goods_id,
      onClick: onMinus
    }, "-"), /*#__PURE__*/React.createElement(Input, {
      className: inputCls,
      value: value,
      type: "number",
      "data-listidx": listidx,
      "data-goodsidx": goodsidx,
      "data-index": index,
      "data-value": value,
      "data-min": min,
      "data-max": max,
      "data-sku": sku,
      "data-shop-id": shop_id,
      "data-goods-id": goods_id,
      onBlur: onBlur,
      onInput: onInput
    }), /*#__PURE__*/React.createElement(View, {
      className: WgPlusMinusCls,
      style: plusIconStyle,
      "data-listidx": listidx,
      "data-goodsidx": goodsidx,
      "data-index": index,
      "data-value": value,
      "data-max": max,
      "data-sku": sku,
      "data-shop-id": shop_id,
      "data-goods-id": goods_id,
      onClick: onPlus
    }, "+"));
  }

}

WgPlusMinus.propTypes = {
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  onInput: PropTypes.func,
  onPlus: PropTypes.func,
  onMinus: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.string,
  editable: PropTypes.bool,
  sku: PropTypes.object,
  onBlur: PropTypes.func
};
WgPlusMinus.defaultProps = {
  className: '',
  inputClassName: '',
  onInput: () => {},
  onPlus: () => {},
  onMinus: () => {},
  onBlur: () => {},
  min: 0,
  max: Infinity,
  value: '',
  editable: true,
  sku: {}
};
export default WgPlusMinus;