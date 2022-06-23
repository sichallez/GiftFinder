import React from 'react';
import Navigation from './Navigation';
import { Button } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const ReturnAndContinue = (props) => {
    const { returnPath, continuePath, onContinueClick } = props;
    return (
        <div className='return-div'>
            <Button variant="outlined" sx={{ fontSize: '20px', textTransform: 'none', padding: '.5rem 1.25rem .5rem .5rem', color: 'black'}}>
                <ArrowLeftIcon fontSize="large" color='secondary' />
                <Navigation 
                    to={returnPath} 
                    text="Return" 
                />
            </Button>
            <Button variant="outlined" sx={{ fontSize: '20px', textTransform: 'none', padding: '.5rem .5rem .5rem 1.25rem', color: 'black'}}>
                <Navigation 
                    to={continuePath}
                    text="Continue"
                    click={onContinueClick}
                />
                <ArrowRightIcon fontSize="large" color='secondary' />
            </Button>
        </div>
    )
}

export default ReturnAndContinue;