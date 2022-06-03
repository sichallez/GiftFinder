import React from 'react';
import Navgiation from './Navigation';

const ReturnAndContinue = (props) => {
    const { returnPath, continuePath, onContinueClick } = this.props;
    return (
        <div>
            <Navigation to={returnPath} text="Return" color="var(--purple)" />
            <Naviation 
                to={continuePath}
                text="Continue"
                click={onContinueClick}
            />
        </div>
    )
}

export default ReturnAndContinue;