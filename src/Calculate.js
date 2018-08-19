import React, { Component } from 'react';

export default class Calculate extends Component{
  render(){
    return (
      <div className="runningTotal">
        <p>Total: </p> {this.props.prices.reduce((a,b) => a + b).toFixed(2)}
      </div>
    )
  }
}
