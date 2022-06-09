import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReturnAndContinue from './QuestionsComponents/ReturnAndContinue'


class Character extends Component {
    render() {
        return (
            <div>
                <h1>What type of character is the person?</h1>

                <ReturnAndContinue
                returnPath={'/questions/person'}
                continuePath={'/questions/category'}
                // onContinueClick = {() => setBudget(value)}
            />
            </div>
        )
    }
}

export default Character