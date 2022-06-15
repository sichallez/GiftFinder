import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setCategory } from '/client/store';
import ReturnAndContinue from './QuestionsComponents/ReturnAndContinue'

const Category = ({ category, setCategory }) => {
    const categories = [
      {id: 1, name: 'Clothes'},
      {id: 2, name: 'Electronics'},
      {id: 3, name: 'Home & Living'},
      {id: 4, name: 'Sports & Outdoors'},
      {id: 5, name: 'Games'},
      {id: 6, name: 'Craft Supplies'},
      {id: 7, name: 'Books'},
      {id: 8, name: 'Kitchen & Bar'},
      {id: 9, name: 'Jewelry & Accessories'},
      {id: 10, name: 'Anniversary'},
      {id: 11, name: 'All'}
    ]

    const initialCategory = category
    const [selectedCategory, setSelectedCategory] = useState(initialCategory)

    function toggleSelected(key) {
        if (selectedCategory.includes(key)) {
            const updatedSelected = [...selectedCategory];
            updatedSelected.splice(updatedSelected.indexOf(key), 1)
            setSelectedCategory(updatedSelected)
        } else {
            setSelectedCategory([...selectedCategory, key])
        }
    }

    const selectedStyle = {
        border: '2px solid hsl(224, 49%, 71%)',
        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
        backgroundColor: '#91a4d9',
        color: 'white'
      };

    return (
        <div>
            <h1 className='questionsH1'> Choose a category</h1>
            <div className='category-div'>
                {categories.map((cat) => {
                    const addSelectedStyle = selectedCategory.includes(cat.name)
                    return (
                        <button
                            style={addSelectedStyle ? selectedStyle : {}}
                            className='category-btn'
                            key={cat.id}
                            value={cat.name}
                            onClick={() => {
                                toggleSelected(cat.name)
                            }}
                        >{cat.name}</button>
                    )
                })}
            </div>
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