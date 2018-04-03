import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import Cards from './card';
import './style.css';

class App extends Component {
  totalCards = 16;
  totalBlocksOpened = 0;
  arr = [0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7];
	arr = this.shuffle(this.arr);
  openindex = -1; counter = 0; noc = 0; totalBlocksOpened = 0;
  redBoxShadow = "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgb(245, 0, 45)";
  normalBoxShadow = "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)";

  constructor() {
    super();
    this.state = {
      name: 'Memory Game',
      numberOfClicksUsed : 0
    };
    this.updateNumberOfClicks = this.updateNumberOfClicks.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.updateTotalBlocksOpened = this.updateTotalBlocksOpened.bind(this);
    this.game = this.game.bind(this);
  }

  updateNumberOfClicks(){
    this.setState({"numberOfClicksUsed":this.state.numberOfClicksUsed+ 1});
  }

  updateTotalBlocksOpened(){
   this.totalBlocksOpened = this.totalBlocksOpened + 2;
   if(this.totalBlocksOpened == this.totalCards){
     document.getElementById("modal-message").innerHTML = "Total No. of Clicks used "+this.state.numberOfClicksUsed;
      //alert("Total No. of Clicks used "+this.state.numberOfClicksUsed);
      document.getElementById('id01').style.display = 'block';
      document.getElementById("modal-close").onclick = function(){
        document.getElementById('id01').style.display = 'none';
        this.resetGame();
      }.bind(this); 
   }
  }

  componentDidMount(){
    this.showNumbersInitially();
  }

  showNumbersInitially(){
    document.getElementById("modal-message").innerHTML = "1. Numbers will be displayed to you for 2 seconds.<br/> 2. Memorize the numbers and then make pairs of similar numbers.";
    document.getElementById('id01').style.display = 'block';
    let self = this;
    document.getElementById("modal-close").onclick = function(){
      document.getElementById('id01').style.display = 'none';
      for(let i = 1; i <= self.totalCards; i++){
        let div_ref = document.getElementById("box"+i);
        div_ref.innerHTML = self.arr[i - 1];
        setTimeout(function() {
          div_ref.innerHTML = "";
        }, 2000);
      }
    }
  }

  resetGame(){
    /*for(let i = 1; i <= this.totalCards; i++){
      document.getElementById("box"+i).innerHTML = "";
    }*/
    this.setState({"numberOfClicksUsed":0});
    this.totalBlocksOpened = 0;
    this.shuffle(this.arr);
    this.showNumbersInitially();
  }

  game(event,div_ind){
    var div_ref = event.currentTarget;
    if(div_ref.innerHTML == ""){
      if(this.counter == 0){
        div_ref.innerHTML = this.arr[div_ind];
        this.counter++;
        this.openindex = div_ind;
      }
      else if(this.arr[this.openindex] == this.arr[div_ind] && this.counter == 1){
            div_ref.innerHTML = this.arr[div_ind];
            this.updateNumberOfClicks();
            this.counter = 0;
            this.updateTotalBlocksOpened();
          }
          else{
            div_ref.innerHTML = this.arr[div_ind];
            document.getElementById("modal-message").innerHTML = "Numbers didn't match.";
            div_ref.style.boxShadow = this.redBoxShadow;
            setTimeout(function() {
              div_ref.style.boxShadow = this.normalBoxShadow;
              div_ref.innerHTML = "";
              this.updateNumberOfClicks();
            }.bind(this), 500);
          }
        }
      else{
        document.getElementById("modal-message").innerHTML = "Already Openend.";
        document.getElementById('id01').style.display = 'block';
        document.getElementById("modal-close").onclick = function(){
          document.getElementById('id01').style.display = 'none';
        }
    }
  }

  shuffle(array){
    let counter = array.length, temp, index;

    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
   }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <div className="w3-container">
          <div>Total number of clicks used : <b><span>{this.state.numberOfClicksUsed}</span></b></div>
          <br/>
        </div>
        <Cards totalCards = {this.totalCards} game = {this.game}/>
      </div>
    );
  }
}


render(<App />, document.getElementById('root'));
