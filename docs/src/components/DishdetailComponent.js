import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';

function RenderComments({dish, comments}){

  if (dish != null){
    const comment = comments.map((comments) => {
      return(
        <div key={comments.dishId+comments.id} className="row">
          <div className="col-12">
            <p>{comments.comment}</p>
          </div>
          <div className="col-12">
            <p>-- {comments.author} , {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comments.date)))} </p>
          </div>
        </div>
      )
    });

    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name}/>
            <CardBody>
              <CardTitle><h4>{dish.name}</h4></CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
        <div className="col-12 col-md-5 m-1">
          <h3>Comments</h3>
          {comment}
        </div>
      </div>
    );
  }
  else {
    return (<div></div>);
  }
}

const DishDetail = (props) => {
  return(
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr/>
        </div>
      </div>
      <RenderComments dish={props.dish} comments={props.comments}/>
    </div>
  );
}

export default DishDetail;
