import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { View, Text, Image } from '@tarojs/components';
import WgComponent from '../../common/component';
import WgLoading from '../loading';
import iconSuccess from '../../ui-images/toast-success.png';
import iconError from '../../ui-images/toast-error.png';
const toastIcons = {
  success: iconSuccess,
  error: iconError,
  loading: 1
};
export default class WgToast extends WgComponent {
  constructor(props) {
    super(props);
    const {
      isOpened,
      duration
    } = props;

    if (isOpened) {
      this.makeTimer(duration || 0);
    }

    this._timer = null;
    this.state = {
      _isOpened: isOpened
    };

    this.handleClick = event => {
      const {
        onClick,
        status
      } = this.props;

      if (status === 'loading') {
        return;
      }

      if (onClick) {
        return onClick(event);
      }

      this.close();
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      isOpened,
      duration
    } = nextProps;

    if (!isOpened) {
      this.close();
      return;
    }

    if (!this.state._isOpened) {
      this.setState({
        _isOpened: true
      });
    } else {
      this.clearTimmer();
    }

    this.makeTimer(duration || 0);
  }

  clearTimmer() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  makeTimer(duration) {
    if (duration === 0) {
      return;
    }

    this._timer = setTimeout(() => {
      this.close();
    }, +duration);
  }

  close() {
    const {
      _isOpened
    } = this.state;

    if (_isOpened) {
      this.setState({
        _isOpened: false
      }, this.handleClose // TODO: Fix dirty hack
      );
      this.clearTimmer();
    }
  }

  handleClose(event) {
    // TODO: Fix dirty hack
    if (typeof this.props.onClose === 'function') {
      this.props.onClose(event);
    }
  }

  render() {
    const {
      _isOpened
    } = this.state;
    const {
      customStyle,
      text,
      status,
      image,
      hasMask
    } = this.props;
    const realImg = image || toastIcons[status] || null;
    const bodyClass = classNames('toast-body', {
      [`wg-toast__body--${status}`]: !!status
    });
    let imgItemClass = 'toast-body-content__img-item';

    if (status == 'loading') {
      imgItemClass = 'toast-body-content__img-item2';
    }

    let isPureText = true;

    if (status) {
      isPureText = false;
    } // console.log('WgToast render, _isOpened=', _isOpened);


    return _isOpened ? /*#__PURE__*/React.createElement(View, {
      className: classNames('wg-toast', this.props.className)
    }, hasMask && /*#__PURE__*/React.createElement(View, {
      className: "wg-toast__overlay"
    }), isPureText && /*#__PURE__*/React.createElement(View, {
      className: "toast-text-body"
    }, /*#__PURE__*/React.createElement(View, {
      className: "toast-text-body-content"
    }, text)), !isPureText && /*#__PURE__*/React.createElement(View, {
      className: bodyClass,
      style: customStyle,
      onClick: this.handleClick
    }, /*#__PURE__*/React.createElement(View, {
      className: "toast-body-content"
    }, realImg ? /*#__PURE__*/React.createElement(View, {
      className: "toast-body-content__img"
    }, status != 'loading' && /*#__PURE__*/React.createElement(Image, {
      className: imgItemClass,
      src: realImg,
      mode: "scaleToFill"
    }), status == 'loading' && /*#__PURE__*/React.createElement(WgLoading, {
      color: "#ccc",
      size: "38",
      border: "2"
    })) : null, text && /*#__PURE__*/React.createElement(View, {
      className: "toast-body-content__info"
    }, /*#__PURE__*/React.createElement(Text, null, text))))) : null;
  }

}
WgToast.defaultProps = {
  duration: 3000,
  isOpened: false
};
WgToast.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  hasMask: PropTypes.bool,
  image: PropTypes.string,
  isOpened: PropTypes.bool,
  duration: PropTypes.number,
  status: PropTypes.oneOf(['', 'error', 'loading', 'success']),
  onClick: PropTypes.func,
  onClose: PropTypes.func
};