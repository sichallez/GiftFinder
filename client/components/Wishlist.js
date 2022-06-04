import React, { Component } from "react";
import { connect } from "react-redux";
import { getWishlist } from "../store/wishlist";

class Wishlist extends Component {
  componentDidMount() {
    this.props.getWishlist();
  }

  render() {
    if (!this.props.wishlist) {
      return;
    }

    if (!this.props.wishlist.gifts || this.props.wishlist.gifts.length === 0) {
      return <div>Wishlist Is Empty</div>;
    }

    const wishListGifts = this.props.wishlist.gifts;

    return (
      <div>{wishListGifts.map(gift=>{
        
        console.log(gift)

        return(
          <div key = {gift.id}>
            {gift.name} <br/>
            <img src = {gift.image_url} width = "50%"/> <br/>
            {`$${gift.price}`}
            <br/> 
            <br/>
          </div>
        )
      })}</div>
    );
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
