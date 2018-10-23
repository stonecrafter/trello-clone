import React, { Component } from 'react';
import Card from '../card/Card';

class Column extends Component {

  /**
   * Add a card, using the window.prompt API
   */
  addCard = () => {
    const result = window.prompt('Add a card');
    // Do nothing if input is blank
    if (result) {
      this.props.addCards(result, this.props.id);
    }
  }

  /**
   * Move a card to the left or right column from this one
   * Basically just call the prop method but add on the id of this column
   */
  moveCard = (direction, cardIdx) => {
    this.props.moveCard(direction, this.props.id, cardIdx);
  }

  render() {
    // Card direction arrows are based on the current column's index
    // The 4 columns are fixed. Obviously if columns were customisable
    // this wouldn't be hard coded
    const hasLeft = this.props.id > 0;
    const hasRight = this.props.id < 3;

    return (
      <div className="Column">
        <div className={`Column__title Column__title--${this.props.class}`}>
          <div className="Column__title--text">{this.props.title}</div>
        </div>
        {
          this.props.cards.map((card, idx) => {
            return (
              <Card
                key={idx}
                id={idx}
                hasLeft={hasLeft}
                hasRight={hasRight}
                contentString={card.contents}
                moveCard={this.moveCard}
                >
              </Card>
            );
          })
        }
        <div className="Column__add">
          <button onClick={this.addCard}>+ Add a card</button>
        </div>
      </div>
    );
  }
}

export default Column;
