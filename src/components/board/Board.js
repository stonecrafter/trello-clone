import React, { Component } from 'react';
import Column from '../column/Column';
import { DIRECTIONS } from '../constants';

class Board extends Component {
  constructor() {
    super();

    // Starting states
    // Just some random columns
    this.state = {
      columns: [
        {
          title: 'Crazy Ideas',
          titleClass: 'lightpurple',
          cards: [
            {
              contents: 'Learn Finnish'
            },
            {
              contents: 'Enroll in UX Academy'
            }
          ]
        },
        {
          title: 'Planning',
          titleClass: 'lightpink',
          cards: [
            {
              contents: 'Live in Europe'
            },
            {
              contents: 'Take a train trip over winter holidays'
            }
          ]
        },
        {
          title: 'Doing',
          titleClass: 'darkpink',
          cards: [
            {
              contents: 'JavaScript30 challenge'
            },
            {
              contents: 'Suck less at React'
            }
          ]
        },
        {
          title: 'Done',
          titleClass: 'darkpurple',
          cards: [
            {
              contents: 'Updated personal website'
            },
            {
              contents: 'An interview with <redacted>'
            }
          ]
        }
      ]
    }
  }

  /**
   * Add a card, given a value and a column id
   */
  addCards = (value, colIdx) => {
    // Create the new card object
    const newCard = {
      contents: value
    }

    // Find the column to append the card to - get its data AND index
    // Ahhh, there should be a cleaner way to do this
    const targetColumn = this.state.columns.find((col, idx) => {
      return idx === colIdx;
    });

    // Make a copy of the column to modify
    const newTargetColumn = {
      ...targetColumn,
      cards: [...targetColumn.cards, newCard]
    }

    this.setState((prevState) => ({
      columns: [
        ...prevState.columns.slice(0, colIdx),
        newTargetColumn,
        ...prevState.columns.slice(colIdx + 1)
      ]
    }));
  }

  /**
   * Move a card to the column to the left or to the right of it
   */
  moveCard = (direction, colIdx, cardIdx) => {
    // Grab the column to move the card to
    const targetColIdx = (direction === DIRECTIONS.LEFT) ? colIdx - 1 : colIdx + 1;
    const originalTargetCol = this.state.columns[targetColIdx];

    // Grab the content string of the card to be moved, we do not care about
    // any other attribute as it is not stored in the state
    const originalCol = this.state.columns[colIdx];
    const { contents } = originalCol.cards[cardIdx];

    // Recreate the object of the column that is losing a card
    const newOriginalCol = {
      ...originalCol,
      cards: [
        ...originalCol.cards.slice(0, cardIdx),
        ...originalCol.cards.slice(cardIdx + 1)
      ]
    };

    // Add the card to the target column
    const newTargetCol = {
      ...originalTargetCol,
      cards: [
        ...originalTargetCol.cards.slice(0, cardIdx),
        { contents },
        ...originalTargetCol.cards.slice(cardIdx)
      ]
    };

    // Depending on if the target is left or right of the original col, we can unshift or push it
    // Also find the index from which to slice when recreating the board during setState
    let sliceFrom;
    const editedCols = [newOriginalCol];
    if (direction === DIRECTIONS.LEFT) {
      editedCols.unshift(newTargetCol);
      sliceFrom = targetColIdx;
    } else {
      editedCols.push(newTargetCol);
      sliceFrom = colIdx;
    }

    // Finally ready to update the state!
    this.setState((prevState) => ({
      columns: [
        ...prevState.columns.slice(0, sliceFrom),
        ...editedCols,
        ...prevState.columns.slice(sliceFrom + 2)
      ]
    }));
  }

  render() {
    return (
      <div className="Board">
        {
          this.state.columns.map((column, idx) => {
            // Use the class as the unique key since they are fixed....
            // okay, I know that's an awkward option, think of something better later
            return (
              <Column
                key={idx}
                id={idx}
                class={column.titleClass}
                title={column.title}
                cards={column.cards}
                addCards={this.addCards}
                moveCard={this.moveCard}
                >
              </Column>
            );
          })
        }
      </div>
    );
  }
}

export default Board;
