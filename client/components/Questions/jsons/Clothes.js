import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom';
import Result from '../Result';

class Clothes extends Component {
    constructor(){
        super()
        this.state = {
            clothes: []
        }
    }
    componentDidMount() {
        fetch(
            `https://cors-anywhere.herokuapp.com/openapi.etsy.com/v2/listings/active?keywords=${this.props.match.params.search || 'clothing'}&includes=MainImage&fields=description,materials,price,quantity,state,tags,taxonomy_path,title,url,user_id,who_made,&limit=50&api_key=igx6b90unhkjik68jacmq0jc`
          )
            .then((res) => res.json())
            .then((data) => {
              this.setState({ clothes: data })
            });
    }
    render() {
        const results = this.state.clothes
        console.log(results, 'results')
        return (
            <div>
                {/* <Route path='/questions/result'> */}
                    <Result results={results} />
                {/* </Route> */}
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        state
    }
}

export default connect(mapState)(Clothes)