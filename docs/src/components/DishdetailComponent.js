import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
  Modal, Button, ModalHeader, ModalBody, Label, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

  constructor(props){
    super(props);

    this.state={
      isModalOpen:false,
      clickedSubmit:false
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }

  toggleModal(){
    this.setState({
      isModalOpen : !this.state.isModalOpen
    });
  }

  handleCommentSubmit(values){
    this.setState({
      clickedSubmit: true
    });
    console.log("Comment Submitted: " + JSON.stringify(values));
    alert("Author: " + values.name + "\nRating: " + values.rating + "\nComment: " + values.comment)
  }

  renderModal(){
    return(
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Submit Comment </ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={(values) => this.handleCommentSubmit(values)}>
              <Row className="form-group">
                <Col md={{size:12}}>
                  <Label htmlFor="rating"> Rating </Label>
                </Col>
                <Col md={{size:12}}>
                  <Control.select model=".rating" id="rating" className="form-control" name="rating" defaultValue="5">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{size:12}}>
                  <Label htmlFor="name"> Name </Label>
                </Col>
                <Col md={{size:12}}>
                  <Control.text id="name" model=".name" className="form-control" name="name" placeholder="Name"
                    validators={{
                      required, maxLength:maxLength(15), minLength:minLength(3)
                    }}/>
                  <Errors className="text-danger" model=".name" show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 3 characters',
                      maxLength: 'Must be 15 characters or less'}} />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{size:12}}>
                  <Label htmlFor="comment"> Comment </Label>
                </Col>
                <Col md={{size:12}}>
                  <Control.textarea id="comment" model=".comment" className="form-control" name="comment" rows="6"
                    validators={{
                      required
                    }}/>
                  <Errors className="text-danger" model=".comment" show="touched"
                    messages={{
                      required: "Please let us know your comments before submiting"
                    }} />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{size:12}}>
                  <Button type="submit" color="primary"> Submit </Button>
                </Col>
              </Row>
          </LocalForm>
        </ModalBody>
      </Modal>
    );
  }

  render(){
    return(
      <>
        <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"/> Submit Comment</Button>
        {this.renderModal()}
      </>
    );
  }

}

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
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
        <div className="col-12 col-md-5 m-1">
          <h3>Comments</h3>
          {comment}
          <CommentForm />
        </div>
      </div>
    );
  }
  else {
    return (<div><CommentForm /></div>);
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
