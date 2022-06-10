import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReturnAndContinue from './QuestionsComponents/ReturnAndContinue'

class Category extends Component {
    render() {
        return (
            <div>
                <h1 className='questionsH1'> Choose a category</h1>

                <ReturnAndContinue
                returnPath={'/questions/character'}
                continuePath={'/home'}
                // onContinueClick = {() => setBudget(value)}
            />
            </div>
        )
    }
}

const mapState = (state) => {
    return {
       state
    }
}


export default connect(mapState)(Category)