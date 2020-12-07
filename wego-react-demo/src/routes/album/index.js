/* eslint-disable react/button-has-type */
import React from "react";

export default class Album extends React.Component {
    gotoPage2() {
        window.location.hash = "/album2";
    }

    render() {
        return (
            <div className="fdsfdsfsd">
                Album---111
                <button className="dasdasdas" onClick={this.gotoPage2}>
                    to 2
                </button>
            </div>
        );
    }
}
