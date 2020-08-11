
import Taro from '@tarojs/taro';
import React from 'react';
import { View } from '@tarojs/components';

function WgEllipsisText(props) {
    const { className, children, injectStyle, line, pre, onClick, onLongPress } = props;
    const style2 = {
        WebkitLineClamp: line > 0 ? line : 'unset',
        whiteSpace: pre ? 'pre-wrap' : 'normal',
    };

    const style = Object.assign({}, injectStyle, style2);

    return (
        <View
            className={`wg-ellipsis-text ${className}`}
            style={style}
            onClick={onClick}
            onLongPress={onLongPress}
        >
            {children}
        </View>
    );
}

WgEllipsisText.defaultProps = {
    injectStyle: null,
    line: 1,
    pre: false, // 是否保留文本格式
    onClick: () => {},
    onLongPress: () => {},
};


export default WgEllipsisText;
