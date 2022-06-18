import { Living } from '@mui/icons-material';
import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import ReturnAndContinue from './components/ReturnAndContinue'
import Clothes from './jsons/Clothes'

const Result = ({ selectedBudget, selectedCategory, categories, selectedCharacter, selectedPerson }) =>  {
    const [filteredProducts, setFilteredProducts] = useState([])

    // const categories = [
    //     'clothes',
    //     'electronics',
    //     'home & Living',
    //     'sports & outdoors',
    //     'games',
    //     'craft supplies',
    //     'books',
    //     'kitchen & bar',
    //     'jewelry & accessories',
    //     'anniversary'
    //   ]

    /*
        usememo: returns a memoized value(opimization technique to store results)
        pass a "create function" and an arr of dependecies = (computeValue(a,b), [a, b])
        helps to avoid expensive calculations on every memo. 
        if no arr, a new value will be computed 
    */

    const products = useMemo(() => {
        return selectedCategory.map((category) => {
            return categories[category]
        }).flat();
    }, [selectedCategory])
    console.log(products, 'products')

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