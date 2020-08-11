/* eslint-disable react/sort-comp */
/* eslint-disable taro/duplicate-name-of-state-and-props */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable taro/this-props-function */
import React from 'react';
import Taro from '@tarojs/taro';
import { View, Button, Image, Text, Switch } from '@tarojs/components';
import classNames from 'classnames';
import WgTag from '../tag';
import WgSplitLine from '../split-line';

import checkIcon from '../../ui-images/check-icon.png';
import checked from '../../ui-images/checked.png';
import rightIcon from '../../ui-images/right-icon.png';


export default class WgDisplayCell extends React.PureComponent {

    btnActive(e) {
        this.props.onBtnActive(e);
    }

    render() {
        const {
            title,
            type,
            placeholder,
            placeholderStyle,
            itemImg,
            detailImg,
            checkIconState,
            checkBoxState,
            hoverClass,
            openType,
            promptState,
            promptMsg,
            onGetUserInfo,
            onContact,
            onLaunchapp,
            onGetPhoneNumber,
            reverseValue,
            reverseStyle,
            descriptionVal,
            isSeesawLayout,
            disabled,
            hideLastLine,
            lineRightOrCenter,
            switchChecked,
            switchChange,
            isIcon,
        } = this.props;

        let style = {
            'background-color': disabled ? 'rgba(240,241,244,1)' : '',
        };

        // let borderStyle = {
        //     width: lineRightOrCenter === 'center' ? Taro.pxTransform(686) : Taro.pxTransform(718),
        //     marginLeft: Taro.pxTransform(32),
        //     // height: 1 / pixelRatio + 'px',
        //     // 'background-color': '#eeeeee',
        // };
        let lineClass = 'wg-line-my-class-no';

        if (itemImg || type === 'isCheckBox'){
            lineClass = 'wg-line-my-class-icon';
        }

        return (
            <View className={classNames(disabled && 'wg-display-cell-disabled', 'wg-display-cell')}>
                <Button
                    disabled={disabled}
                    className={classNames(descriptionVal ? 'wg-display-cell-height2 wg-pt-20 wg-pb-20' : 'wg-display-cell-height1', !isSeesawLayout && 'wg-align-items', 'wg-options', 'wg-pl-32', 'wg-pr-32')}
                    hoverClass={hoverClass}
                    openType={openType}
                    onClick={this.btnActive.bind(this)}
                    onContact={onContact.bind(this)}
                    onGetUserInfo={onGetUserInfo.bind(this)}
                    onGetPhoneNumber={onGetPhoneNumber.bind(this)}
                    onLaunchapp={onLaunchapp.bind(this)}
                    style='overflow:hidden;'
                >
                    <View className={classNames(isSeesawLayout ? 'wg-display-style1' : 'wg-display-style2 ', 'wg-space-between')}>
                        <View className='wg-list-title wg-ft-34 wg-justify-content-flex-start'>
                            {itemImg && <Image src={itemImg} lazyload className='wg-afferent-img wg-mr-20' />}

                            {
                                type === 'isCheckBox' &&
                                <View className={classNames('wg-checkbox', 'wg-vertically-center', 'wg-mr-32', !checkBoxState && 'wg-checkbox-border')} style={style}>
                                    {checkBoxState && <Image src={checked} className='checkbox-img wg-vertically-center' />}
                                </View>
                            }
                            <View className={classNames(descriptionVal ? '' : 'wg-justify-content-flex-start')}>

                                <View className={classNames(reverseValue ? 'wg-title-width' : 'wg-title', 'wg-text-overflow')}>{title}</View>

                                {!isSeesawLayout && descriptionVal && <View className='wg-description-val wg-ft-28'>{descriptionVal}</View>}

                                {reverseValue && <View className='wg-text-overflow wg-reverseValue' style={reverseStyle}>{reverseValue}</View>}
                            </View>
                        </View>

                        {type === 'isCheckIcon' && checkIconState && <Image src={checkIcon} className='wg-check-icon'></Image>}

                        {/* switch 在button中无法点击到，所以采用定位方式 */}
                        {type === 'isSwitch' && <Switch className='wg-cell-switch' disabled={disabled} checked={switchChecked} onChange={switchChange} />}

                        {
                            type === 'isContent' &&
                            <View className='wg-justify-content-flex-start wg-right-box'>
                                {placeholder && <Text className='wg-list-placeholder wg-ft-34 ' style={placeholderStyle}>{placeholder}</Text>}
                                {
                                    detailImg &&
                                    <Image src={detailImg} lazyload className='wg-afferent-img  '></Image>
                                }

                                {
                                    promptState &&
                                    (
                                        promptMsg ?
                                            <WgTag type='secondary' size='small' className=' wg-tag-40' circle>{promptMsg}</WgTag>
                                            :
                                            <WgTag type='dot' className=' wg-tag-20'></WgTag>
                                    )

                                }
                                {isIcon && <Image src={rightIcon} className='wg-right-icon wg-vertically-center wg-ml-20'></Image>}
                            </View>
                        }

                    </View>
                    {
                        isSeesawLayout &&
                        descriptionVal && <View className='wg-description-val1 wg-ft-28'>{descriptionVal}</View>
                    }

                </Button >
                {/* {!hideLastLine && <View className='wg-ml-32' style={borderStyle}></View>} */}
                {!hideLastLine && <WgSplitLine className={lineClass} />}
            </View>
        );
    }
}

WgDisplayCell.defaultProps = {
    /**标题 */
    title: null,
    onBtnActive: () => { },

    type: 'isContent',

    /**显示的提示文字 */
    placeholder: null,

    /**提示文字的style */
    placeholderStyle: null,

    /**传入的左边图片 */
    itemImg: null,

    /**传入的右侧边图片 */
    detailImg: null,

    checkIconState: true,

    /** switchChecked 改变时触发 change 事件 */
    switchChange: () => { },

    /** switch 是否选中 */
    switchChecked: false,

    /**checkBox的选中状态 */
    checkBoxState: true,

    /**点击按钮时候的效果 */
    hoverClass: 'wg-btn-default',
    /**按钮的开放功能 */
    openType: null,

    /**是否显示提示小红点 */
    promptState: false,

    /**是否显示提示小红点里面文字 */
    promptMsg: null,

    /**获取用户信息 */
    onGetUserInfo: () => { },

    /**打开客服 */
    onContact: () => { },

    /**打开app */
    onLaunchapp: () => { },

    /**获取手机号码 */
    onGetPhoneNumber: () => { },

    reverseValue: null,

    reverseStyle: {},
    /**描述信息 */
    descriptionVal: null,
    /**是否采用上下布局 */
    isSeesawLayout: false,

    disabled: false,
    /**隐藏最后一项的底部分割线 */
    hideLastLine: false,
    /**底部分割线居中还是靠右 */
    lineRightOrCenter: 'center',

    isIcon:true,

};

