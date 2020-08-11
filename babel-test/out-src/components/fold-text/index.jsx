import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View, Text } from '@tarojs/components';
import WgComponent from '../../common/component'; // import { delayGetClientRect } from '../../common/utils';
// import i18n from '../../../common/i18n';

const isWEB = Taro.getEnv() == Taro.ENV_TYPE.WEB;
const MAX_TEXT_LINE = 100;
const INIT_STATE = {
  curLineClamp: 0,
  tipText: '',
  isTextTested: false
};
const FOLD_TIPS = ['全文', '收起'];
let WgFoldTextId = 0;
export default class WgFoldText extends WgComponent {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
    WgFoldTextId++;
    this.queryIds = ['fold-text-box-test-' + WgFoldTextId, 'fold-text-box-content' + WgFoldTextId];

    this.onUnFoldText = () => {
      const {
        lineClamp
      } = this.props;
      const {
        tipText
      } = this.state; // console.log('onUnFoldText...', tipText, this);

      if (!tipText) {
        return;
      }

      if (tipText == FOLD_TIPS[0]) {
        this.setState({
          curLineClamp: MAX_TEXT_LINE,
          tipText: FOLD_TIPS[1]
        });
      } else if (tipText == FOLD_TIPS[1]) {
        this.setState({
          curLineClamp: lineClamp,
          tipText: FOLD_TIPS[0]
        });
      }
    };
  }

  componentDidMount() {
    // console.log('componentDidMount...')
    this.checkFold();
  }

  componentDidUpdate(prevProps) {
    // console.log('componentDidUpdate...');
    if (prevProps.content !== this.props.content) {
      this.checkFold();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log('---WgFoldText--- UNSAFE_componentWillReceiveProps: ', nextProps, this.props);
    if (nextProps.content != this.props.content) {
      this.state.isTextTested = false;
    }
  }

  componentWillUnmount() {
    this.stopSelectorTimer();
  }

  stopSelectorTimer() {
    if (this._qSelectorTimer) {
      clearTimeout(this._qSelectorTimer);
      this._qSelectorTimer = null;
    }
  }

  getBoundingRects() {
    if (!this._qSelector) {
      this._qSelector = Taro.createSelectorQuery();

      this._qSelector.select('#' + this.queryIds[0]).boundingClientRect();

      this._qSelector.select('#' + this.queryIds[1]).boundingClientRect();
    }

    return new Promise(resolve => {
      this.stopSelectorTimer();
      this._qSelectorTimer = setTimeout(() => {
        this._qSelector.exec(res => {
          this.stopSelectorTimer();
          resolve(res);
        });

        this._qSelectorTimer = setTimeout(() => {
          resolve([]);
        }, 1000);
      }, 50);
    });
  }

  async checkFold() {
    let res = await this.getBoundingRects(); // console.log('---WgFoldText---checkFold:', res, this);

    if (res[0] && res[1] && res[0].height != res[1].height) {
      this.setState({
        curLineClamp: 0,
        tipText: FOLD_TIPS[0],
        isTextTested: true
      });
    } else {
      this.setState({
        curLineClamp: 0,
        tipText: '',
        isTextTested: true
      });
    }
  }

  handleText() {
    const {
      content,
      highWord,
      textStyle
    } = this.props;
    const alltext = [];

    if (!highWord) {
      alltext.push({
        text: content,
        style: textStyle || 'color:#2E2E2F;'
      });
    } else {
      const split_str = '' + highWord;
      const splits = content.split(split_str);
      let key = 0; // console.log('---WgFoldText---handleText: ', splits.length, split_str, splits);

      for (let index = 0; index < splits.length; index++) {
        alltext.push({
          key: 'id_' + key++,
          text: splits[index],
          style: textStyle || 'color:#2E2E2F;'
        });

        if (index < splits.length - 1) {
          alltext.push({
            key: 'id_' + key++,
            text: split_str,
            style: 'color:#49C167;'
          });
        }
      }
    }

    return alltext;
  }

  render() {
    const {
      content,
      lineClamp,
      isNeedUnfold,
      onTextClick
    } = this.props;
    const {
      curLineClamp,
      tipText,
      isTextTested
    } = this.state;
    let multiTextClampStyle = `-webkit-line-clamp: ${lineClamp};`;
    let allTextItems = this.handleText();

    if (curLineClamp > 0) {
      multiTextClampStyle = `-webkit-line-clamp: ${curLineClamp};`;
    } // console.log('---WgFoldText--- render', allTextItems, this.state, allTextItems.length, multiTextClampStyle);


    return /*#__PURE__*/React.createElement(View, {
      className: "wg-fold-box",
      id: `wg-fold-box-id-${WgFoldTextId}`
    }, /*#__PURE__*/React.createElement(View, {
      id: this.queryIds[1],
      className: "wg-fold-box__content",
      style: multiTextClampStyle,
      onClick: onTextClick
    }, allTextItems.map(item => /*#__PURE__*/React.createElement(Text, {
      key: item.key,
      style: item.style
    }, item.text))), isNeedUnfold && !isTextTested && /*#__PURE__*/React.createElement(View, {
      id: this.queryIds[0],
      className: "wg-fold-box__test"
    }, content), /*#__PURE__*/React.createElement(View, {
      className: "wg-fold-box__tip",
      onClick: this.onUnFoldText
    }, tipText));
  }

}
WgFoldText.defaultProps = {
  content: '',
  lineClamp: MAX_TEXT_LINE,
  highWord: '',
  textStyle: '',
  onTextClick: () => {}
};
WgFoldText.propTypes = {
  content: PropTypes.string,
  lineClamp: PropTypes.number,
  highWord: PropTypes.string,
  textStyle: PropTypes.string,
  onTextClick: PropTypes.func
};