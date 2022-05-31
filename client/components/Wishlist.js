import React, { Component } from "react";
import { connect } from "react-redux";
import { getWishlist } from "../store/wishlist";

class Wishlist extends Component {
  componentDidMount() {
    this.props.getWishlist();
  }

  render() {
    console.log(this.props);
    if (!this.props.wishlist) {
      return;
    }

    if (this.props.wishlist.totalItems === 0) {
      return <div>Wishlist Is Empty</div>;
    }
    return <div>Wishlist</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getWishlist: function () {
      dispatch(getWishlist());
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(Wishlist);
