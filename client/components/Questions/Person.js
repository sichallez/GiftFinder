import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPerson } from '/client/store';

class Person extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            results: []
        }
        this.personChange = this.personChange.bind(this)
        this.getResults = this.getResults.bind(this)
    }
    personChange(ev) {
        this.setState({
            ...this.state,
            search: ev.target.value
        })
        , () => {
            if (this.state.search && this.state.search.length >=1 ) {
                this.getResults()
            }
        }
    }
    getResults(props) {
        let m = this.state.search.substring(0,1)
        console.log(m, 'm1')
        console.log(props, 'm')
        this.setState({
            ...this.state,
            results: this.props.person.filter(c => c.name.startsWith(m))
        })
    }
    render() {
        const { search, results } = this.state
        const { personChange, getResults } = this;
        return (
            <div>
                <h1>Who are you shopping for?</h1>
                <input name='person' value={search} onChange={personChange} >
                </input>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        person: state.questions.person
    }
}

export default connect(mapState)(Person)