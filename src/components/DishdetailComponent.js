import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

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
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
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
                    model=".rating"
                    show="touched"
                    messages={{
                      required: 'Required',
                    }}
                    />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={12}>Your Name</Label>
                <Col md={12}>
                  <Control.text model=".author" id="author" name="author"
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
                    model=".author"
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
                <Label htmlFor="author" md={12}>Comment</Label>
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

function RenderDish({ dish, isLoading, errMess }) {

  if(isLoading) {
    return (
      <div className="container"> 
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if(errMess) {
    return (
      <div className="container"> 
        <div className="row">
          <h4>{errMess}</h4>
        </div>
      </div>
    )
  }
  else if (dish != null) {
    return (
      <FadeTransform
        in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'}}
        >
        <Card>
          <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    )
  } else {
    return (
      <div></div>
    );
  }
}

function RenderComments({ comments, postComment, dishId }) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  if (comments != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
        <Stagger in>
          {comments.map((comment) => {
            return (
              <Fade in>
                <li key={comment.id}>
                  <p>{comment.comment}</p>
                  <p>-- {comment.author}, {new Date(comment.date).toLocaleDateString('en-US', options)}</p>
                </li>
              </Fade>
            )
          })}
          </Stagger>
        </ul>
        <CommentForm
          dishId={dishId}
          postComment={postComment} 
        />
      </div>
    )
  } 
}

const DishDetail = (props) => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/menu">menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-5 m-1">
          <RenderDish 
            dish={props.dish}
            isLoading={props.isLoading}
            errMess={props.errMess}
           />
        </div>
        <div className="col-sm-12 col-md-5 m-1">
          <RenderComments 
            postComment={props.postComment}
            comments={props.comments}
            dishId={props.dish.id}
           />                    
        </div>
      </div>
    </div>
  );
}

export default DishDetail;
