import React, { Component } from "react";
import { connect } from "react-redux";
import {BrowserRouter, Route, Link} from 'react-router-dom';
import { getAllLists } from "../../store/wishlists";
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

    return (
      <>
      <BrowserRouter>
        <h3>Your Lists</h3>

        <div>
          {lists.map(list=>{
            return(
              <div key = {list.id}><Link to={`/account/wishlist/${list.id}`}>{list.name}</Link></div>
            )
          })}
          <Route path = "/account/wishlist/:id" component={Wishlist}/>
        </div>
      </BrowserRouter>
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
