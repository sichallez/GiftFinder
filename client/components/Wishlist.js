import React, { Component } from 'react';
import {connect} from 'react-redux'

class Wishlist extends Component{

    render(){
        return(
            <div>
                Wishlist Is Empty
            </div>
        )
    }
}

export default connect(state=>state)(Wishlist)