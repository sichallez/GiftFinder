import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setBudget } from '/client/store';

class Budget extends Component {
    constructor(props) {
        super(props);
        console.log(props.budget, 'props')
        this.state = {
            budget: props.budget
            // value: '' || 20
        }
        this.onBudgetChange = this.onBudgetChange.bind(this)
    }
    onBudgetChange(ev) {
        this.setState = ({[ev.target.name]: ev.target.value })
    }
    render() {
        const { budget } = this.state
        const { onBudgetChange } = this;
        return (
            <div>
                <h1>Choose a Budget For Your Gift</h1>
                <input type='range' min="1" max="100" onChange={onBudgetChange} >
                </input>
                <p>
                    {/* {text} */}
                </p>
            </div>
        )
    }
}

const mapState = (state) => {
    console.log(state.questions)
    return {
        budget: state.questions.budget
    }
}

export default connect(mapState)(Budget)