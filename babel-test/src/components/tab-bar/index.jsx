/* eslint-disable import/first */
import Taro from '@tarojs/taro';
import React from 'react';
import { View, Image } from '@tarojs/components';
import WgBadge from '../badge';


export default class WgTabBar extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    /**点击tabBar的某一项 */
    onTab(val, index, e) {
        e.stopPropagation();
        this.props.onQueryTabs(val, index);
    }

    queryStyle(num) {
        let px;
        if (num < 10) {
            px = 10;
        } else if (num >= 10 && num < 100) {
            px = 0;
        } else if (num >= 100) {
            px = -20;
        }
        return `transform:translate(0, 0);top:${Taro.pxTransform(5)};right:${Taro.pxTransform(px)}`;
    };
    showNum(item) {
        if (item.newNum && Number(item.newNum) > 0) {
            return <WgBadge value={item.newNum} maxValue={99} corner customStyle={this.queryStyle(Number(item.newNum))}></WgBadge>;
        }
    };

    render() {
        let style = `transform:translate(0, 0);top:${Taro.pxTransform(5)};right:${Taro.pxTransform(15)}`;
        let { tabCur, list} = this.props;
        tabCur = Number(tabCur);
        return (
            <View className='wg-tab-bar wg-space-around '>
                {
                    list.map((item, index) => {
                        return <View className='wg-direction-column wg-tabs-option wg-pr-30 wg-pl-30' taroKey={item.url} key={item.url} onClick={this.onTab.bind(this, item, index)}>
                            <Image src={tabCur === index ? item.active_url : item.url} className='wg-tabs-icon'></Image>
                            <View className='wg-tabs-name text-center' style={tabCur === index ? item.textStyle : null}>{item.name}</View>
                            {this.showNum(item)}
                            {item.newState && <WgBadge dot corner customStyle={style}></WgBadge>}
                        </View>;
                    })
                }
            </View>
        );
    }
}


WgTabBar.defaultProps = {
    /**
     * tabBar数据
     * default 默认选中数组的第一项
    */
    list: [],
    /**获取当前点击的是哪个tab */
    onQueryTabs: () => { },

    /**默认高亮传对应的index */
    tabCur:0,
};
