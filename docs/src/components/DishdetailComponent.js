import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

  function RenderComments({dish}){
    if (dish != null){
      const comments = dish.comments.map((dish) => {
        return(
          <div key={dish.id} className="row">
            <div className="col-12">
              <p>{dish.comment}</p>
            </div>
            <div className="col-12">
              <p>-- {dish.author} , {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(dish.date)))} </p>
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
            {comments}
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
        <RenderComments dish={props.dish} />
      </div>
    );
  }


export default DishDetail;
