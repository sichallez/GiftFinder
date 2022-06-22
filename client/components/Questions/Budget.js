import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { setBudget } from '/client/store';
import ReturnAndContinue from './components/ReturnAndContinue'
import { Slider } from '@mui/material';

const Budget = ({ budget, setBudget}) => {
    const initialBudget = budget;
    const [value, setValue] = useState(initialBudget)

    let history = useHistory()
    function onBudgetChange(ev) {
        setValue(ev.target.value)
        history.push({
            pathname: '/questions/budget',
            search: `:${ev.target.value}`,
            state: { budget: `${ev.target.value}`}          
        })
    }

    function onBudgetSubmit(ev) {
        ev.preventDefault()
    }

    useEffect(() => {
        setValue(JSON.parse(window.localStorage.getItem('value')))
    }, [])

    useEffect(() => {
        window.localStorage.setItem('value', value)
    }, [value])
    
    return (
        <div className='budget-div'>
            <h1 className='questionsH1'>What is your budget?</h1>
            <form className='budget-label' onSubmit={onBudgetSubmit}>
                $10
                {/* <input type='range' min="10" max="100"step="5" defaultValue={value} onChange={onBudgetChange} className='sliderBudget'>
                </input> */}
                <Slider
                    aria-label="Temperature"
                    value={value} 
                    onChange={onBudgetChange}
                    step={5}
                    min={10}
                    max={100}
                    sx={{
                        width: '80%',
                        color: '#91a4d9',
                        height: 5
                    }}
                />
                $100
            </form>

            <label htmlFor='budget' className='budget-label'>${value}</label>
            <ReturnAndContinue
                returnPath={'/questions'}
                continuePath={'/questions/person'}
                onContinueClick = {() => setBudget(value)}
            />
        </div>
    )
}

const mapState = (state, {history}) => {
//     const state = { 'page_id': 1, 'user_id': 5 }
// const url = 'hello-world.html'

// history.pushState(state, '', url)
    return {
        budget: state.questions.budget
    }
}

const mapDispatch = (dispatch) => {
    return {
        setBudget: value => dispatch((setBudget(value))),
    }
}

export default connect(mapState, mapDispatch)(Budget)