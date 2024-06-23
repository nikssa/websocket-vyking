import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import md5 from 'md5';
import WebSocketService from './websocket';
import Header from './components/Header';
import LoginModal from './components/LoginModal';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import './App.scss';

function App() {
  const { messages } = useSelector((state) => state.websocket);
  console.log('messages', messages);
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
  const [isUser, setIsUser] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
    setIsLogin(true);
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    console.log('handleForgotPasswordClick');
    setIsLogin(false);
    setIsOpen(true);
  };

  const handleFakeLogin = (e) => {
    e.preventDefault();
    console.log('Fake login');

    websocketInstance.sendMessage({
      event: '/ce/player/login',
      payload: {
        cUsername: 'vyking.test',
        cPassword: md5('test123') // '16d7a4fca7442dda3ad93c9a726597e4'
      }
    });
  };

  const requestData = () => {
    console.log('Fake request data after login');
    websocketInstance.sendMessage({
      event: '/ce/payment/withdraw/bigSub',
      payload: []
    });
  };

  const handleLogout = () => {
    console.log('handleLogout');
  };

  return (
    <div className='App'>
      <div className='modal-wrapper'></div>
      <Header
        isUser={isUser}
        onClick={handleClick}
        handleLogout={handleLogout}
      />

      {isLogin ? (
        <LoginModal
          isOpen={isOpen}
          onClick={handleClick}
          onForgotPasswordClick={handleForgotPasswordClick}
        />
      ) : (
        <ForgotPasswordModal isOpen={isOpen} onClick={handleClick} />
      )}

      <button onClick={handleFakeLogin}>Fake login</button>
      <button onClick={requestData}>Fake request data after login</button>

      {/* <main>
        <h1>Messages</h1>
        {!!messages && messages.length > 0 && (
          <ul className='messages'>
            {messages.map((message, index) => {
              const messageString = JSON.stringify(message);
              return (
                <li
                  style={{ wordWrap: 'break-word' }}
                  key={`${messageString}-${index}`}>
                  {messageString}
                </li>
              );
            })}
          </ul>
        )}
      </main> */}
    </div>
  );
}

export default App;
