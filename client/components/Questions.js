import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { connect } from 'react-redux';

const Questions = ({ initialBudget }) => {
    return (
        <div>
            <h1>Gifts Picked Just For You!</h1>
            <h3>Getting a gift for a coworker or someone close to you? Not sure what to get them?</h3>
            <h3>Well, you can get a personalized gift in just a few questions!</h3>
            <Button variant="outlined" href={`/questions/budget/:budget=${initialBudget}`} >
                Get Started
            </Button>
        </div>

    )
}

const mapState = (state) => {
    console.log(state)
    return {
        initialBudget: state.questions.budget
    }
}

export default connect (mapState)(Questions)