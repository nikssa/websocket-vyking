import React, { useEffect, useState } from 'react';
import Logo from '../../assets/logo.svg';
import { ReactComponent as Eye } from '../../assets/eye.svg';
import { ReactComponent as EyeCrossed } from '../../assets/eye-with-line.svg';
import './style.scss';

function LoginModal({ isOpen, onClick, onForgotPasswordClick }) {
  //
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  useEffect(() => {
    const isDisabled = !(isUsernameValid && isPasswordValid);
    setIsDisabled(isDisabled);
  }, [isUsernameValid, isPasswordValid]);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const username = formData.get('username');
    const password = formData.get('password');
    console.log('Login', { username, password });
  };

  const handleJoin = (e) => {
    e.preventDefault();
    console.log('handleJoin');
  };

  const handleUsernameChange = (e) => {
    const username = e.target.value;
    setUsername(username);
    if (username.length > 0) {
      setIsUsernameValid(true);
    } else {
      setIsUsernameValid(false);
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (password.length > 0) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  return (
    <div className={`modal-wrapper ${isOpen ? 'open' : ''}`}>
      <div className='modal login'>
        <div className='close'>
          <button onClick={onClick} className='close-button'>
            X
          </button>
        </div>
        <div className='logo'>
          <img src={Logo} alt='Vyking logo' />
        </div>
        <form onSubmit={handleLoginSubmit}>
          <div className='username'>
            <label htmlFor='username'>Username or Email *</label>
            <input
              type='text'
              name='username'
              id='username'
              placeholder='Enter here'
              value={username}
              onChange={handleUsernameChange}
            />
          </div>

          <div className='password'>
            <div className='field'>
              <label htmlFor='password'>Password *</label>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                name='password'
                id='password'
                placeholder='Enter here'
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div
              className='eye-icon'
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? <EyeCrossed /> : <Eye />}
            </div>
          </div>

          <a href='/' onClick={onForgotPasswordClick}>
            Forgot Password?
          </a>

          <button
            type='submit'
            title={isDisabled ? 'Form data is not valid' : 'Login'}
            disabled={isDisabled ? 'disabled' : ''}>
            Login
          </button>
        </form>

        <div className='register'>
          <p>
            Don't have an account?{' '}
            <a href='/' onClick={handleJoin}>
              Join now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
