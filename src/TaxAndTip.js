import React, { Component } from 'react';

export default class TaxAndTip extends Component{
  render(){
    return (
      <div className="userControls">
        <p>Add Tip:</p>
        <button className="btn btn-primary">10%</button>
        <button className="btn btn-primary">15%</button>
        <button className="btn btn-primary">20%</button>
      </div>
    )
  }
}
