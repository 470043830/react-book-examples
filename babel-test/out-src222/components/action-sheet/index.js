import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import WgComponent from '../../common/component';
import WgActionSheetBody from './body/index';
import WgActionSheetFooter from './footer/index';
import WgActionSheetHeader from './header/index'; // import WgMask from '../mask';

export default class WgActionSheet extends WgComponent {
  constructor(props) {
    super(props); // const { isOpened } = props;

    this.state = {
      _isOpened: false,
      _isInitMount: false,
      _isInitAnimation: false
    };

    this.handleCancel = () => {
      this.props.onCancel();
      this.closeSheet();
    };

    this.closeSheet = () => {
      this.setState({
        _isOpened: false
      }, this.handleClose);
    };

    this.handleClose = () => {
      this.props.onClose();
    };

    this.handleTouchMove = e => {
      // console.log('handleTouchMove: ');
      e.stopPropagation();
      e.preventDefault();
    };
  }

  componentWillUnmount() {
    if (this._aniDelayTimer) {
      clearTimeout(this._aniDelayTimer);
      this._aniDelayTimer = null;
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      isOpened
    } = nextProps;

    if (isOpened !== this.state._isOpened) {
      this.setState({
        _isOpened: isOpened
      });
      !isOpened && this.handleClose();

      if (isOpened) {
        this.initFirstShow();
      }
    }
  }

  initFirstShow() {
    if (!this.state._isInitMount) {
      this.setState({
        _isInitMount: true
      });

      if (!this._aniDelayTimer) {
        this._aniDelayTimer = setTimeout(() => {
          this.setState({
            _isInitAnimation: true
          });
        }, 60);
      }
    }
  }

  customUpdate(nextProps, nextState) {
    if (!this.props.isOpened && !nextProps.isOpened) {
      return false;
    }

    return this.shallowEqualUpdate(nextProps, nextState);
  }

  render() {
    // console.log('WgActionSheet render: ', this.props);
    const {
      title,
      cancelText,
      className
    } = this.props;
    const {
      _isOpened,
      _isInitMount,
      _isInitAnimation
    } = this.state;
    const rootClass = classNames('wg-action-sheet', {
      'wg-action-sheet--active': _isOpened && _isInitAnimation
    }, className);

    if (!_isInitMount) {
      return null;
    }

    return /*#__PURE__*/React.createElement("view", {
      className: rootClass,
      onTouchMove: this.handleTouchMove
    }, /*#__PURE__*/React.createElement("catch-box", null, /*#__PURE__*/React.createElement(View, {
      onClick: this.closeSheet,
      className: "wg-action-sheet__overlay"
    }), /*#__PURE__*/React.createElement(View, {
      className: "wg-action-sheet__container"
    }, title && /*#__PURE__*/React.createElement(WgActionSheetHeader, null, title), /*#__PURE__*/React.createElement(WgActionSheetBody, null, this.props.children), cancelText && /*#__PURE__*/React.createElement(WgActionSheetFooter, {
      onClick: this.handleCancel
    }, cancelText))));
  }

}
WgActionSheet.aaaaaaaaaaaaaaaaaaaaaa = 111111111111111111111111111;
WgActionSheet.defaultProps = {
  title: '',
  cancelText: '',
  isOpened: false,
  onClose: () => {},
  onCancel: () => {}
};
WgActionSheet.propTypes = {
  title: PropTypes.string,
  cancelText: PropTypes.string,
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onCancel: PropTypes.func
};