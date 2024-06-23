import { useEffect, useState } from 'react';
import Logo from '../../assets/logo.svg';
import { ReactComponent as Eye } from '../../assets/eye.svg';
import { ReactComponent as EyeCrossed } from '../../assets/eye-with-line.svg';
import './style.scss';

const validateUsername = (username) => {
  if (username.length < 4) {
    return 'Username must be at least 4 characters long.';
  }
  return '';
};
const validatePassword = (password) => {
  if (password.length < 4 || password.length > 16) {
    return 'Password must be 4 to 16 characters long.';
  }
  return '';
};

function LoginModal({ onClick, onForgotPasswordClick, handleLogin }) {
  //
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (usernameError !== null && passwordError !== null) {
      const isDisabled = !!usernameError || !!passwordError;
      console.log('isDisabled', isDisabled);
      setIsDisabled(isDisabled);
    }
  }, [usernameError, passwordError]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'username') {
      setUsernameError(validateUsername(value));
    } else if (name === 'password') {
      setPasswordError(validatePassword(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;
    handleLogin(username, password);
    // setFormData({ username: '', password: '' });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Redirect to register page');
  };

  return (
    <div className='modal login'>
      <div className='close'>
        <button onClick={onClick} className='close-button'>
          X
        </button>
      </div>
      <div className='logo'>
        <img src={Logo} alt='Vyking logo' />
      </div>
      <form onSubmit={handleSubmit}>
        {usernameError && (
          <span className='error-message'>{usernameError}</span>
        )}
        <div className='username'>
          <label htmlFor='username'>Username or Email *</label>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='Enter here'
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        {passwordError && (
          <span className='error-message'>{passwordError}</span>
        )}
        <div className='password'>
          <div className='field'>
            <label htmlFor='password'>Password *</label>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              name='password'
              id='password'
              placeholder='Enter here'
              value={formData.password}
              onChange={handleChange}
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
          <a href='/' onClick={handleRegister}>
            Join now
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
