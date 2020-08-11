import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Block } from '@tarojs/components';
import WgComponent from '../../common/component';


export default class WgPriceText extends WgComponent {

    render() {
        const { price, price2, style1, style2, show00, toWan } = this.props;
        let number1 = new Number(price);
        let number2 = new Number(price2);
        let isWan1 = false, isWan2 = false;

        if (toWan && number1 > 10000) {
            number1 = number1 / 10000;
            isWan1 = true;
        }
        if (toWan && number2 > 10000) {
            number2 = number2 / 10000;
            isWan2 = true;
        }

        let texts1 = number1.toFixed(2).toString().split('.');
        let texts2 = '';

        if (number2 > 0) {
            texts2 = number2.toFixed(2).toString().split('.');
        }
        // console.log('price:', texts1, texts2);
        return (
            <View className='wg-price-text' >
                <Text className='wg-price-text__float' style={style2}>{'¥ '}</Text>
                <Text className='wg-price-text__int' style={style1}>{texts1[0]}</Text>
                {(texts1[1] != '00' || show00) && <Text className='wg-price-text__float' style={style2}>.{texts1[1]}</Text>}
                {isWan1 && <Text className='wg-price-text__float' style={style2}>万</Text>}

                {
                    texts2.length > 0 &&
                    <Block>
                        <Text className='wg-price-text__float' style={style2}>~</Text>
                        <Text className='wg-price-text__int' style={style1}>{texts2[0]}</Text>
                        {(texts2[1] != '00' || show00) && <Text className='wg-price-text__float' style={style2}>.{texts2[1]}</Text>}
                        {isWan2 && <Text className='wg-price-text__float' style={style2}>万</Text>}
                    </Block>
                }
            </View>
        );
    }
}
WgPriceText.defaultProps = {
    price: 0,
    price2: 0,
    style1: '',
    style2: '',
};
WgPriceText.propTypes = {
    price: PropTypes.number,
    price2: PropTypes.number,
    style1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    style2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
