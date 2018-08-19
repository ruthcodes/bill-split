import React, { Component } from 'react';

export default class Divide extends Component{
  render(){
    return (
      <div className="userControls">
        <label>Divide by:</label>
        <input name="divideNum" value={this.props.divideBy} onChange={this.props.handleDivideChange}></input>
        <input name="divideBool" type="checkbox" onChange={this.props.toggleDivideBool}></input>
      </div>
    )
  }
}
