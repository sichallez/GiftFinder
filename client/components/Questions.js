import React, { Component } from 'react';
import { connect } from 'react-redux';

class Questions extends Component {
    constructor() {
        super()
        this.state = {
            budget 
        }
    }
    render() {
        const { budget } = this.state
        return (
            'hello'
        )
    }
}

export default connect(state => state)(Questions)