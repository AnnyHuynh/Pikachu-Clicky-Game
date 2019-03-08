import React, { Component } from 'react';
import ClickyItem from "./ClickyItem";
import "./style.css";

//
// Container for the clickable items
//
// PARAMS:
// * props = React props
// * srcImages = array of image source URL's
//
class ClickyItemContainer extends Component {
  //
  // Render clickable items
  //
  renderItems() {
    return (
      <div className="container">
        {
          this.props.indices.map(i => (
            <div key={i.toString()}>
              <ClickyItem
                item={this.props.items[i]}
                onClick={() => this.props.onClick(i)}
              />
            </div>
          ))
        }
      </div>
    );
  }
  
  //
  // Render the component
  // 
  render() {
    return (
      <div>
        {this.renderItems()}
      </div>
    );
  }
}

// Export the Main class
export default ClickyItemContainer;

