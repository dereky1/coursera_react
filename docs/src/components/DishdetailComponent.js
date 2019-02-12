import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

class DishDetail extends Component {
  renderComments(){
    if (this.props.dish != null){
      const comments = this.props.dish.comments.map((dish) => {
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
              <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name}/>
              <CardBody>
                <CardTitle><h4>{this.props.dish.name}</h4></CardTitle>
                <CardText>{this.props.dish.description}</CardText>
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

  render(){
    return(
      <div className="container">
        {this.renderComments()}
      </div>
    );
  }

}

export default DishDetail;
