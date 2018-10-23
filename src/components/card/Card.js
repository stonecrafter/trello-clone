import React, { Component } from 'react';
import { DIRECTIONS } from '../constants';

class Card extends Component {

  render() {
    const leftArrow = '<';
    const rightArrow = '>';

    return (
      <div className="Card">
        <div className="Card__contents">
          {this.props.hasLeft &&
            <div className="Card__arrow" onClick={() => { this.props.moveCard(DIRECTIONS.LEFT, this.props.id) }}>{leftArrow}</div>
          }
          <div className="Card__text">{this.props.contentString}</div>
          {this.props.hasRight &&
            <div className="Card__arrow" onClick={() => { this.props.moveCard(DIRECTIONS.RIGHT, this.props.id) }}>{rightArrow}</div>
          }
        </div>
      </div>
    );
  }
}

export default Card;
