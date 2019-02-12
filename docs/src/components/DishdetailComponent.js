import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

class DishDetail extends Component {

  renderComments(){
    if (this.props.selectedDish != null){
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const comments = this.props.selectedDish.comments.map((dish) => {
        return(
          <div key={dish.id} className="row">
            <div className="col-12">
              <p>{dish.comment}</p>
            </div>
            <div className="col-12">
              <p>-- {dish.author} , {months[parseInt(dish.date.substr(5,2))-1]} {dish.date.substr(8,2)}, {dish.date.substr(0,4)}</p>
            </div>
          </div>
        )
      });

      return (
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <Card>
              <CardImg width="100%" src={this.props.selectedDish.image} alt={this.props.selectedDish.name}/>
              <CardBody>
                <CardTitle><h4>{this.props.selectedDish.name}</h4></CardTitle>
                <CardText>{this.props.selectedDish.description}</CardText>
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
      <div>
        {this.renderComments()}
      </div>
    );
  }

}

export default DishDetail;
