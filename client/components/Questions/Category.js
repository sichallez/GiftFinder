import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReturnAndContinue from './QuestionsComponents/ReturnAndContinue'


class Category extends Component {
    render() {
        return (
            <div>
                <h1>Choose a category</h1>

                <ReturnAndContinue
                returnPath={'/questions/category'}
                continuePath={'/home'}
                // onContinueClick = {() => setBudget(value)}
            />
            </div>
        )
    }
}

export default Category