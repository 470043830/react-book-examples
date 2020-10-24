import Immutable from 'immutable';
import PropTypes from 'prop-types';
import * as React from 'react';

import { List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { generateRandomList } from './utils';
import styles from './CellMeasurer.module.css';
import './cmmon.css';

export default class DynamicHeightList extends React.PureComponent {
    static propTypes = {
        getClassName: PropTypes.func.isRequired,
        list: PropTypes.instanceOf(Immutable.List).isRequired,
        width: PropTypes.number.isRequired,
    };

    constructor(props, context) {
        super(props, context);

        this._cache = new CellMeasurerCache({
            fixedWidth: true,
            minHeight: 50,
        });

        this._rowRenderer = this._rowRenderer.bind(this);

        console.log('styles: ', styles);
    }

    render() {
        const { width } = this.props;
        const height = window.innerHeight - 44;
        const source = `https://www.fillmurray.com/300/200`;

        return (
            <div style={{ paddingTop: 0 }}>
                {/* <img
                    onLoad={(e) => { console.log('onLoad: ', e)}}
                    src={source}
                    style={{
                        width: 300,
                    }}
                /> */}
                <List
                    ref={(node) => { this._listRef = node; }}
                    className={styles.BodyGrid}
                    deferredMeasurementCache={this._cache}
                    height={height}
                    overscanRowCount={0}
                    rowCount={1000}
                    rowHeight={this._cache.rowHeight}
                    rowRenderer={this._cellRenderer}
                    width={width}
                />
            </div>
        );
    }

    onTextClick = (e) => {
        const { list } = this.props;
        let index = e.currentTarget.dataset.idx;

        const datum = list.get(index % list.size);
        console.log('onTextClick ', index, datum);
        if (datum['line-clamp'] == 2) {
            datum['line-clamp'] = 12;
        } else {
            datum['line-clamp'] = 2;
        }

        this._cache.clear(index);
        if (this._listRef) {
            this._listRef.forceUpdateGrid();
        }
    };

    _cellRenderer = ({ index, key, parent, style }) => {
        // const { list } = this.context;
        const { list } = this.props;

        const datum = list.get(index % list.size);

        // console.log('_cellRenderer: ', datum);
        if (!datum['line-clamp']) {
            datum['line-clamp'] = 2;
        }

        const imageWidth = 300;
        const source = `https://www.fillmurray.com/${imageWidth}/${datum.size*2}`;

        return (
            <CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
                <div className={styles.Cell222} style={style}>
                    <div className={styles.Cell333}>
                        <div style={{
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
                            <img
                                src={source}
                                style={{
                                    width: imageWidth,
                                }}
                            />
                        </div>

                        <div className={styles.textContent} data-idx={index}
                            style={{ WebkitLineClamp: '' + datum['line-clamp'] }}
                            onClick={this.onTextClick}>
                            {TEST_TEXT}
                        </div>
                        {datum.random}
                    </div>
                </div>
            </CellMeasurer>
        );
    };

    _rowRenderer({ index, key, parent, style }) {
        const { getClassName, list } = this.props;

        const datum = list.get(index % list.size);
        const classNames = getClassName({ columnIndex: 0, rowIndex: index });

        const imageWidth = 300;
        const imageHeight = datum.size * (1 + (index % 3));

        const source = `https://www.fillmurray.com/${imageWidth}/${imageHeight}`;

        return (
            <CellMeasurer
                cache={this._cache}
                columnIndex={0}
                key={key}
                rowIndex={index}
                parent={parent}>
                {({ measure, registerChild }) => (
                    <div ref={registerChild} className={classNames} style={style}>
                        <img
                            onLoad={measure}
                            src={source}
                            style={{
                                width: imageWidth,
                            }}
                        />
                    </div>
                )}
            </CellMeasurer>
        );
    }
}


DynamicHeightList.defaultProps = {
    getClassName: () => { return 'test-row-bg'; },
    list: Immutable.List(generateRandomList()),
    width: 414
};


const TEST_TEXT = '我于是日日盼望新年，新年到，闰土也就到了。好容易到了年末，有一日，母亲告诉我，闰土来了，我便飞跑地去看。他正在厨房里，紫色的圆脸，头戴一顶小毡帽，颈上套一个明晃晃的银项圈，这可见他的父亲十分爱他，怕他死去，所以在神佛面前许下愿心，用圈子将他套住了。他见人很怕羞，只是不怕我，没有旁人的时候，便和我说话，于是不到半日，我们便熟识了。';
