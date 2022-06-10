import React from 'react';
import { Link } from 'react-router-dom';

const Questions = () => {
    return (
        <div>
            <h1>Gifts Picked Just For You!</h1>
            <h3>Getting a gift for a coworker or someone close to you? Not sure what to get them?</h3>
            <h3>Well, you can get a personalized gift in just a few questions!</h3>
            <button>
                <Link to='/questions/budget'>Get Started</Link>
            </button>
        </div>

    )
}

export default Questions