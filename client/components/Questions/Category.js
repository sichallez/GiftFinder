import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setCategory } from '/client/store';
import ReturnAndContinue from './QuestionsComponents/ReturnAndContinue'

const Category = ({ category }) => {
    const initialCategory = category
    const [selectedCategory, setSelectedCategory] = useState(initialCategory)
    function toggleSelected(key) {
        console.log(key)
    }
    return (
        <div>
            <h1 className='questionsH1'> Choose a category</h1>
            {category.map((cat) => {
                return (
                    <button
                        className='category-btn'
                        key={cat.id}
                        value={cat.name}
                        onClick={() => {
                            toggleSelected(cat.name)
                        }}
                    >{cat.name}</button>
                )
            })}
            <ReturnAndContinue
            returnPath={'/questions/character'}
            continuePath={'/questions/result'}
            onContinueClick = {() => setCategory(selectedCategory)}
        />
        </div>
    )
}

const mapState = (state) => {
    return {
       category: state.questions.category
    }
}

const mapDispatch = (dispatch) => {
    return {
        setCategory: selectedCategory => dispatch((setCategory(selectedCategory)))
    }
}


export default connect(mapState, mapDispatch)(Category)