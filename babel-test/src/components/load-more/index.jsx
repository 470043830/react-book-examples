import Taro from '@tarojs/taro';
import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Text, View } from '@tarojs/components';

import WgComponent from '../../common/component';
import WgActivityIndicator from '../activity-indicator/index';
import WgButton from '../button/index';

export default class WgLoadMore extends WgComponent {

    onClick = () => {
        this.props.onClick && this.props.onClick();
    }

    render() {
        // console.log('WgLoadMore render...');
        const {
            className,
            customStyle,
            loadingText,
            moreText,
            status,
            moreBtnStyle,
            noMoreTextStyle,
            noMoreText,
            noDataText,
        } = this.props;

        let component = null;
        if (status === 'loading') {
            component = <WgActivityIndicator size={20} mode='center' content={loadingText}  />;
        } else if (status === 'more') {
            component = (
                <View className='wg-load-more__cnt'>
                    <WgButton full onClick={this.onClick.bind(this)} customStyle={moreBtnStyle}>
                        {moreText}
                    </WgButton>
                </View>
            );
        } else if (status === 'noData') {
            component = (
                <View className='wg-load-more__bar'>
                    <View className='wg-load-more__line' />
                    <Text className='wg-load-more__tip' style={noMoreTextStyle}>
                        {noDataText}
                    </Text>
                    <View className='wg-load-more__line' />
                </View>
            );
        } else {
            component = (
                <View className='wg-load-more__bar'>
                    <View className='wg-load-more__line' />
                    <Text className='wg-load-more__tip' style={noMoreTextStyle}>
                        {noMoreText}
                    </Text>
                    <View className='wg-load-more__line' />
                </View>
            );
        }

        return (
            <View className={classNames('wg-load-more', className)} style={customStyle}>
                {component}
            </View>
        );
    }
}

WgLoadMore.defaultProps = {
    customStyle: '',
    className: '',
    noMoreTextStyle: '',
    moreBtnStyle: '',
    status: 'more',
    loadingText: '正在加载...',
    moreText: '查看更多',
    noMoreText: '没有更多',
    noDataText: '暂无数据',
    onClick: () => { },
};

WgLoadMore.propTypes = {
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    noMoreTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    moreBtnStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    status: PropTypes.oneOf(['more', 'loading', 'noMore', 'noData']),
    loadingText: PropTypes.string,
    moreText: PropTypes.string,
    noMoreText: PropTypes.string,
    noDataText: PropTypes.string,
    onClick: PropTypes.func,
};
