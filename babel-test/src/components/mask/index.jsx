import Taro from '@tarojs/taro';
import React from 'react';
// import { View, MovableView, ScrollView } from '@tarojs/components';
import { View, ScrollView } from '@tarojs/components';

// const handleTouchStart = () => { };
// const handleTouchMove = () => {
//     // console.log('handleTouchMove')
// };
// const handleTouchEnd = () => { };
export default function WgMask(props) {
    const { className = '', children, style = {}, onClick, onLongPress } = props;

    return <View>null</View>;
    // return (
    //     <MovableView
    //         className={`wg-action-sheet__overlay ${className}`}
    //         style={style}
    //         onClick={onClick}
    //         onLongPress={onLongPress}
    //         onTouchStart={handleTouchStart}
    //         onTouchMove={handleTouchMove}
    //         onTouchEnd={handleTouchEnd}
    //     >
    //         {children}
    //     </MovableView>
    // );
}
