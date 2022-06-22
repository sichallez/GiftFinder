import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReturnAndContinue from './components/ReturnAndContinue'

// const Result = ({ results, selectedBudget, selectedCategory, categories, selectedPerson }) =>  {
class Result extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clothes: [],
            electronics: [],
            home: [],
            sports: [],
            games: [],
            crafts: [],
            books: [],
            kitchen: [],
            jewelry: [],
            anniversary: [],
            // selectedBudget: props.state.questions.budget,
            // selectedCategory: props.state.questions.category,
            // selectedPerson: props.state.questions.person,
        }
    }

    componentDidMount(props) {
        console.log(this.props, 'componentdiddmount')

        //https://cors-anywhere.herokuapp.com/corsdemo  
        fetch(
            `https://cors-anywhere.herokuapp.com/openapi.etsy.com/v2/listings/active?keywords=${this.props.match.params.search || 'clothing'}&includes=MainImage&fields=description,price,tags,taxonomy_path,title,url,&limit=50&api_key=igx6b90unhkjik68jacmq0jc`
          )
            .then((res) => res.json())
            .then((data) => {
              this.setState({ clothes: data })
              console.log(data, 'data')
            });
    }

    render() {
        // const { selectedBudget, selectedCategory, selectedPerson} = this.props
        // console.log(this.props, 'prop')
        const { clothes, electronics, home, sports, games, crafts, books, kitchen, jewelry, anniversary} = this.state
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
}
    

const mapState = (state) => {
    return {
        // selectedBudget: state.questions.budget,
        // categories: state.questions.category,
        // selectedCategory: state.questions.category,
        // selectedPerson: state.questions.person
        state
    }
}

export default connect(mapState)(Result)