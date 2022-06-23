import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from './components/Navigation'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Button } from '@mui/material';

class Result extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryData: [],
            selectedBudget: props.state.questions.budget,
            selectedCategory: props.state.questions.category,
            selectedPerson: props.state.questions.person,
        }
    }

    componentDidMount() {
        const { selectedCategory, selectedPerson, selectedBudget } = this.state
        if (this.props.location.pathname.includes(selectedCategory)) {
            const budget = selectedBudget.toString().slice(0,2).padEnd(5, '.00')

            //https://cors-anywhere.herokuapp.com/corsdemo  
            //`https://cors-anywhere.herokuapp.com/openapi.etsy.com/v2/listings/active?&limit=50&api_key=igx6b90unhkjik68jacmq0jc`

            fetch(
                `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://openapi.etsy.com/v2/listings/active?
                keywords=${
                    selectedCategory.length !== 0 ? selectedCategory //selectedCategory is not null, so it is used
                    : selectedCategory.length === 0 && selectedPerson.length !== 0 ? selectedPerson //selectedCategory is null, so selectedPerson is used if it is not null
                    : 'random' }
                &max_price=${budget}
                &includes=MainImage&fields=description,materials,price,state,tags,taxonomy_id,taxonomy_path,title,url,who_made,&limit=10&api_key=igx6b90unhkjik68jacmq0jc`)}`
                )
                .then((res) => res.json())
                .then((data) => {
                    this.setState({ categoryData: data })
            });
        }
    }

    render() {
        const { results, params } = this.state.categoryData
        console.log(results, 'results')
        return (
            <div>
                <h1 className='questionsH1'>Your personalized gift options:</h1>
                <div>
                    {
                        results?.map((result) => {
                            <li key={result.id}>
                                {result.title}
                            </li>
                        })
                    }
                </div>
                <div className='resultBtn'>
                <Button variant="outlined" sx={{ fontSize: '20px', textTransform: 'none', padding: '.5rem .5rem .5rem 1rem', color: 'black'}}>
                    <Navigation text="Start Over" to='/questions' onClick={() => dispatch(resetState())} />
                    <RestartAltIcon  sx={{margin: 'auto auto auto 5px'}}fontSize="medium" color='secondary' />
                </Button>
                </div>
            </div>
        )
    }
}
    

const mapState = (state) => {
    return {
        state
    }
}

const mapDispatch = (dispatch) => {
    return {
        resetState: () => dispatch((resetState()))
    }
}

export default connect(mapState, mapDispatch)(Result)