import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import axios from 'axios';

class ItemModal extends Component {
  state = {
    modal: false,
    name: '',
  };

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

  onSubmit = e => {
    e.preventDefault();
    if (this.state.name.length > 0) {
      const newItem = {
        name: this.state.name,
      };

      // Add to redux reducer state
      this.props.addItems(newItem);
      console.log(this.props.item.isEmpty);
      console.log(this.props.item.items.length);

      // Close form
      this.toggle();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Item name cannot be empty!',
        footer: '<a href>Please go back and try again</a>',
      });
    }
  };

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >
          Add Item
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopplst</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add Shopplst Item"
                  onChange={this.onChange}
                />
                <Button
                  color="dark"
                  style={{ marginTop: '1.5rem' }}
                  type="submit"
                  block
                >
                  Submit
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

Modal.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  item: state.item,
});

export default connect(mapStateToProps, { addItems: addItem })(ItemModal);
