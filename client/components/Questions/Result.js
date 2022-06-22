import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import ReturnAndContinue from './components/ReturnAndContinue'

// const Result = ({ results, selectedBudget, selectedCategory, categories, selectedCharacter, selectedPerson }) =>  {
const Result = (props) =>  {
    console.log(props)
    return (
        <div>
            <h1 className='questionsH1'>Results Pending...</h1>

            <ReturnAndContinue
            returnPath={'/questions/category'}
            continuePath={'/home'}
            // onContinueClick = {() => setBudget(value)}
        />
        </div>
    )
}

const mapState = (state) => {
    return {
        selectedBudget: state.questions.budget,
        categories: state.questions.category,
        selectedCategory: state.questions.category,
        selectedCharacter: state.questions.character,
        selectedPerson: state.questions.person
    }
}

export default connect(mapState)(Result)