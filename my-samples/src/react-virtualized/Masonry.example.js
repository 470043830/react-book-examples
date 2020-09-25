/** @flow */
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import * as React from 'react';
import { createMasonryCellPositioner as createCellPositioner, Masonry, AutoSizer, WindowScroller, CellMeasurer, CellMeasurerCache } from 'react-virtualized';

import { generateRandomList } from './utils';
import styles from './Masonry.module.css';


const list = Immutable.List(generateRandomList());

export default class MasonryExample extends React.PureComponent {

    constructor(props, context) {
        super(props, context);

        this._columnCount = 0;

        const width = window.innerWidth;
        const gutterSize = 6;
        const defaultWidth = (width - gutterSize*2) / 2;

        console.log('defaultWidth: ', defaultWidth, width);

        this._cache = new CellMeasurerCache({
            defaultHeight: 250,
            defaultWidth: defaultWidth,
            fixedWidth: true,
        });

        this.state = {
            columnWidth: defaultWidth,
            height: 600,
            gutterSize: gutterSize,
            overscanByPixels: 0,
            windowScrollerEnabled: true,
        };

        this._cellRenderer = this._cellRenderer.bind(this);
        this._onResize = this._onResize.bind(this);
        this._renderAutoSizer = this._renderAutoSizer.bind(this);
        this._renderMasonry = this._renderMasonry.bind(this);
        this._setMasonryRef = this._setMasonryRef.bind(this);
    }

    render() {
        const {
            columnWidth,
            height,
            gutterSize,
            overscanByPixels,
            windowScrollerEnabled,
        } = this.state;

        let child;

        if (windowScrollerEnabled) {
            child = (
                <WindowScroller overscanByPixels={overscanByPixels}>
                    {this._renderAutoSizer}
                </WindowScroller>
            );
        } else {
            child = this._renderAutoSizer({ height });
        }

        return (
            <div className={styles.Page}>
                {child}
            </div>
        );
    }

    _calculateColumnCount() {
        const { columnWidth, gutterSize } = this.state;

        this._columnCount = Math.floor(this._width / (columnWidth + gutterSize));
    }

    _cellRenderer({ index, key, parent, style }) {
        // const { list } = this.context;
        const { columnWidth } = this.state;

        const datum = list.get(index % list.size);

        return (
            <CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
                <div
                    className={styles.Cell}
                    style={{
                        ...style,
                        width: columnWidth,
                    }}>
                    <div
                        style={{
                            backgroundColor: datum.color,
                            borderRadius: '0.5rem',
                            height: datum.size * 3,
                            marginBottom: '0.5rem',
                            width: '100%',
                            fontSize: 20,
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        {index}
                    </div>
                    {datum.random}
                </div>
            </CellMeasurer>
        );
    }

    _initCellPositioner() {
        if (typeof this._cellPositioner === 'undefined') {
            const { columnWidth, gutterSize } = this.state;

            this._cellPositioner = createCellPositioner({
                cellMeasurerCache: this._cache,
                columnCount: this._columnCount,
                columnWidth,
                spacer: gutterSize,
            });
        }
    }

    _onResize({ width }) {
        this._width = width;

        this._calculateColumnCount();
        this._resetCellPositioner();
        this._masonry.recomputeCellPositions();
    }

    _renderAutoSizer({ height, scrollTop }) {
        this._height = height;
        this._scrollTop = scrollTop;

        const { overscanByPixels } = this.state;

        return (

            <AutoSizer
                disableHeight
                height={height}
                onResize={this._onResize}
                overscanByPixels={overscanByPixels}
                scrollTop={this._scrollTop}>
                {this._renderMasonry}
            </AutoSizer>

        );
    }

    _renderMasonry({ width }) {
        this._width = width;

        this._calculateColumnCount();
        this._initCellPositioner();

        const { height, overscanByPixels, windowScrollerEnabled } = this.state;

        return (
            <Masonry
                autoHeight={windowScrollerEnabled}
                cellCount={1000}
                cellMeasurerCache={this._cache}
                cellPositioner={this._cellPositioner}
                cellRenderer={this._cellRenderer}
                height={windowScrollerEnabled ? this._height : height}
                overscanByPixels={overscanByPixels}
                ref={this._setMasonryRef}
                scrollTop={this._scrollTop}
                width={width}
            />
        );
    }

    // This is a bit of a hack to simulate newly loaded cells
    _resetList = () => {
        const ROW_HEIGHTS = [25, 50, 75, 100];

        // const { list } = this.context;
        list.forEach(datum => {
            datum.size = ROW_HEIGHTS[Math.floor(Math.random() * ROW_HEIGHTS.length)];
        });

        this._cache.clearAll();
        this._resetCellPositioner();
        this._masonry.clearCellPositions();
    };

    _resetCellPositioner() {
        const { columnWidth, gutterSize } = this.state;

        this._cellPositioner.reset({
            columnCount: this._columnCount,
            columnWidth,
            spacer: gutterSize,
        });
    }

    _setMasonryRef(ref) {
        this._masonry = ref;
    }
}
