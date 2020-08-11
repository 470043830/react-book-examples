
import Taro from '@tarojs/taro';
import React from 'react';
import { View, Image, Text, Button } from '@tarojs/components';
import WgBadge from '../badge';
import rightIcon from '../../ui-images/right-icon.png';


export default class WgMultiCell extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        const {
            userImgUrl,
            userName,
            promptState,
            promptNumber,
            promptStateValue,
            onRowActive,
            productObj,
            onContact,
            onGetUserInfo,
            onGetPhoneNumber,
            onLaunchapp,
            hoverClass,
            openType,
            vipUrl,
            type,
            operatingTime,
            operatingName,
            onBtnActive,
            btnValue,
            promptStateValueStyle,
        } = this.props;

        let dom = (productObj.firstParamsKey || productObj.lastParamsKey) &&
            <View className='wg-align-items'>
                <View className='wg-mr-32 wg-line-height-40 wg-align-items'>
                    <Text className='wg-name-color wg-ft-28 wg-mr-8'>{productObj.firstParamsKey}</Text>
                    <Text className='wg-number-color wg-ft-28 wg-ft-w600'>{productObj.firstParamsValue}</Text>
                </View>
                <View className='wg-line-height-40 wg-align-items'>
                    <Text className='wg-name-color wg-ft-28 wg-mr-8'>{productObj.lastParamsKey}</Text>
                    <Text className='wg-goods-color wg-ft-28 wg-ft-w600'>{productObj.lastParamsValue}</Text>
                </View>
            </View>;
        return (
            <Button
                className='wg-user-list wg-space-between'

                hoverClass={hoverClass}
                openType={openType}
                onClick={onRowActive}
                onContact={onContact.bind(this)}
                onGetUserInfo={onGetUserInfo.bind(this)}
                onGetPhoneNumber={onGetPhoneNumber.bind(this)}
                onLaunchapp={onLaunchapp.bind(this)}
            >
                <View className='wg-justify-start'>
                    {userImgUrl && <Image src={userImgUrl} lazyload  mode='aspectFill' className='wg-user-img wg-mr-24'></Image>}
                    <View className={(!productObj.firstParamsKey && !productObj.lastParamsKey) &&  'wg-justify-start'}>
                        <View className='wg-justify-start wg-relative wg-big-box'>
                            <View className='wg-user-name wg-overflow wg-ft-34'>{userName}</View>
                            {vipUrl && <Image src={vipUrl} lazyload className='wg-vip wg-absolute'></Image>}
                        </View>
                        <View style='width:100%;height:2px;'></View>
                        {dom}
                    </View>
                </View>


                {/* 第一种情况右侧显示操作信息 */}
                {type === 'default' &&
                    <View className='wg-align-items line-height-normal'>
                        {
                            promptState &&

                            (
                                promptNumber ?
                                    <View className='wg-mr-4 wg-relative'>
                                        <WgBadge value={promptNumber} maxValue={99} corner customStyle='position:relative;transform:translate(0, 0)'></WgBadge>
                                    </View>
                                    :
                                    <View className='wg-mr-4'>
                                        <WgBadge dot></WgBadge>
                                    </View>
                            )
                        }
                        {promptStateValue && <View className='wg-prompt-value wg-mr-4 wg-ft-28' style={promptStateValueStyle}>{promptStateValue}</View>}




                        <Image className='wg-right-icon wg-ml-18' src={rightIcon}></Image>
                    </View>
                }

                {/* 第二种情况右侧显示操作信息 */}
                {type === 'operatingInfo' &&
                    <View className='wg-direction-column-center wg-cell-mr-16'>
                        <View className='wg-explanation wg-ft-28'>{operatingName}</View>
                        <View className='wg-timer wg-ft-24'>{operatingTime}</View>
                    </View>
                }

                {/* 第三种情况右侧显示按钮 */}
                {
                    type === 'btn' &&
                    <Button className='wg-btn wg-cell-mr-16 wg-ft-30' hover-class='none' onClick={onBtnActive} >{btnValue}</Button>
                }
            </Button>

        );
    }
}

WgMultiCell.defaultProps = {
    /**img的url */
    userImgUrl: null,
    /**用户name */
    userName: null,
    /**是否显示小红点 */
    promptState: null,
    /** 小红点里面的未完成数目 */
    promptNumber: null,
    /** 状态 */
    promptStateValue: null,
    /**点击某一行 */
    onRowActive: () => { },
    productObj: {
        firstParamsKey: null,
        firstParamsValue: null,
        lastParamsKey: null,
        lastParamsValue: null,
    },
    /**打开客服 */
    onContact: () => { },
    /**获取用户信息 */
    onGetUserInfo: () => { },
    /**获取手机号码 */
    onGetPhoneNumber: () => { },
    /**打开app */
    onLaunchapp: () => { },
    /**hoverClass */
    hoverClass: 'wg-btn-default',
    /**按钮开能力 */
    openType: null,
    /**vip的icon图标 */
    vipUrl: null,
    type: 'default',
    operatingName: null,
    operatingTime: null,
    btnValue: null,
    onBtnActive: () => { },
    promptStateValueStyle:{},
};

// WgMultiCell.propTypes = {
//     userImgUrl: PropTypes.string,
//     userName: PropTypes.string,
//     promptNumber: PropTypes.number,
//     promptStateValue: PropTypes.string,
//     onRowActive: PropTypes.func,
//     onOverhead: PropTypes.func,
//     onDelete: PropTypes.func,
// };


