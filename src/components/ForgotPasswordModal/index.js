import { useState } from 'react';
import PasswordRecovery from '../../assets/password-recovery.svg';
import './style.scss';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email format.';
  }
  return '';
};

function ForgotPasswordModal({ onClick, handleForgotPassword }) {
  //
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const isDisabled = emailError === null || emailError;

  const handleChange = (e) => {
    const { value: email } = e.target;
    setEmail(email);
    setEmailError(validateEmail(email));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleForgotPassword(email);
  };

  return (
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
            onChange={handleChange}
          />
        </div>

        {!!emailError && <span className='error-message'>{emailError}</span>}

        <button
          type='submit'
          title={isDisabled ? 'Form data is not valid' : 'Send'}
          disabled={isDisabled ? 'disabled' : ''}>
          Send
        </button>
      </form>
    </div>
  );
}

export default ForgotPasswordModal;
