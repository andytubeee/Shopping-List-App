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
import Swal from 'sweetalert2';
import axios from 'axios';

class ShoppingList extends Component {
  state = {
    modal: false,
    name: '',
  };

  componentDidMount() {
    this.props.getItems();
    console.log(this.props.item.isEmpty);
    console.log(this.props.item.items.length);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onDeleteClick = id => {
    this.props.delItem(id);
    console.log(this.props.item.isEmpty);
    console.log(this.props.item.items.length);
  };

  onEditClick = id => {
    alert(id._id);
    // if (this.state.name.length > 0) {
    //   const newItem = {
    //     name: this.state.name,
    //   };
    //   this.props.delItem(id._id);
    //   this.props.addItem(newItem);

    //   this.setState({
    //     name: '',
    //   });

    //   this.toggle();
    // } else {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'New item name cannot be empty!',
    //     footer: '<a href>Please go back and try again</a>',
    //   });
    // }
  };

  render() {
    const items = this.props.item.items;
    return (
      <Container>
        <h2 className="text-center">
          {/* {this.props.item.isEmpty ? 'Empty' : ''} */}
        </h2>

        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
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
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
        {items.map((_id, name) => (
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Edit Item</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.onEditClick.bind(this, _id)}>
                <FormGroup>
                  <Label for="item">Item Name</Label>
                  <Input
                    type="text"
                    name="name"
                    _id="item"
                    placeholder="Edit Name"
                    onChange={this.onChange}
                  />
                </FormGroup>
              </Form>
              <Button
                color="dark"
                style={{ marginTop: '1.5rem' }}
                block
                onClick={this.onEditClick.bind(this, _id)}
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
