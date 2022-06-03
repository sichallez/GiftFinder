import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
    //icon below to props
    const { text, to, color, width, click } = this.props;
    const hoverClass = color === 'var(--purple)' ? "purple-hover" : 'black-hover';

    return (
        <div>
            <Link
                onClick={ click ? () => click() : () => {} }
                to={to}
                className={`${styles[hoverClass]}`}
                style={{ backgroundColor: color, width: width }}
            >
                {text}
            
            </Link>
        </div>
    )
}

export default Navigation