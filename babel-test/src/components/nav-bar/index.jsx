/* eslint-disable react/sort-comp */
import React from 'react';
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';

/**图片引入 */
const isWEB = (Taro.getEnv() == Taro.ENV_TYPE.WEB);
const isWEAPP = (Taro.getEnv() == Taro.ENV_TYPE.WEAPP);

export default class WgNavBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            /**状态栏高度 */
            statusNavHeight: null,
            /**导航栏高度 */
            navBarHeight: null,
            /**总高度 */
            totalHeight: null,
        };
    }

    UNSAFE_componentWillMount() {
        this.setWeappNavbar();
    }

    /**如果是小程序就需要计算导航栏高度 */
    setWeappNavbar() {
        console.log('setWeappNavbar, isWEB: ', isWEB);
        if (isWEB) return;
        let sysinfo = Taro.getSystemInfoSync();
        let menuButtonObject = Taro.getMenuButtonBoundingClientRect();
        let statusHeight = sysinfo.statusBarHeight;
        let navHeight = menuButtonObject.height + (menuButtonObject.top - statusHeight) * 2;
        let statusNavHeight = {
            height: `${statusHeight}px;`,
        };
        let navBarHeight = {
            height: `${navHeight}px;`,
            top: `${statusHeight}px;`,
        };
        let totalHeight = `height:${navHeight + statusHeight}px;`;
        this.setState({
            statusNavHeight,
            navBarHeight,
            totalHeight,
            menuButtonLeft: sysinfo.screenWidth - menuButtonObject.left,
            // menuButtonTop: menuButtonObject.top - statusHeight,
        });
        // console.log('menuButtonObject:', sysinfo, menuButtonObject);
    }
    render() {
        const {
            title,
            iconUrl,
            style,
            onIconAtive,
            onTitleActive,
            isRelative,
            onPress,
            iconRight,
            onRightIconClick,
            onRightIconLongPress,
        } = this.props;
        const { menuButtonLeft, navBarHeight } = this.state;
        /** 小程序获取的nav高与父组件传进来的样式合并 */
        let navStyle = Object.assign({}, this.state.navBarHeight, style);
        // {
        //     ...this.state.navBarHeight,
        //     ...style,
        // };

        /** 小程序获取的status高与父组件传进来的样式合并 */
        let statusStyle = Object.assign({}, this.state.statusNavHeight, style);
        // {
        //     ...this.state.statusNavHeight,
        //     ...style,
        // };
        const iconRightStyle = {
            height: navBarHeight ? navBarHeight.height : 0,
            right: `${menuButtonLeft}px`,
            top: 0, //`${menuButtonTop}px`,
        };
        return (
            <View className='wg-navbar'>
                {/* 小程序的状态栏 start */}
                {
                    isWEAPP &&
                    <View className='wg-fixed wg-nav-top' style={statusStyle}></View>
                }
                {/* 小程序的状态栏 end */}

                <View className='wg-nav-bar wg-space-between' style={navStyle}>

                    {/* 左侧icon start */}
                    {
                        iconUrl &&
                        <View className='wg-nav-icon-box' onClick={onIconAtive} onLongPress={onPress} >
                            <Image src={iconUrl} className='wg-nav-icon' />
                        </View>
                    }
                    {/* 左侧icon end */}


                    {/* 中间标题 start*/}
                    <View className='wg-nav-title' onClick={onTitleActive}>
                        {title}
                    </View>
                    {/* 中间标题  end*/}

                    {/* 右侧icon start */}
                    {
                        iconRight && <View className='wg-nav-right-icon-box' style={iconRightStyle} onClick={onRightIconClick} onLongPress={onRightIconLongPress}>
                            <Image src={iconRight} className='wg-nav-right-icon' />
                        </View>

                    }
                    {/* 右侧icon end */}
                </View>

                {isWEAPP && isRelative && <View style={this.state.totalHeight}></View>}
                {isWEB && isRelative && <View className='wg-h5'></View>}

            </View>
        );
    }
}


WgNavBar.defaultProps = {
    /**
     * 支持 h5 和 小程序
     **标题 */
    title: null,

    /**
      * 支持 h5 和 小程序
     ** icon   url*/
    iconUrl: null,

    /**
     *  支持 h5 和 小程序
     *  default:"background-color:white;color:#252525;"
     *  导航栏的一些样式，比如 字体大小，导航栏背景
     **/
    style: {
        'background-color': '#fff',
        color: '#252525',
    },

    onIconAtive: () => { },

    onTitleActive: () => { },
    /**导航栏是否占位 */
    isRelative: true,
    /**icon长按事件 */
    onPress: () => { },

    iconRight: null,
    onRightIconClick: () => { },
    onRightIconLongPress: () => { },
};
