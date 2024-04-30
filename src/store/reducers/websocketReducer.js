const initialState = {
    isConnected: false,
    messages: [],
    error: null
};

export default function websocketReducer(state = initialState, action) {
    switch (action.type) {
        case 'WEBSOCKET_CONNECT':
            return { ...state, isConnected: true };
        case 'WEBSOCKET_DISCONNECT':
            return { ...state, isConnected: false };
        case 'WEBSOCKET_MESSAGE':
            return { ...state, messages: [...state.messages, action.payload] };
        default:
            return state;
    }
}
