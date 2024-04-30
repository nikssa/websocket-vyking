import { combineReducers } from 'redux';
import websocketReducer from "./websocketReducer";

export default combineReducers({
    websocket: websocketReducer,
});
