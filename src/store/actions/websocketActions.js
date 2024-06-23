export const websocketConnect = () => ({ type: 'WEBSOCKET_CONNECT' });
export const websocketDisconnect = () => ({ type: 'WEBSOCKET_DISCONNECT' });
export const websocketMessage = (message) => ({
  type: 'WEBSOCKET_MESSAGE',
  payload: message
});

export const websocketLogin = (message) => ({
  type: 'WEBSOCKET_LOGIN',
  payload: message
});

export const websocketLogout = () => ({ type: 'WEBSOCKET_LOGOUT' });

export const websocketError = (message) => ({
  type: 'WEBSOCKET_ERROR',
  payload: message
});

export const websocketClearError = () => ({ type: 'WEBSOCKET_CLEAR_ERROR' });
