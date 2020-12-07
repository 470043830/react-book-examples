/* eslint-disable react/button-has-type */
/* eslint-disable prettier/prettier */

import React from 'react';


export default class Index extends React.Component {

    gotoPage1() {
        window.location.hash = '/album1';
    }

    render(){
        return <div className="fdsfdsfsd">
            Album---222
            <button className="dasdasdas" onClick={this.gotoPage1}>
                to 1
            </button>
        </div>
    }
}
