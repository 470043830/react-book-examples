/* eslint-disable taro/duplicate-name-of-state-and-props */
/* eslint-disable react/no-unused-state */

import Taro from '@tarojs/taro';
import React from 'react';
import { View, ScrollView, Block } from '@tarojs/components';
import classNames from 'classnames';


export default class WgTabs extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    tabSelect(index) {
        this.props.onTabSelect(index);
    }

    render() {
        let {
            list,
            TabCur,
            bSpaceAround,
            maxWidth,
            needScroll,
            customStyle,
        } = this.props;

        TabCur =  Number(TabCur);

        const systemInfo = Taro.getSystemInfoSync();
        const { windowWidth } = systemInfo;

        //
        const maxLen = Math.floor(windowWidth / maxWidth);
        // console.log('windowWidth, maxLen, maxWidth = ', windowWidth, maxLen, maxWidth);

        return (
            <Block>
                {
                    this.props.customize ?
                        <View className='wg-scroll-tab'>
                            {
                                (list.length >= maxLen && needScroll) &&
                                <ScrollView scrollX className='wg-scroll-view' >
                                    <View className='wg-align-items wg-is-scroll'>
                                        {this.props.children}
                                    </View>
                                </ScrollView>
                            }

                            {
                                (list.length < maxLen || !needScroll) &&
                                <View className={bSpaceAround?'wg-space-around':'wg-align-items'}>
                                    {this.props.children}
                                </View>
                            }
                        </View>
                        :
                        <View className='wg-scroll-tab'>
                            {
                                (list.length >= maxLen && needScroll) &&
                                <ScrollView scrollX className='wg-scroll-view' >
                                    <View className='wg-align-items wg-is-scroll'>
                                        {list.map((item, index) => {
                                            return <View
                                                key={item.id}
                                                taroKey={item.id}
                                                className={classNames('wg-tab-item', index === TabCur ? 'wg-tab-target' : '')}
                                                onClick={this.tabSelect.bind(this, index)}
                                                style={customStyle}
                                            >
                                                {item.value}
                                            </View>;
                                        })}
                                    </View>
                                </ScrollView>
                            }

                            {
                                (list.length < maxLen || !needScroll) &&
                                <View className={bSpaceAround?'wg-space-around':'wg-align-items'}>
                                    {list.map((item, index) => {
                                        return <View
                                            key={item.id}
                                            taroKey={item.id}
                                            className={classNames('wg-tab-item', index === TabCur ? 'wg-tab-target' : '')}
                                            onClick={this.tabSelect.bind(this, index)}
                                            style={customStyle}
                                        >
                                            {item.value}
                                        </View>;
                                    })}
                                </View>
                            }
                        </View>
                }
            </Block>
        );
    }
}


WgTabs.defaultProps = {
    /**scroll-view 得数据*/
    list: [],
    onTabSelect: () => { },
    customize: false,
    TabCur: 0,
    bSpaceAround: true, // 是否平均分布
    maxWidth: 75, // 最大tabitem的宽度
    needScroll: true,
    customStyle: {},
};
