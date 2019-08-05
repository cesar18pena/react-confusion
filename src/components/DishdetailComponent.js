import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import Comment from './CommentForm';

function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    )
  } else {
    return (
      <div></div>
    );
  }
}

function RenderComments({ comments }) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  if (comments != null) {
    const commentaries = comments.map((comment) => {
      return (
        <div key={comment.id}>
          <ul className="list-unstyled">
            <li className="media">
              <div className="media-body">
                <p>{comment.comment}</p>
                <p>-- {comment.author}, {new Date(comment.date).toLocaleDateString('en-US', options)}</p>
              </div>
            </li>
          </ul>
        </div>
      );
    });

    return (
      <div>
        <div>
          <h4>Comments</h4>
          {commentaries}
        </div>
        <Comment />
      </div>
    );
  } else {
    return (
      <div></div>
    );
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
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-sm-12 col-md-5 m-1">
          <RenderComments comments={props.comments} />                    
        </div>
      </div>
    </div>
  );
}

export default DishDetail;
