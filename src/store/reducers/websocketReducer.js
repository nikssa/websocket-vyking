const initialState = {
  user: null,
  isConnected: false,
  messages: [],
  payouts: [],
  error: null,
  isOpen: false
};

export default function websocketReducer(state = initialState, action) {
  switch (action.type) {
    case 'WEBSOCKET_CONNECT':
      return { ...state, isConnected: true };
    case 'WEBSOCKET_DISCONNECT':
      return { ...state, isConnected: false };
    case 'WEBSOCKET_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'WEBSOCKET_ERROR':
      return { ...state, error: action.payload };
    case 'WEBSOCKET_CLEAR_ERROR':
      return { ...state, error: null };
    case 'MODAL_IS_OPEN':
      return { ...state, isOpen: action.payload };
    case 'WEBSOCKET_LOGIN':
      return {
        ...state,
        user: action.payload
      };
    case 'WEBSOCKET_LOGOUT':
      return { ...state, user: null };
    case 'WEBSOCKET_PAYOUTS':
      return { ...state, payouts: action.payload };
    default:
      return state;
  }
}
