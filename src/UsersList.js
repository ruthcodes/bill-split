import React, { Component } from 'react';

export default class UsersList extends Component{
  render(){
    return (
      <div className="userControls">
        {
          this.props.prices.map((price) => {
            return <li>{price}</li>
          })
        }
      </div>
    )
  }
}
