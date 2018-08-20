import React, { Component } from 'react';

export default class UsersList extends Component{
  render(){
    return (
      <ul className="runningTotal">
        <p>Your running total:</p>
        {
          this.props.prices.map((price, i) => {
            return <li key={i}>{price}</li>
          })
        }
      </ul>
    )
  }
}
