import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setBudget } from './store';

class Budget extends Component {
    constructor() {
        super();
        this.state = {
            budget: '' 
        }
    }
    render() {
        const { budget } = this.state
        return (
            <div>
                helloooo
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        state
    }
}

export default connect(mapState)(Budget)