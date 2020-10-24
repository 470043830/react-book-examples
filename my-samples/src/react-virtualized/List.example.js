import React from 'react';
import clsx from 'clsx';
import Immutable from 'immutable';
import PropTypes from 'prop-types';

import { List, AutoSizer, WindowScroller } from 'react-virtualized';
import { generateRandomList } from './utils';
import styles from './List.module.css'; //可以看出，create-react-app已经为配置好了css module，但是需要我们以.module.scss / .module.css命名。

const list = Immutable.List(generateRandomList());

export default class ListExample extends React.PureComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            listHeight: 588,
            listRowHeight: 50,
            overscanRowCount: 10,
            rowCount: list.size,
            scrollToIndex: undefined,
            showScrollingPlaceholder: false,
            useDynamicRowHeight: true,
        };

        this._getRowHeight = this._getRowHeight.bind(this);
        this._noRowsRenderer = this._noRowsRenderer.bind(this);
        this._onRowCountChange = this._onRowCountChange.bind(this);
        this._onScrollToRowChange = this._onScrollToRowChange.bind(this);
        this._rowRenderer = this._rowRenderer.bind(this);

        console.log('styles: ', styles);
    }

    render() {
        const {
            listHeight,
            listRowHeight,
            overscanRowCount,
            rowCount,
            scrollToIndex,
            showScrollingPlaceholder,
            useDynamicRowHeight,
        } = this.state;

        const width = 414;

        return (
            <div className={styles.Page}>
                {/* <AutoSizer disableHeight>
                    {({ width }) => (
                        <List
                            // ref="List"
                            className={styles.List}
                            height={listHeight}
                            overscanRowCount={overscanRowCount}
                            noRowsRenderer={this._noRowsRenderer}
                            rowCount={rowCount}
                            rowHeight={
                                useDynamicRowHeight ? this._getRowHeight : listRowHeight
                            }
                            rowRenderer={this._rowRenderer}
                            scrollToIndex={scrollToIndex}
                            width={width}
                        />
                    )}
                </AutoSizer> */}
                <div className={styles.tabIndexTest} tabIndex='1' onClick={(e) => { console.log('onClick: ', e);e.preventDefault();e.stopPropagation();}}>tabindex</div>
                <WindowScroller>
                    {({ height, isScrolling, onChildScroll, scrollTop }) => (
                        <List
                            className={styles.List}
                            autoHeight
                            height={height}
                            isScrolling={isScrolling}
                            onScroll={onChildScroll}
                            scrollTop={scrollTop}
                            overscanRowCount={overscanRowCount}
                            noRowsRenderer={this._noRowsRenderer}
                            rowCount={rowCount}
                            rowHeight={
                                useDynamicRowHeight ? this._getRowHeight : listRowHeight
                            }
                            rowRenderer={this._rowRenderer}
                            scrollToIndex={scrollToIndex}
                            width={width}
                        />
                    )}
                </WindowScroller>
                <div>111111111111</div>
                <div>111111111111</div>
                <div>111111111111</div>
                <div>111111111111</div>
                <div>111111111111</div>
                <div>111111111111</div>
            </div>
        );
    }

    _getDatum(index) {
        // const { list } = this.context;
        return list.get(index % list.size);
    }

    _getRowHeight({ index }) {
        return this._getDatum(index).size;
    }

    _noRowsRenderer() {
        return <div className={styles.noRows}>No rows</div>;
    }

    _onRowCountChange(event) {
        const rowCount = parseInt(event.target.value, 10) || 0;

        this.setState({ rowCount });
    }

    _onScrollToRowChange(event) {
        const { rowCount } = this.state;
        let scrollToIndex = Math.min(
            rowCount - 1,
            parseInt(event.target.value, 10),
        );

        if (isNaN(scrollToIndex)) {
            scrollToIndex = undefined;
        }

        this.setState({ scrollToIndex });
    }

    _rowRenderer({ index, isScrolling, key, style }) {
        const { showScrollingPlaceholder, useDynamicRowHeight } = this.state;

        // console.log('_rowRenderer: ', styles.row, styles.isScrollingPlaceholder);
        if (showScrollingPlaceholder && isScrolling) {
            return (
                <div
                    className={clsx(styles.row, styles.isScrollingPlaceholder)}
                    key={key}
                    style={style}>
                    Scrolling...
                </div>
            );
        }

        const datum = this._getDatum(index);

        let additionalContent;

        if (useDynamicRowHeight) {
            switch (datum.size) {
                case 75:
                    additionalContent = <div>It is medium-sized.</div>;
                    break;
                case 100:
                    additionalContent = (
                        <div>
                            It is large-sized.
                            <br />
                            It has a 3rd row.
                        </div>
                    );
                    break;
            }
        }

        return (
            <div className={styles.row} key={key} style={style}>
                <div
                    className={styles.letter}
                    style={{
                        backgroundColor: datum.color,
                    }}>
                    {datum.name.charAt(0)}
                </div>
                <div>
                    <div className={styles.name}>{datum.name}</div>
                    <div className={styles.index}>This is row {index}</div>
                    {additionalContent}
                </div>
                {useDynamicRowHeight && (
                    <span className={styles.height}>{datum.size}px</span>
                )}
            </div>
        );
    }
}
