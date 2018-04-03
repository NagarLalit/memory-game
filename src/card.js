import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Cards extends Component{
  render() {
      var cardsLayout = [];
      for(let i = 0; i < this.props.totalCards; i++){
        cardsLayout.push(<div key={"box"+(i+1)} id={"box"+(i+1)} className={"class"+i+" box"} onClick={ (event) => this.props.game(event,i)}></div>);
      }
      return (
         <div className="w3-container">
            {cardsLayout}
         </div>
      );
   }
}