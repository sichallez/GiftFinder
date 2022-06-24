import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navigation from './components/Navigation'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Button, Card } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

class Result extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryData: [],
            selectedBudget: props.state.questions.budget,
            selectedCategory: props.state.questions.category,
            selectedPerson: props.state.questions.person,
        }
        this.findFinalProductNames = this.findFinalProductNames.bind(this)
    }

    componentDidMount() {
        const { selectedCategory, selectedPerson, selectedBudget } = this.state
        if (this.props.location.pathname.includes(selectedCategory)) {
            const maxBudget = selectedBudget.toString().slice(0,2).padEnd(5, '.00')
            const minBudget = (selectedBudget - 10).toString().slice(0,2).padEnd(5, '.00')

            //https://cors-anywhere.herokuapp.com/corsdemo  
            //`https://cors-anywhere.herokuapp.com/openapi.etsy.com/v2/listings/active?&limit=50&api_key=igx6b90unhkjik68jacmq0jc`

            fetch(
                `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://openapi.etsy.com/v2/listings/active?
                keywords=${
                    selectedCategory.length !== 0 ? selectedCategory
                    : selectedPerson.length !== 0 ? selectedPerson
                    : 'random' }
                &max_price=${maxBudget}
                &min_price=${minBudget}
                &includes=MainImage&fields=description,materials,price,state,tags,taxonomy_id,taxonomy_path,title,url,who_made,&limit=8&offset=${Math.floor(Math.random() * 1000 || 100 | 10 | 1)}&api_key=igx6b90unhkjik68jacmq0jc`
                )}`
            )
                .then((res) => res.json())
                .then((data) => {
                    this.setState({ categoryData: data })
                    console.log(data, 'data')
            });
        }
    }

    findFinalProductNames() {
        const { results } = this.state.categoryData
        const productName = results?.map((result) => {
            const image = result.MainImage.url_fullxfull
            return (
                <div key={result.id}>
                    <Card varient='outlined'>
                        <CardMedia
                            component='img'
                            height='300px'
                            width='auto'
                            image={`${image}`}
                        />
                    </Card>
                    <li>
                        <a href={`${result.url}`}>{result.title}</a>
                    </li>
                    <li>
                        ${result.price}
                    </li>
                </div>
            )
        })
        return productName
    }

    render() {
        const { results, params } = this.state.categoryData
        const { findFinalProductNames } = this;
        return (
            <div>
                <h1 className='questionsH1'>Your personalized gift options:</h1>
                <div className='results-div'>
                    {findFinalProductNames()}
                </div>
                <div className='startOverBtn'>
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