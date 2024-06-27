import React from 'react';
import Logo from '../../assets/logo.svg';
import Button from '../Button';
import { useSelector } from 'react-redux';
import './style.scss';

function Header({ onClick, handleLogout }) {
  const user = useSelector((state) => state.websocket.user);
  const isUser = !!user;

  return (
    <header className='Header'>
      <img src={Logo} alt='logo' />
      {isUser ? (
        <div className='user'>
          <span className='username'>{user.cUsername}</span>
          <Button text='Logout' onClick={handleLogout} />
        </div>
      ) : (
        <Button text='Login' onClick={onClick} />
      )}
    </header>
  );
}

export default Header;
