import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { connect } from 'react-redux';

const Questions = ({ initialBudget }) => {
    return (
        <div className='questions-div'>
            <h1 className='questionsH1'>Gifts Picked Just For You!</h1>
            <p>Personalized products from Etsy are shown in just 3 questions <br/>Get 8 personalized gift recommendations</p>

            <Button 
                variant="outlined" 
                href={`/questions/budget/:budget=${initialBudget}`} 
                sx={{ 
                    padding: '1rem',
                    fontWeight: 'bolder',
                    margin: '20px',
                    fontSize: '16px',
                    color: 'black', 
                    border: '1px solid #e8e9ff',
                    backgroundColor: '#0000ff33',
                    "&:hover": {
                        border: '1px solid white',
                        color: 'black',
                        backgroundColor: '#0000ff33',
                        boxShadow: '12px 12px 2px 1px white'
                    },
                    "&:active": {
                        boxShadow: "12px 12px 2px 1px white",
                        background: "white",
                        color: 'black'
                      }
                }}>
                Click here to get started
            </Button>
        </div>

    )
}

const mapState = (state) => {
    return {
        initialBudget: state.questions.budget
    }
}

export default connect (mapState)(Questions)