import React from 'react';
import Logo from '../../assets/logo.svg';
import './style.scss';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { websocketLogout } from '../../store/actions/websocketActions';

function Header({ onClick }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.websocket.user);
  const { payload: userData } = user !== null ? user : { payload: null };
  const isUser = !!userData;
  console.log('isUser', isUser);

  const handleLogout = () => {
    console.log('handleLogout');
    dispatch(websocketLogout());
  };
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
