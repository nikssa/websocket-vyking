import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import md5 from 'md5';
import WebSocketService from './websocket';
import Header from './components/Header';
import LoginModal from './components/LoginModal';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import Payout from './components/Payout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.scss';

function App() {
  // const { user, error } = useSelector((state) => state.websocket);
  const { error } = useSelector((state) => state.websocket);

  const dispatch = useDispatch();
  const websocketInstance = WebSocketService.getInstance(dispatch);

  useEffect(() => {
    websocketInstance.connect('wss://demo.vyking.com/ws');

    return () => {
      websocketInstance.disconnect();
    };
  }, [dispatch, websocketInstance]);

  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
    setIsLogin(true);
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();

    setIsLogin(false);
    setIsOpen(true);
  };

  const handleLogin = (username, password) => {
    console.log('handleLogin username: ', username, ',password: ', password);
    websocketInstance.sendMessage({
      event: '/ce/player/login',
      payload: {
        cUsername: username, // 'vyking.test'
        cPassword: md5(password) // md5('test1234') => '16d7a4fca7442dda3ad93c9a726597e4'
      }
    });
    setIsOpen(false);
  };

  const handleLogout = () => {
    console.log('handleLogout');
    websocketInstance.sendMessage({
      event: '/ce/player/logout',
      payload: []
    });
  };

  const handleForgotPassword = (email) => {
    console.log('handleForgotPassword email: ', email);
    websocketInstance.sendMessage({
      event: '/ce/player/pwdResetByEmailRequest',
      payload: {
        cEmail: email,
        cLink: 'https://demo.vyking.com'
      }
    });
    setIsOpen(false);
  };

  useEffect(() => {
    const toastConfiguration = {
      position: 'top-right',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      type: 'error'
      // transition: Slide
    };
    toast(error?.payload?.message, toastConfiguration);
  }, [error]);

  const readyState = websocketInstance.socketRef?.readyState;

  useEffect(() => {
    // const isUser = !!user;
    // if (isUser) {
    // console.log('isUser', isUser);
    if (readyState === WebSocket.OPEN) {
      websocketInstance.sendMessage({
        event: '/ce/payment/withdraw/bigSub',
        payload: []
      });
    }
  }, [readyState, websocketInstance]);

  return (
    <div className='App'>
      <ToastContainer />
      <div className={`modal-wrapper ${isOpen ? 'open' : ''}`}>
        {isLogin ? (
          <LoginModal
            onClick={handleClick}
            onForgotPasswordClick={handleForgotPasswordClick}
            handleLogin={handleLogin}
          />
        ) : (
          <ForgotPasswordModal
            onClick={handleClick}
            handleForgotPassword={handleForgotPassword}
          />
        )}
      </div>

      <Header onClick={handleClick} handleLogout={handleLogout} />
      <main>
        <Payout />
      </main>
    </div>
  );
}

export default App;
