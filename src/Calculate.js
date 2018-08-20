import React, { Component } from 'react';

export default class Calculate extends Component{

  outputTotal = () => {
    let reduced = this.props.prices.reduce((a,b) => parseFloat(a) + parseFloat(b))
    let tip = this.props.tip;
    let addTip;
    switch(tip) {
      case "10":
          addTip = 1.1
          break;
      case "15":
          addTip = 1.15
          break;
      case "20":
          addTip = 1.2
          break;
      default:
          addTip = 1
    }

    return (parseFloat(reduced) * addTip).toFixed(2)
  }

  render(){
    return (
      <div className="runningTotal">
        <p>{this.props.tip}% Tip</p>
        <p>Total: </p> {this.outputTotal()}
      </div>
    )
  }
}
