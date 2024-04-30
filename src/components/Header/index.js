import React from 'react';
import Logo from '../../assets/logo.svg';
import './style.scss';
import Button from "../Button";

function Header() {
    return (
        <header className='Header'>
            <img src={Logo} alt='logo' />
            <Button text='Login'/>
        </header>
    )
}

export default Header
