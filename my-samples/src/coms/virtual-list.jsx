import React from 'react';
import ReactDOM from 'react-dom';
import { List, AutoSizer } from 'react-virtualized';

// List data as an array of strings
const list = [
    'Brian Vaughnaa',
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughnaazz',
    // And so on...
];

for (let index = 0; index < 1000; index++) {
    list.push('ddsadasdasdasdas_' + index);

}

function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
}) {
    return (
        <div key={key} style={style}>

            <div className="test-item-box">
                {list[index]}
                {index == 0 &&
                    <div className="test-item-111"></div>
                }
            </div>

        </div>
    );
}

function getItemHeight({ index }) {
    console.log('getItemHeight: ', index);
    if (index == 0) {
        return 70;
    }
    if (index == 1) {
        return 60;
    }
    return 50;
}

function VList() {
    const listHeight = 300;
    const rowCount = list.length;
    return (
        // <List
        //     className="test-list-box"
        //     width={document.body.clientWidth}
        //     height={300}
        //     rowCount={list.length}
        //     rowHeight={getItemHeight}
        //     rowRenderer={rowRenderer}
        // />

        <div className='test-list-wrapper'>
            <AutoSizer disableHeight>
                {({ width }) => (
                    <List
                        ref="List"
                        className="test-list-box"
                        height={listHeight}
                        // overscanRowCount={overscanRowCount}
                        // noRowsRenderer={this._noRowsRenderer}
                        rowCount={rowCount}
                        rowHeight={getItemHeight}
                        rowRenderer={rowRenderer}
                        // scrollToIndex={scrollToIndex}
                        width={width}
                    />
                )}
            </AutoSizer>
        </div>
    );
}

export default VList;

// Render your list
// ReactDOM.render(
//     <List
//         width={300}
//         height={300}
//         rowCount={list.length}
//         rowHeight={20}
//         rowRenderer={rowRenderer}
//     />,
//     document.getElementById('example'),
// );
