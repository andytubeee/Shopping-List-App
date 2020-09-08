import React, { Component, useEffect, useState } from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, delItem, editItem, addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import { v1 as uuid } from 'uuid';
import Swal from 'sweetalert2';

class ShoppingList extends Component {
  state = {
    modal: false,
    name: '',
    Empty: false,
  };

  componentDidMount() {
    this.props.getItems();
    if (this.props.item.items.length == 0) {
      this.setState({ Empty: true });
    } else {
      this.setState({ Empty: false });
    }
    console.log(this.state.Empty);
  }

  componentDidUpdate() {
    setTimeout(() => {
      if (this.props.item.items.length == 0) {
        this.setState({ Empty: true });
      } else {
        this.setState({ Empty: false });
      }
    }, 2000);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = e => {
    if (e.target.value.length >= 0) {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  onDeleteClick = id => {
    this.props.delItem(id);
  };

  onEditClick = id => {
    if (this.state.name.length > 0) {
      const newItem = {
        id: uuid(),
        name: this.state.name,
      };
      this.props.editItem({ newItem, id }); // Remove the item
      this.props.addItem(newItem);

      this.toggle();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'New item name cannot be empty!',
        footer: '<a href>Please go back and try again</a>',
      });
    }
  };

  render() {
    const items = this.props.item.items;
    return (
      <Container>
        <h2 className="text-center">{this.state.Empty ? 'Empty' : ''}</h2>

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
                    onClick={this.toggle}
                  >
                    Edit
                  </Button>

                  {/* Add Btn */}
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, id)}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
        {items.map((id, name) => (
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Edit Item</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.onEditClick.bind(this, id)}>
                <FormGroup>
                  <Label for="item">Item Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="item"
                    placeholder="Add Shopplst Item"
                    onChange={this.onChange}
                  />
                </FormGroup>
              </Form>
              <Button
                color="dark"
                style={{ marginTop: '1.5rem' }}
                block
                onClick={this.onEditClick.bind(this, id)}
              >
                Edit
              </Button>
            </ModalBody>
          </Modal>
        ))}
      </Container>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  item: state.item,
});

export default connect(mapStateToProps, {
  getItems,
  delItem,
  editItem,
  addItem,
})(ShoppingList);
