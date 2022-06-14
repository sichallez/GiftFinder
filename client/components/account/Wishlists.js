import React, { Component } from "react";
import { connect } from "react-redux";
import {HashRouter, BrowserRouter, Route, Link} from 'react-router-dom';
import { getAllLists } from "../../store/wishlists";
import CreateList from "./CreateList";

class Wishlists extends Component {
  componentDidMount() {
    this.props.getAllLists();
  }

  render() {
    
    const lists = this.props.wishlists;


    if(!lists || lists.length === 0){
      return <CreateList/>;
    }

    return (
      <>
      {/* <BrowserRouter> */}
            {this.props.wishlists.map(list=>{
              return(
                <div key={list.id}>
                   
                   <Link to={`/account/wishlist/${list.id}`}>{list.name}</Link>
                   
                </div>
              )
            })}
      {/* </BrowserRouter> */}
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllLists: function () {
      dispatch(getAllLists());
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(Wishlists);