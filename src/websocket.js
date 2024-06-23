import {
  websocketClearError,
  websocketConnect,
  websocketDisconnect,
  websocketError,
  websocketLogin,
  websocketLogout,
  websocketMessage,
  websocketPayouts
} from './store/actions/websocketActions';

import store from './store/store';

class WebSocketService {
  static instance = null;

  static getInstance(dispatch) {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService(dispatch);
    }
    return WebSocketService.instance;
  }

  constructor(dispatch) {
    this.socketRef = null;
    this.dispatch = dispatch;
  }

  connect(url) {
    this.socketRef = new WebSocket(url);

    this.socketRef.onopen = () => {
      console.log('WebSocket open');
      this.dispatch(websocketConnect());
      this.sendMessage({
        event: '/ce/connection/init3',
        payload: {
          language_alpha2: 'en',
          language_browser_alpha2: 'en'
        }
      });
    };

    this.socketRef.onerror = (e) => {
      console.log('WebSocket error', e);
    };

    this.socketRef.onmessage = (e) => {
      this.handleMessage(e.data);
    };

    this.socketRef.onclose = () => {
      console.log('WebSocket closed');
      this.dispatch(websocketDisconnect());
    };
  }

  sendMessage(data) {
    if (this.socketRef && this.socketRef.readyState === WebSocket.OPEN) {
      this.socketRef.send(JSON.stringify(data));
    }
  }

  handleMessage(data) {
    const error = store.getState().websocket.error;

    const parsedData = JSON.parse(data);
    // console.log('handleMessage', parsedData);

    if (parsedData.event === '/se/player/login' && parsedData.status === 200) {
      this.dispatch(websocketLogin(parsedData));
    }
    if (parsedData.event === '/se/player/logout' && parsedData.status === 200) {
      this.dispatch(websocketLogout());
    }
    if (parsedData.status !== 200) {
      this.dispatch(websocketError(parsedData));
    }
    if (parsedData.status === 200 && !!error) {
      this.dispatch(websocketClearError());
    }
    if (
      parsedData.event === '/se/payment/withdraw/bigSub' &&
      parsedData.status === 200
    ) {
      this.dispatch(websocketPayouts(parsedData));
    }

    this.dispatch(websocketMessage(parsedData));
  }

  disconnect() {
    if (this.socketRef) {
      this.socketRef.close();
    }
  }
}

export default WebSocketService;
