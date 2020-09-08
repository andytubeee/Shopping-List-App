import React, { Component, useEffect, useState } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v1 as uuid } from 'uuid';

class ShoppingList extends Component {
  state = {
    items: [],
    isEmpty: true,
    emptyHeading: 'Empty',
  };

  removeItem = (arr, value) => {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  };

  render() {
    const { items } = this.state;
    return (
      <Container>
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={() => {
            const name = prompt('Enter Item: ');
            if (name) {
              this.setState((state) => ({
                items: [...state.items, { id: uuid(), name }],
                isEmpty: false,
                emptyHeading: '',
              }));
            }
          }}
        >
          Add Item
        </Button>

        <h2 className="text-center">{this.state.emptyHeading}</h2>

        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ id, name }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {/* Edit Btn */}
                  <Button
                    className="edit-btn"
                    color="primary"
                    size="sm"
                    onClick={() => {
                      const newName = prompt('Enter New Name: ');
                      this.setState({
                        items: [{ id: uuid(), name: newName }],
                      });
                    }}
                  >
                    Edit
                  </Button>
                  {/* Add Btn */}
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => {
                      this.setState((state) => ({
                        items: state.items.filter((item) => item.id !== id),
                      }));

                      if (items.length == 1) {
                        setTimeout(() => {
                          this.setState({
                            isEmpty: true,
                            emptyHeading: 'Empty',
                          });
                        }, 600);
                      }
                    }}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}
export default ShoppingList;
