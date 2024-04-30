export const websocketConnect = () => ({ type: 'WEBSOCKET_CONNECT' });
export const websocketDisconnect = () => ({ type: 'WEBSOCKET_DISCONNECT' });
export const websocketMessage = message => ({ type: 'WEBSOCKET_MESSAGE', payload: message });
