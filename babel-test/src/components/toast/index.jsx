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
    loading: 1,
};

export default class WgToast extends WgComponent {
    constructor(props) {
        super(props);
        const { isOpened, duration } = props;
        if (isOpened) {
            this.makeTimer(duration || 0);
        }
        this._timer = null;
        this.state = {
            _isOpened: isOpened,
        };

        this.handleClick = (event) => {
            const { onClick, status } = this.props;
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
        const { isOpened, duration } = nextProps;
        if (!isOpened) {
            this.close();
            return;
        }

        if (!this.state._isOpened) {
            this.setState({
                _isOpened: true,
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
        const { _isOpened } = this.state;
        if (_isOpened) {
            this.setState(
                {
                    _isOpened: false,
                },
                this.handleClose // TODO: Fix dirty hack
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
        const { _isOpened } = this.state;
        const { customStyle, text, status, image, hasMask } = this.props;
        const realImg = image || toastIcons[status] || null;
        const bodyClass = classNames('toast-body', {
            [`wg-toast__body--${status}`]: !!status,
        });
        let imgItemClass = 'toast-body-content__img-item';
        if (status == 'loading') {
            imgItemClass = 'toast-body-content__img-item2';
        }
        let isPureText = true;
        if (status) {
            isPureText = false;
        }

        // console.log('WgToast render, _isOpened=', _isOpened);

        return _isOpened ? (
            <View className={classNames('wg-toast', this.props.className)}>
                {hasMask && <View className='wg-toast__overlay' />}
                {isPureText &&
                    <View className='toast-text-body'>
                        <View className='toast-text-body-content'>{text}</View>
                    </View>
                }
                {!isPureText &&
                    <View className={bodyClass} style={customStyle} onClick={this.handleClick}>
                        <View className='toast-body-content'>
                            {realImg ? (
                                <View className='toast-body-content__img'>
                                    {status != 'loading' && <Image className={imgItemClass} src={realImg} mode='scaleToFill' />}
                                    {status == 'loading' && <WgLoading color='#ccc' size='38' border='2' />}
                                </View>
                            ) : null}
                            {text && (
                                <View className='toast-body-content__info'>
                                    <Text>{text}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                }
            </View>
        ) : null;
    }
}


WgToast.defaultProps = {
    duration: 3000,
    isOpened: false,
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
    onClose: PropTypes.func,
};
