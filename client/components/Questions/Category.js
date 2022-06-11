import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setCategory } from '/client/store';
import ReturnAndContinue from './QuestionsComponents/ReturnAndContinue'

const Category = ({ category }) => {
    const categories = [
    //     'Clothes',
    //     'Electronics',
    //     'Home & Living',
    //     'Sports & Outdoors',
    //     'Games',
    //     'Craft Supplies',
    //     'Books',
    //     'Kitchen & Bar',
    //     'Jewelry & Accessories',
    //     'Anniversary',
    //     'All'
    // ]
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
            const updatedSelection = [...selectedCategory]
            updatedSelection.splice(updatedSelection.indexOf(key), 1)
            setSelectedCategory(updatedSelection)
        } else {
            setSelectedCategory([...selectedCategory, key])
        }
    }
    console.log(selectedCategory, 'selected', categories, 'cat')
    return (
        <div>
            <h1 className='questionsH1'> Choose a category</h1>
            <div className='category-div'>
                {categories.map((cat) => {
                    return (
                        <button
                            className={cat.id === cat.id ? 'category-btn' : 'category-btnActive'}
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