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
import { modalOpen } from './store/actions/websocketActions';
import './App.scss';

function App() {
  const [isLoginModal, setIsLoginModal] = useState(true);

  const reduxState = useSelector((state) => state.websocket);
  console.log(reduxState);

  const { isModalOpen, error } = useSelector((state) => state.websocket);
  const dispatch = useDispatch();
  const websocketInstance = WebSocketService.getInstance(dispatch);
  const readyState = websocketInstance.socketRef?.readyState;

  useEffect(() => {
    websocketInstance.connect('wss://demo.vyking.com/ws');
    return () => {
      websocketInstance.disconnect();
    };
  }, [websocketInstance]);

  const handleClick = () => {
    dispatch(modalOpen(!isModalOpen));
    !isLoginModal && setIsLoginModal(true);
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    !isModalOpen && dispatch(modalOpen(true));
    isLoginModal && setIsLoginModal(false);
  };

  const handleLogin = (username, password) => {
    websocketInstance.sendMessage({
      event: '/ce/player/login',
      payload: {
        cUsername: username, // 'vyking.test'
        cPassword: md5(password) // md5('test1234') => '16d7a4fca7442dda3ad93c9a726597e4'
      }
    });
  };

  const handleLogout = () => {
    websocketInstance.sendMessage({
      event: '/ce/player/logout',
      payload: []
    });
  };

  const handleForgotPassword = (email) => {
    websocketInstance.sendMessage({
      event: '/ce/player/pwdResetByEmailRequest',
      payload: {
        cEmail: email,
        cLink: 'https://demo.vyking.com'
      }
    });
  };

  useEffect(() => {
    if (readyState === WebSocket.OPEN) {
      websocketInstance.sendMessage({
        event: '/ce/payment/withdraw/bigSub',
        payload: []
      });
    }
  }, [readyState, websocketInstance]);

  useEffect(() => {
    toast.error(error?.payload?.message);
  }, [error]);

  return (
    <div className='App'>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme='colored'
      />

      {isModalOpen && (
        <div className='modal-wrapper'>
          {isLoginModal ? (
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
      )}

      <Header onClick={handleClick} handleLogout={handleLogout} />

      <main>
        <Payout />
      </main>
    </div>
  );
}

export default App;
