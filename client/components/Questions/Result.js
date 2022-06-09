import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReturnAndContinue from './QuestionsComponents/ReturnAndContinue'


class Result extends Component {
    render() {
        return (
            <div>
                <h1>Results Pending...</h1>

                <ReturnAndContinue
                returnPath={'/questions/category'}
                continuePath={'/home'}
                // onContinueClick = {() => setBudget(value)}
            />
            </div>
        )
    }
}

export default Result