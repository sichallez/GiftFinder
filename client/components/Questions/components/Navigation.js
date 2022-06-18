import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
    //icon below to props
    const { text, to, click } = props;
    return (
        <div>
            <Link
                onClick={ click ? () => click() : () => {} }
                to={to}
            >
                {text}
            
            </Link>
        </div>
    )
}

export default Navigation