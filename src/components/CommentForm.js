import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    }

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    alert(JSON.stringify(values));
  }

  render() {

    return (
      <React.Fragment>
        <div className="row">
          <Button 
            onClick={this.toggleModal}
            outline
          > 
          <span className="fa fa-edit fa-lg"></span> 
            Submit Comment
          </Button>
        </div>
        <Modal
          isOpen={this.state.isModalOpen}
          toggle={this.toggleModal}
        >
          <ModalHeader toggle={this.toggleModal}> Submit Comment </ModalHeader>
          <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            <ModalBody>
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>Rating</Label>
                <Col md={12}>
                <Control.select model=".rating" id="rating" name="rating"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                  <Errors 
                    className="text-danger"
                    model=".username"
                    show="touched"
                    messages={{
                      required: 'Required',
                    }}
                    />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="username" md={12}>Your Name</Label>
                <Col md={12}>
                  <Control.text model=".username" id="username" name="username"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors 
                    className="text-danger"
                    model=".username"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                    />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="username" md={12}>Comment</Label>
                <Col md={12}>
                  <Control.textarea model=".comment" id="comment" name="comment"
                    className="form-control"
                    rows={6}
                    validators={{
                      required,
                      minLength: minLength(3),
                    }}
                  />
                  <Errors 
                    className="text-danger"
                    model=".comment"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                    }}
                    />
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" value="submit" color="primary">Submit</Button>
            </ModalFooter>
          </LocalForm>
        </Modal>
      </React.Fragment>
    )
  }
}

export default CommentForm;
