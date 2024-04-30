import React from 'react';
import './style.scss';

function Button({onClick, className, text}) {
    return <button onClick={onClick} className={`Button ${className || ''}`}>{text}</button>
}

export default Button