/* eslint-disable no-undef */
/* eslint-disable import/first */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-state */
import Taro from '@tarojs/taro';
import React from 'react';
import { View, Image, Input } from '@tarojs/components';
import classNames from 'classnames';
import { delayGetClientRect } from '../../common/utils.js';
import ComponentTemplate from './template/index';
import UpFile from './upload/index.js';
import PropTypes from 'prop-types';

/** 引入图片  strat*/
import upImgUrl from '../../ui-images/upImg.png';
import searchImgUrl from '../../ui-images/search.png';
import filterImg from '../../ui-images/filer.png';
import close from '../../ui-images/close.png';


/** 引入图片  end*/

export default class WgSearchBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            /**储存定时器 */
            timer: null,
            value: '',

            /**上传的图片 */
            upSeacrchImgUrl: null,

            /**模板参数 */
            height: 0,
            heightTop: 0,
            top: 0,
            isTempState: false,
            tempIconUrl: null,
            isShowSearchBtn: false,
        };
        this._inputValue = '';
    }


    UNSAFE_componentWillMount() {
        this.upFile = new UpFile();
        this.props.templateObj.constructor === Object && this.props.templateObj.templateList.map((item) => {
            if (item.checkIconState) {
                this.setState({
                    tempIconUrl: item.url,
                });
            }
        });
    }

    /** 搜索*/
    search = (e = { detail: { value: '' } }) => {
        // console.log('search, ', e.type);
        // return;
        if (e.type === 'input') {
            // this.setState({
            //     value: e.detail.value,
            // });
            this._inputValue = e.detail.value;
            // console.log('this._inputValue, ', this._inputValue);

            if (!e.detail.value) {
                this.props.onClearData();
                if (this.state.isShowSearchBtn) {
                    this.setState({
                        isShowSearchBtn: false
                    });
                }
            } else {
                if (!this.state.isShowSearchBtn) {
                    this.setState({
                        isShowSearchBtn: true
                    });
                }
            }
        } else {
            // this.props.onSearchData({ value: this.state.value.trim(), imgUrl: (this.state.upSeacrchImgUrl || '') });
            this.props.onSearchData({ value: this._inputValue.trim(), imgUrl: (this.state.upSeacrchImgUrl || '') });
        }
        this.props.onInputText(e.detail.value);
    };

    /**获取模板的位置 */
    queryDom() {
        let height, top;
        delayGetClientRect(
            {
                self: this,
                delayTime: 0,
                selectorStr: `.wg-search-input-box`,
            }
        ).then((rect) => {
            let heightTop = rect[0].top + rect[0].height;
            top = rect[0].height;
            height = Taro.getSystemInfoSync().windowHeight - heightTop;
            this.setState({
                isTempState: !this.state.isTempState,
                heightTop,
                height,
                top,
            });
        });
    }

    /**点击遮罩隐藏模板 */
    hideMask(e) {
        e && e.stopPropagation();
        this.setState({
            isTempState: false,
        });
    }

    UNSAFE_componentWillReceiveProps(e) {
        if (e.templateObj.constructor === Object) {
            e.templateObj.templateList.map((item) => {
                if (item.checkIconState) {
                    this.setState({
                        tempIconUrl: item.url,
                    });
                }
            });
        }
    }

    /**用户上传图片以后获取图片的url */
    upImg() {

        /**防止重复点击 start*/
        if (this.isFlag) {
            return;
        }
        this.isFlag = true;
        setTimeout(() => {
            this.isFlag = false;
        }, 2000);
        /**防止重复点击 end*/

        let obj = this.props.searchImgObj || {};
        let params = {
            /**获取图片key 的接口地址 */
            getImgUrlAPI: obj.getImgUrlAPI,
            /** 接口返回图片的key以后，需要拼接在key前面的地址 */
            spliceImgUrlAPI: obj.spliceImgUrlAPI,
        };

        if (this.props.searchImgObj.preUpImg()) {
            this.upFile.onUpImg(params).then((url) => {
                Taro.hideLoading();
                this.setState({
                    upSeacrchImgUrl: url,
                }, () => {
                    this.search();
                });
            });
        }
    }

    /**模板切换之后，search-bar上的icon也要随之变化 */
    onQueryImgUrl(url) {
        this.setState({
            isTempState: false,
            tempIconUrl: url,
        });
    }

    /**清除数据 */
    clearData = () => {
        // console.log('clearData...')
        this._inputValue = '';
        this.setState({
            value: '',
            upSeacrchImgUrl: null,
            isShowSearchBtn: false,
        }, () => {
            this.props.onClearData();
        });
    };

    touchMove(e) {
        e.preventDefault();
        e.stopPropagation();
        return;
    }

    render() {
        let { tempIconUrl, isTempState, height, top, upSeacrchImgUrl, heightTop } = this.state;
        let value = this._inputValue;
        let {
            searchImgObj,
            templateObj,
            filterObj,
        } = this.props;

        /**图片搜索 参数 */
        let { isSearchImg } = searchImgObj;

        /**模板 参数 */
        let { isTemplate, templateList, onQueryTemplateData } = templateObj;

        /**筛选条件 参数 */
        let { isFilterData, onFilterData } = filterObj;

        /**模板遮罩 */
        let mask = isTempState ? {
            height: `${height}px`,
            top: `${top}px`,
        } : {};

        let maskTop = isTempState ? {
            height: `${heightTop}px`,
        } : {};

        /**用户进行图片搜索的图片  和 input 的图片搜索icon  和  删除icon */
        let iconDom =
            <View className='wg-align-items'>
                {upSeacrchImgUrl && <Image className='wg-up-img' src={upSeacrchImgUrl}></Image>}

                {
                    isSearchImg && !upSeacrchImgUrl &&
                    <Image className='wg-up-img ' src={upImgUrl} onClick={this.upImg.bind(this)}></Image>
                }

                {(value || upSeacrchImgUrl) &&
                    <Image className='wg-close-icon wg-ml-20' onClick={this.clearData} src={close}></Image>
                }
            </View>;


        /**文本值存在或者用户进行图片搜索， 隐藏右侧icon 显示搜索btn */
        let rightDom = value ?
            <View className='wg-search-btn wg-ft-28 wg-ml-24' onClick={this.search}>
                搜索
            </View>
            :
            <View className='wg-search-right wg-justify-content-flex-start'>
                {
                    isTemplate &&
                    <Image
                        src={tempIconUrl}
                        className='wg-ml-32 wg-mr-24 wg-right-icon'
                        onClick={this.queryDom.bind(this)}
                    >
                    </Image>
                }

                {
                    isTemplate && isFilterData &&
                    <View className='wg-line' ></View>
                }

                {
                    isFilterData &&
                    <Image src={filterImg} className='wg-ml-24 wg-right-icon' onClick={onFilterData}></Image>
                }

            </View>;


        return (
            <View className='wg-search-input-box wg-p32'>

                {/* 左边input start */}
                <View className='wg-search-left wg-space-between '>
                    <View className='wg-search-input wg-justify-content-flex-start'>
                        <Image className='wg-search-img' src={searchImgUrl} onClick={this.search}></Image>
                        <Input className='wg-ft-28 wg-ml-8 wg-input wg-mr-20' placeholder='搜索' value={this._inputValue} onInput={this.search} onConfirm={this.search}></Input>
                    </View>

                    {iconDom}

                </View>
                {/* 左边input end*/}

                {/*  右边筛选 start */}

                {rightDom}

                {/*  右边筛选 end */}

                {

                    <View style={mask} className='wg-mask-box' onClick={this.hideMask.bind(this)} onTouchMove={this.touchMove.bind(this)}>
                        <View className={classNames('wg-template', isTempState ? 'wg-template-height' : '')}>
                            <ComponentTemplate onQueryData={onQueryTemplateData} onQueryImgUrl={this.onQueryImgUrl.bind(this)} templateList={templateList}></ComponentTemplate>
                        </View>
                    </View>
                }

                {
                    isTempState && <View className='wg-top-mask' style={maskTop} onClick={this.hideMask.bind(this)} onTouchMove={this.touchMove.bind(this)}></View>
                }

            </View>
        );
    }
}


WgSearchBar.defaultProps = {

    /**图片搜索参数*/
    searchImgObj: {
        /**
         * 是否展示通过图片查询的icon
         **/
        isSearchImg: false,

        /**
         * 图片预处理
         */
        preUpImg: () => true,


        /**
         * 获取图片key 的接口地址
         */
        getImgUrlAPI: null,

        /**
         * 接口返回图片的key以后，需要拼接在key前面的地址
         */
        spliceImgUrlAPI: null,
    },

    /**模板参数 */
    templateObj: {

        /**
         * 是否显示模板的icon
         **/
        isTemplate: false,

        /**
         * 获取点击的是哪一个模板
         *  type: function
         */
        onQueryTemplateData: () => { },

        /**
         * 模板list默认数据
         * type: Array
         * */
        templateList: [],

    },

    /**筛选的参数 */
    filterObj: {
        /**
         * 是否展示筛选条件的icon
         **/
        isFilterData: false,

        /**
         * 筛选栏的点击事件
         * type: function
         */
        onFilterData: () => { },
    },


    /**
     * 通过用户输入的值进行搜索
     * type: function
     * Required
     */
    onSearchData: () => { },

    /**
     * 清除用户输入的值或者图片
     * type: function
     * Required
     */
    onClearData: () => { },
    onInputText: () => { },
};

WgSearchBar.propTypes = {
    onClearData: PropTypes.func.isRequired,
    onSearchData: PropTypes.func.isRequired,
    onInputText: PropTypes.func.isRequired,
};
