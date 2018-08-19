import React, { Component } from 'react';

import Calculate from "./Calculate"
import UsersList from "./UsersList"


export default class Receipt extends Component{
  render() {
    return (
      <div className="row">
        <div className="receiptPrint col-sm-12 col-md-6">
          {this.props.response.map((words) => {
            let line = words.Words;
            return line.map((text, i) => {
              let pStyle = {
                position: 'absolute',
                top: text.Top,
                left: text.Left,
                height: text.Height,
                width: text.Width,
                color: '',
                background: "white",
                opacity: 1
              };
              if (Number(text.WordText) && text.Left > 20){
                pStyle.color = "blue";
                pStyle.background = "orange";
                pStyle.opacity = 0.5
              } else {
                pStyle.color = "black";
              }
              return <p className="receiptText" style={pStyle} key={i} onClick={this.props.handleClick} data-value={text.WordText}>{text.WordText}</p>
            })
          })}
        </div>
        <div className="col-md-6 col-sm-12">
          <UsersList prices={this.props.prices}/>
          {
            this.props.prices.length > 0 && <Calculate prices={this.props.prices}/>
          }
        </div>
      </div>
  )}
}
