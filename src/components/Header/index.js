import React from 'react';
import Logo from '../../assets/logo.svg';
import './style.scss';
import Button from '../Button';

function Header({ isUser, onClick, handleLogout }) {
  return (
    <header className='Header'>
      <img src={Logo} alt='logo' />
      {isUser ? (
        <Button text='Logout' onClick={handleLogout} />
      ) : (
        <Button text='Login' onClick={onClick} />
      )}
    </header>
  );
}

export default Header;
