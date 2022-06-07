import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllLists } from "../store/wishlists";
import Wishlist from "./Wishlist";

class Wishlists extends Component {
  componentDidMount() {
    this.props.getAllLists();
  }

  render() {
    
    const lists = this.props.wishlists;

    if(!lists || lists.length === 0){
      return null;
    }

    console.log(lists);
    return (
      <><h3>Your Lists</h3>

      <div>
        {lists.map(list=>{
          return(
            <div key = {list.id}>{list.name}</div>
          )
        })}
      </div>
      <Wishlist /></>
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
