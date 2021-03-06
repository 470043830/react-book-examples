import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { View, Text, Input, Button } from '@tarojs/components';
import WgComponent from '../../common/component';
import WgModalHeader from './header/index';
import { WgButton } from '../index';
import { getTextListByHighWord } from './text-handler.js';


export default class WgModal extends WgComponent {
    constructor(props) {
        super(props);

        const { isOpened } = props;
        this.state = {
            _isOpened: isOpened,
            inputFocus: false,
            // isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB,
        };

        this.handleClickOverlay = () => {
            // console.log('handleClickOverlay...');
            if (this.props.closeOnClickOverlay) {
                this.setState({
                    _isOpened: false,
                }, this.handleClose);
            }
        };
        this.handleClose = (event) => {
            if (typeof this.props.onClose === 'function') {
                this.props.onClose(event);
            }
        };
        this.handleCancel = (event) => {
            if (typeof this.props.onCancel === 'function') {
                this.props.onCancel(event);
            }
        };
        this.handleConfirm = (event) => {
            if (typeof this.props.onInputted === 'function') {
                this.props.onInputted(this.state.inputValue);
            }
            if (typeof this.props.onConfirm === 'function') {
                this.props.onConfirm(event);
            }
        };
        this.handleTouchMove = (e) => {
            e.stopPropagation();
        };
        this.onInput = (e) => {
            this.setState({
                inputValue: e.detail.value,
            });
            // console.log('onInput...', this.state.inputValue);
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // // console.log('UNSAFE_componentWillReceiveProps...');
        const { isOpened } = nextProps;
        // if (this.props.isOpened !== isOpened) {
        //     handleTouchScroll(isOpened);
        // }
        if (isOpened !== this.state._isOpened) {
            this.setState({
                _isOpened: isOpened,
                inputFocus: isOpened,
            });
        }
        if (this.state.inputValue) {
            setTimeout(() => {
                this.clearInput();
            }, 200);
        }
    }


    clearInput() {
        // console.log('clearInput...');
        this.setState({
            inputValue: '',
        });
    }

    render() {
        const { _isOpened, inputFocus, inputValue } = this.state;
        const { title, content, cancelText, confirmText, onInputted, highWord, highStyle } = this.props;
        const rootClass = classNames('wg-modal', {
            'wg-modal--active': _isOpened,
        }, this.props.className);
        const textClass = classNames('wg-modal__content-text', {
            'wg-modal__content-black': !title,
        });
        let isInput = true;

        if (onInputted == undefined || onInputted == null) {
            isInput = false;
        }

        //handle high word
        let textList = getTextListByHighWord(content, highWord, highStyle); //[];

        // console.log('WgModal render....', _isOpened, textList);
        if (!_isOpened) {
            return null;
        }
        if (title || content) {
            return (
                <View className={rootClass}>
                    <View onClick={this.handleClickOverlay} onTouchMove={this.handleTouchMove} className='wg-modal__overlay' />
                    <View className='wg-modal__container' onTouchMove={this.handleTouchMove}>
                        <View className='wg-modal__top'></View>
                        {title && (
                            <WgModalHeader>
                                <Text>{title}</Text>
                            </WgModalHeader>
                        )}
                        {/* {title && <View className='wg-modal__title'>{title}</View>} */}
                        <View className='wg-modal__content'>
                            {/* {
                                Taro.Children.map(children, (child) => (<View className='wg-modal__content-child'>{child}</View>))
                            } */}
                            {content &&
                                <View className={textClass}>
                                {textList.map((item) => (<Text key={item.key} style={item.style}>{item.text}</Text>))}
                                </View>
                            }
                            {isInput &&
                                <View className='wg-modal__content-input'>
                                    <Input type='text' value={inputValue} onInput={this.onInput} placeholder='请输入来源' maxLength='18' focus={inputFocus} />
                                </View>}
                        </View>
                        <View className='wg-modal__footer'>
                            {cancelText && <WgButton className='wg-modal__footer-left' onClick={this.handleCancel}>{cancelText}</WgButton>}
                            {confirmText && <WgButton className='wg-modal__footer-right' onClick={this.handleConfirm}>{confirmText}</WgButton>}
                            {/* {openData && <Button className='wg-modal__footer-right' onClick={this.handleConfirm} openType={openData.openType} onGetUserInfo={openData.onGetUserInfo} onGetPhoneNumber={openData.onGetPhoneNumber} onOpenSetting={openData.onOpenSetting} onError={openData.onError} onContact={openData.onContact}>
                                {confirmText}
                            </Button>} */}
                            {cancelText && confirmText && <View className='wg-modal__footer-vline'></View>}
                        </View>
                    </View>
                </View>
            );
        }

        return <View onTouchMove={this.handleTouchMove} className={rootClass}>
            <View className='wg-modal__overlay' onClick={this.handleClickOverlay} />
            <View className='wg-modal__container'><View className='wg-modal__top'></View>{this.props.children}</View>
        </View>;
    }
}
WgModal.defaultProps = {
    isOpened: false,
    confirmText: '操作',
    closeOnClickOverlay: false,
    content: '',
};
WgModal.propTypes = {
    title: PropTypes.string,
    isOpened: PropTypes.bool,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    onClose: PropTypes.func,
    onInputted: PropTypes.func,
    content: PropTypes.string,
    closeOnClickOverlay: PropTypes.bool,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    highWord: PropTypes.string,
    highStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
