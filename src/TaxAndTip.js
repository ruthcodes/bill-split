import React, { Component } from 'react';

export default class TaxAndTip extends Component{
  render(){
    return (
      <div className="userControls">
        <p>Add Tip:</p>
        <button className="btn btn-primary" data-value={10} onClick={this.props.addTip}>10%</button>
        <button className="btn btn-primary" data-value={15} onClick={this.props.addTip}>15%</button>
        <button className="btn btn-primary" data-value={20} onClick={this.props.addTip}>20%</button>
      </div>
    )
  }
}
