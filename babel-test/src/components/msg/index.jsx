import Taro from '@tarojs/taro';
import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Icon } from '@tarojs/components';
import WgButton from '../button';
import WgComponent from '../../common/component';


export default class WgMsg extends WgComponent {
    onClick(event) {
        if (!this.props.disabled) {
            this.props.onClick && this.props.onClick({
                name: this.props.name,
                active: this.props.active,
            }, event);
        }
    }
    render() {

        const { icon, iconType, title, btns} = this.props;
        const buttonStyle = `width:${Taro.pxTransform(696)};`;

        return (
            <View className='wg-msg' >
                <View className='wg-msg__header' >
                    {icon && <Image src={icon} className='wg-msg__header-icon'></Image>}
                    {iconType && <Icon size='70' type={iconType} />}
                    {/* <View className='wg-msg-test-svg' >
                    </View> */}
                </View>
                <View className='wg-msg__title' >
                    {title}
                </View>
                <View className='wg-msg__desc' >
                    {this.props.children}
                </View>
                <View className='wg-msg__buttons' >
                    {btns && btns.map((item) => (
                        <View key={item.id} className='wg-msg__buttons-item' >
                            <WgButton size={item.size} type={item.type} openType={item.openType} onClick={item.onClick} customStyle={buttonStyle} >
                                {item.btnText}
                            </WgButton>
                        </View>
                    ))}
                </View>

            </View>
        );
    }
}
WgMsg.defaultProps = {
    icon: '',
    title: '',
    btns: [],
    iconType: '',
};
WgMsg.propTypes = {
    icon: PropTypes.object,
    title: PropTypes.string,
    btns: PropTypes.object,
    iconType: PropTypes.string,
};
