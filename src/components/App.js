import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { images as clickyImages } from "./ClickyItemContainer/ItemSrc";
import Game from './ClickyItemContainer';

//
// Main game app component
//
// * state
//     items: [{ image: <sourc image>, isClicked: <true/false> }, ...]
//     indices: <shuffled array indices for the items>
//     score: <current game score>
//     topScore: <the highest game score>
//     msg: <status message to display> 
//
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.initItems(clickyImages),
      indices: shuffle(clickyImages.length),
      score: 0,
      topScore: 0,
      msg: 'Click on an image without clicking the same one twice!'
    };
  }
 
  //
  // Initialized array of clickable objects
  //
  initItems(srcImages) {
    return srcImages.map((img) => {
      return {
        image: img,
        isClicked: false,
      }
    });
  }
  
  //
  // Handle an item click event
  //
  handleClick(i) {
    let items = this.state.items.slice();
    let topScore = this.state.topScore * 1;
    let msg = [];

    // Reset if the same item is clicked
    if (items[i].isClicked) {
      items = this.initItems(clickyImages);
      
      if (this.state.score > topScore) {
        topScore = this.state.score * 1;
        msg.push(" Highest score!");
      }
      
      msg.unshift("You guessed incorrectly...");
      this.setState({
        items: items,
        indices: shuffle(items.length),
        score: 0,
        topScore: topScore, 
        msg: msg
      });
      
      return;
    }
     
    // update the items[i], shuffle, and increment the score
    items[i].isClicked = true;
    let score = this.state.score + 1;
    
    if (items.every(item => item.isClicked)) {
      msg.push("PERFECT!!! You guessed all correctly");
      items = this.initItems(clickyImages);
      topScore = score;
      score = 0;
    } else {
      msg.push("You guessed correctly");
    }
    
    this.setState({
      items: items,
      indices: shuffle(items.length),
      score: score,
      topScore: topScore,
      msg: msg
    });
  }
  
  //
  // Render the component
  // 
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <AppNavbar
            score={this.state.score}
            topScore={this.state.topScore}
          />
        </header>

        <h4 class="msg-text">
          {this.state.msg}
        </h4>
        
        <Game 
          items={this.state.items}
          indices={this.state.indices}
          onClick={i => this.handleClick(i)}
        />
      </div>
    );
  }
}

//
// Shuffled array indices
//
// PARAMS:
// * arrSize: size of an existing array
//
// RETURN:
// * randomized array indices for the existing array
// 
function shuffle(arrSize) {
  let iniArray = [];
  let resArray = [];
  
  for (let i = 0; i < arrSize; i++) {
    iniArray.push(i);
  }
  
  for (let i = 0; i < arrSize; i++)  {
    const ndx = Math.floor(Math.random() * (arrSize - i));
    resArray[i] = iniArray.splice(ndx, 1)[0];
  }
  
  return resArray;
}

// Export the App
export default App;
