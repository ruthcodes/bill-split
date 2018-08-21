import React, { Component } from 'react';

import Calculate from "./Calculate"
import UsersList from "./UsersList"


export default class Receipt extends Component{

  state = {
    largestTop: 0,
    largestLeft: 0,
  }

  receiptStyle = () => {
    return {
      height: this.state.largestTop + 10,
      width: this.state.largestLeft,
    }
  }

  //find the largest positioning attributes returned from the API
  dynamicStyle = (res, attr) => {
    // map over each line in the response (each line contains multiple word arrays)
    let tops = res.map((word) => {
      let line = word.Words;
      //assign first Top/Left/Height/Width as biggest, then check each against it finally returning the largest result
      //got idea for efficient reduce from https://codeburst.io/javascript-finding-minimum-and-maximum-values-in-an-array-of-objects-329c5c7e22a2
      return line.reduce((max, p) => p[attr] > max ? p[attr] : max, line[0][attr])
    })
    // find the largest from that compiled array (which is largest of all the sub arrays)
    return Math.max(...tops)
  }

  componentDidUpdate(prevProps, prevState){
    //find biggest of each attribute in API response
    let top = this.dynamicStyle(this.props.response, "Top");
    let left = this.dynamicStyle(this.props.response, "Left");
    let height = this.dynamicStyle(this.props.response, "Height");
    let width = this.dynamicStyle(this.props.response, "Width");

    if ((top + height) !== prevState.largestTop){
      this.setState({
        largestTop: top + height,
        largestLeft: left + width,
      })
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-6 order-last order-md-0">
          <div style={this.receiptStyle()} className="receiptPrint">
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
        </div>
        <div className="col-md-6 col-sm-12">
          <UsersList prices={this.props.prices}/>
          {
            this.props.prices.length > 0 && <Calculate prices={this.props.prices} tip={this.props.tip}/>
          }
        </div>
      </div>
  )}
}
