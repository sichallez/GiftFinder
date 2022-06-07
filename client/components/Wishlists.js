import React, { Component } from "react";
import { connect } from "react-redux";
//import wishlist, { getWishlist } from "../store/wishlist";

class Wishlists extends Component {
//   componentDidMount() {
//     this.props.loadAllList();
//   }

  render() {
    

    return (
      <h3>Your Lists</h3>
    )
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getWishlist: function () {
//       dispatch(getWishlist());
//     },
//   };
// };

export default connect((state) => state)(Wishlists);
