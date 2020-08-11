
import React, { PureComponent } from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { View, Image, ScrollView, Button } from '@tarojs/components';
import WgComponent from '../../common/component';
import WgActionSheet from '../action-sheet';
import WgActionSheetHeader from '../action-sheet/header/index';


export default class WgBottomPopShare extends WgComponent {
    // constructor() {
    //     super(...arguments);
    //     this.state = {};
    // }

    render() {
        const {
            isOpened,
            list1,
            list2,
            onClose,
            title,
        } = this.props;
        const cancelText = '取消';
        const lists = [{ id: 0, data: list1 } ];
        // console.log(this.props);
        if (list2.length > 0){
            lists.push({ id: 1, data: list2 });
        }

        return (
            <WgActionSheet isOpened={isOpened} cancelText={cancelText} onClose={onClose}>
                <View className='wg-bp-share'>
                    {title && <WgActionSheetHeader >{title}</WgActionSheetHeader>}
                    {
                        lists.map(((list) => {
                            const padding = list.id == 0 && !title ? 'wg-padding-32' : '';
                            const border = list.id == 0 && title ? 'wg-border-top' : '';
                            return (
                                <View key={list.id} className={classNames('wg-bp-share-box', border)}>
                                    <ScrollView key='id' className={classNames('wg-bp-share-scroll-view', padding)} scrollX scrollWithAnimation>
                                        <View className='wg-bp-share-content-view'>
                                            {list.data.map(
                                                (item, index) =>
                                                    (<View key={item.id} className='wg-bp-share-image-item' onClick={(e) => item.onClick(index, e)}>
                                                        <Button className='wg-bp-share-image-item__btn' openType={item.openType}>
                                                            <Image className='wg-bp-share-image-item__image' src={item.icon}></Image>
                                                        </Button>

                                                        <View className='wg-bp-share-image-item__text'>{item.text}</View>
                                                    </View>)
                                            )}
                                        </View>
                                    </ScrollView>
                                    <View className='wg-bp-share-line'></View>
                                </View>
                            );
                        }))
                    }
                </View>
            </WgActionSheet>
        );
    }
}

WgBottomPopShare.defaultProps = {
    isOpened: false,
    list1: [],
    list2: [],
    title:'',
    onClose: () => { },
};

WgBottomPopShare.propTypes = {
    isOpened: PropTypes.bool.isRequired,
    list1: PropTypes.array,
    list2: PropTypes.array,
    onClose: PropTypes.func,
    title:PropTypes.string,
};
