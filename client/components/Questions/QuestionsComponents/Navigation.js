import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
    //icon below to props
    const { text, to, color, width, click } = props;
    const hoverClass = color === 'var(--purple)' ? "purple-hover" : 'black-hover';

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