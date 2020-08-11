import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { View, Text, Image } from '@tarojs/components';
import WgComponent from '../../common/component';
import copyright from '../../ui-images/copyright.svg';

export default class WgPageFooter extends WgComponent {
    render() {
        const { footerList, customStyle, className } = this.props;
        return (
            <View className={`wg-page-footer ${className}`} style={customStyle} >
                <Image className='wg-page-footer-img' src={copyright}></Image>
                {footerList.map((item) => {
                    const colorClass = classNames(item.onFooterClick ? 'wg-page-footer-text-color' : '');
                    return <Text className={classNames('wg-page-footer-text', colorClass)} key={item.id} onClick={item.onFooterClick}>{item.text}</Text>;
                })}

            </View>
        );
    }
}
WgPageFooter.defaultProps = {
    footerList: [],
    customStyle: {},
};
WgPageFooter.propTypes = {
    footerList: PropTypes.array,
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
