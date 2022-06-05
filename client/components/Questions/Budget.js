import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setBudget } from '/client/store';

class Budget extends Component {
    constructor(props) {
        super(props);
        console.log(props.budget, 'props')
        this.state = {
            budget: '' || props.budget,
        }
        this.onBudgetChange = this.onBudgetChange.bind(this)
    }
    componentDidMount() {
        this.props.setBudget()
    }
    componentDidUpdate(prevProps) {
        if (this.props.budget !== prevProps.budget) {
            this.props.setBudget()
        }
    }
    async onBudgetChange(ev) {
        this.setState = ({
            ...ev.target.value,
            value: ev.target.value 
        })
        console.log(ev.target.value)
    }
    render() {
        const { budget } = this.state
        const { onBudgetChange } = this;
        return (
            <div>
                <h1>What is your budget?</h1>
                $10<input type='range' min="10" max="100"step="5" defaultValue={budget} onChange={onBudgetChange} className='sliderBudget'>
                </input>$100
                <label htmlFor='budget'>$</label>
                <p>
                    {/* {text} */}
                </p>
                {/* <button onClick={() => setBudget(budget)}>Next</button> */}
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        budget: state.questions.budget
    }
}

const mapDispatch = (dispatch) => {
    return {
        setBudget: budget => console.log((setBudget(budget)))
    }
}

export default connect(mapState, mapDispatch)(Budget)