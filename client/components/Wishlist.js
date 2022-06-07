import React, { Component } from "react";
import { connect } from "react-redux";
import { getWishlist } from "../store/wishlist";
import { getAllLists } from "../store/wishlists";

class Wishlist extends Component {
  componentDidMount() {
    this.props.getWishlist(this.props.id);
    this.props.getAllLists();
  }

  render() {
    if (!this.props.wishlist) {
      return null;
    }

    if (!this.props.wishlist.gifts || this.props.wishlist.gifts.length === 0) {
      return <div>Wishlist Is Empty</div>;
    }

    const wishListGifts = this.props.wishlist.gifts;

    return (
      <><h3>{this.props.wishlist.name}</h3>
      <div>{wishListGifts.map(gift => {

        return (
          <div key={gift.id}>
            {gift.name} <br />
            <img src={gift.image_url} width="50%" /> <br />
            {`$${gift.price}`}
            <br />
            <br />
          </div>
        );
      })}</div></>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getWishlist: function (id) {
      dispatch(getWishlist(id));
    },
    getAllLists: function () {
      dispatch(getAllLists());
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(Wishlist);
