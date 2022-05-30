import React, { Component } from "react";
import "./Productcard.css";

class Productcard extends Component {

  state = {
    isClicked: false
  }

  //this.props.loggedIn

  showIcon = () => {
    if (this.props.loggedIn) {
      if (this.props.page_type === "homepage") {
        return <i className={this.state.isClicked ? "fa fa-bookmark fa-lg circle-icon" : "far fa-bookmark fa-lg circle-icon"} onClick={() => {
          this.props.handleBookmark(this.props.id);
          this.setState({ isClicked: true })
        }}></i>
      } else  {
        return <i className="fa fa-trash fa-lg circle-icon" aria-hidden="true" onClick={() => this.props.handleDelete(this.props.id)}></i>
      }
    }
  }

  render() {
    return (
      <div className="card">
        <div className="img-container">
          {this.showIcon(this.props)}
          <img src={this.props.image} alt={this.props.id} />
        </div>
        <div className="info">
          <p className="info-title">
            <span><a href={this.props.url} >{this.props.title}...</a></span>
          </p>
          <span className="price">${this.props.price}</span>
        </div>
      </div>)
  };
}

export default Productcard;