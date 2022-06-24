import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPerson } from '/client/store';
import ReturnAndContinue from './components/ReturnAndContinue'

class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            text: '',
        }
        this.onTextChange = this.onTextChange.bind(this)
        this.selectedText = this.selectedText.bind(this)
        this.renderSuggestions = this.renderSuggestions.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onTextChange(ev) {
        const value = ev.target.value;
        const { budget } = this.props
        const person = [
            'mom',
            'sibling',
            'coworker',
            'niece',
            'grandchild',
            'grandson',
            'dad',
            'parents',
            'grandma',
            'sister',
            'grandpa',
            'brother',
            'grandparent',
            'granddaughter',
            'partner',
            'couple',
            'cousin',
            'child',
            'son',
            'daughter',
            'client',
            'boss',
            'niece',
            'nephew',
            'aunt',
            'uncle'
        ]
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = person.filter(p => regex.test(p))
        } else if (value.length === 0) {
            suggestions = person.slice(0, 5)
        }
        this.setState(() => ({
            suggestions,
            text: value
        }))

        this.props.history.push({
            pathname: `/questions/person/:budget=${budget}:person=${value}`,
            // pathname: `questions/person`,
            // search: `${suggestions}`,
            state: { suggestions: `${value}`}
        })
    }
    

    selectedText(value) {
        this.setState(() => ({
            text: value,
            suggestions: []
        }))
        this.props.dispatch(setPerson(this.state.suggestions))
    }
    renderSuggestions() {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul className='person-suggestions'>
                {
                    suggestions.map((item, index) => (
                        <li key={index} onClick={() => this.selectedText(item) }>
                            {item}
                        </li>
                    ))
                }
            </ul>
        )
    }
   
    handleSubmit(ev) {
        ev.preventDefault()
        this.props.dispatch(setPerson(this.state.suggestions))
    }
    render() {
        const { text, suggestions } = this.state;
        const { onTextChange, handleSubmit } = this;
        const { budget } = this.props;
        return (
            <div className='persons-div'>
                <div className='person-div'>
                <h1 className='questionsH1'>Who are you shopping for?</h1>
                <form onSubmit={handleSubmit} className='person-form'>
                    <input className='query' type='text' onChange={onTextChange} value={text} placeholder='mom, sibling, coworker...' />
                    {this.renderSuggestions()}
                    <span></span>
                </form>
                </div>
                <div className='person-bottom-div'>
                <ReturnAndContinue
                    returnPath={`/questions/budget/:budget=${budget}`}
                    continuePath={`/questions/category/:budget=${budget}:person=${text ? text : 'n/a'}`}
                    // onContinueClick = {() => setPerson(text)}
                    className='person-return'
                />
                </div>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        person: state.questions.person,
        budget: state.questions.budget
    }
}

// const mapDispatch = (dispatch) => {
//     return {
//         setPerson: suggestions => dispatch((setPerson(suggestions)))
//     }
// }

export default connect(mapState)(Person)