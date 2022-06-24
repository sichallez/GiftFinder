import React from 'react';
import Navigation from './Navigation';
import { Button } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const ReturnAndContinue = (props) => {
    const { returnPath, continuePath, onContinueClick } = props;
    return (
        <div className='return-div'>
            <Button variant="outlined" sx={{ 
                fontSize: '18px', 
                textTransform: 'none', 
                padding: '.25rem 1.25rem .25rem .5rem', 
                color: 'black',
                border: '1px solid #e8e9ff',
                backgroundColor: '#0000ff33',
                "&:hover": {
                    border: '1px solid white',
                    color: 'black',
                    backgroundColor: 'white',
                    boxShadow: '5px 5px 0 0 lightgray'
                },
                "&:active": {
                    boxShadow: "12px 12px 1px 1px gray",
                    background: "white",
                    color: 'black'
                    }
                }}>
                <ArrowLeftIcon fontSize="large" color='white' />
                <Navigation 
                    to={returnPath} 
                    text="Return" 
                />
            </Button>
            <Button variant="outlined" sx={{ 
                fontSize: '18px', 
                textTransform: 'none', 
                padding: '.5rem .5rem .5rem 1.25rem', 
                color: 'black',
                border: '1px solid #e8e9ff',
                backgroundColor: '#0000ff33',
                "&:hover": {
                    border: '1px solid white',
                    color: 'black',
                    backgroundColor: 'white',
                    boxShadow: '5px 5px 0 0 lightgray'
                },
                "&:active": {
                    boxShadow: "12px 12px 2px 1px gray",
                    background: "white",
                    color: 'black'
                    }
                }}>
                <Navigation 
                    to={continuePath}
                    text="Continue"
                    click={onContinueClick}
                />
                <ArrowRightIcon fontSize="large" color='white' />
            </Button>
        </div>
    )
}

export default ReturnAndContinue;