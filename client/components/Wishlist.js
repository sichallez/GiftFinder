import React, { Component } from 'react';
import {connect} from 'react-redux'
import { getWishlist } from '../store/wishlist'

class Wishlist extends Component{

    componentDidMount(){
        this.props.getWishlist();
    }

    render(){
        return(
            <div>
                Wishlist Is Empty
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getWishlist: function () {
        dispatch(getWishlist());
      },
    };
};

export default connect(state=>state,mapDispatchToProps)(Wishlist)