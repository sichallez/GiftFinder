import React from 'react';
import Navigation from './Navigation';

const ReturnAndContinue = (props) => {
    const { returnPath, continuePath, onContinueClick } = props;
    return (
        <div>
            <Navigation to={returnPath} text="Return" color="var(--purple)" />
            <Navigation 
                to={continuePath}
                text="Continue"
                click={onContinueClick}
            />
        </div>
    )
}

export default ReturnAndContinue;