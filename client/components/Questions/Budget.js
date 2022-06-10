import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setBudget } from '/client/store';
import ReturnAndContinue from './QuestionsComponents/ReturnAndContinue'

const Budget = ({ budget, setBudget }) => {
    const initialBudget = budget;
    const [value, setValue] = useState(initialBudget)

    function onBudgetChange(ev) {
        setValue(ev.target.value)
        console.log(ev.target.value, 'value')
    }
    return (
        <div>
            <h1>What is your budget?</h1>
            <div className='budget-label'>
                $10
                <input type='range' min="10" max="100"step="5" defaultValue={value} onChange={onBudgetChange} className='sliderBudget'>
                </input>
                $100
            </div>
            <label htmlFor='budget' className='budget-label'>${value}</label>
            <ReturnAndContinue
                returnPath={'/questions'}
                continuePath={'/questions/person'}
                onContinueClick = {() => setBudget(value)}
            />
        </div>
    )
}

const mapState = (state) => {
    console.log(state)
    return {
        budget: state.questions.budget
    }
}

const mapDispatch = (dispatch) => {
    return {
        setBudget: value => dispatch((setBudget(value)))
    }
}

export default connect(mapState, mapDispatch)(Budget)