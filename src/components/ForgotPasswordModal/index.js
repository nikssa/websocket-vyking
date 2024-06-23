import React, { useEffect, useState } from 'react';
import PasswordRecovery from '../../assets/password-recovery.svg';
import './style.scss';

function ForgotPasswordModal({ isOpen, onClick }) {
  //
  const [email, setEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    const isDisabled = !isEmailValid;
    setIsDisabled(isDisabled);
  }, [isEmailValid]);

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);

    if (email.length > 0) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit forgot password');
  };

  return (
    <div className={`modal-wrapper ${isOpen ? 'open' : ''}`}>
      <div className='modal forgot-password'>
        <div className='close'>
          <button onClick={onClick} className='close-button'>
            X
          </button>
        </div>
        <div className='svg'>
          <img src={PasswordRecovery} alt='Password recovery' />
        </div>
        <h2>Password recovery</h2>
        <p className='description'>
          Please enter email address connected to your Vyking account to reset
          password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className='email'>
            <label htmlFor='email'>Email *</label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Enter here'
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <button
            type='submit'
            title={isDisabled ? 'Form data is not valid' : 'Send'}
            disabled={isDisabled ? 'disabled' : ''}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
