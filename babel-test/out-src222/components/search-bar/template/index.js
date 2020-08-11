/* eslint-disable taro/duplicate-name-of-state-and-props */

/* eslint-disable react/jsx-key */

/* eslint-disable react/jsx-indent-props */

/* eslint-disable react/sort-comp */

/* eslint-disable react/no-unused-state */
import Taro from '@tarojs/taro';
import React from 'react';
import { View } from '@tarojs/components';
import WgDisplayCell from '../../display-cell';
/** 引入图片  strat*/

/** 引入图片  end*/

export default class ComponentTemplate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({
      list: this.props.templateList || []
    });
  }

  onBtnActive(index, e) {
    e.stopPropagation();
    let list = this.state.list;
    list.map((item, _index) => {
      if (index === _index) {
        item.checkIconState = true;
        this.props.onQueryData(item);
        this.props.onQueryImgUrl(item.url);
      } else {
        item.checkIconState = false;
      }
    });
    this.setState({
      list
    });
  }

  UNSAFE_componentWillReceiveProps(e) {
    if (e.templateList) {
      this.setState({
        list: e.templateList || []
      });
    }
  }

  render() {
    return /*#__PURE__*/React.createElement(View, {
      className: "wg-search-template"
    }, this.state.list.map((item, index) => {
      return /*#__PURE__*/React.createElement(WgDisplayCell, {
        key: item.id,
        taroKey: item.id,
        type: "isCheckIcon",
        onBtnActive: this.onBtnActive.bind(this, index),
        checkIconState: item.checkIconState,
        title: item.name,
        itemImg: item.url,
        hideLastLine: index === this.state.list.length - 1
      });
    }));
  }

}
;
ComponentTemplate.defaultProps = {
  onQueryData: () => {},
  templateList: [],
  onQueryImgUrl: () => {}
};