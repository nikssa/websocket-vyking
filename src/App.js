import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import WebSocketService from "./websocket";
import Header from "./components/Header";

function App() {
    const dispatch = useDispatch();
    const websocketInstance = WebSocketService.getInstance(dispatch);
    const { isConnected, messages } = useSelector(state => state.websocket);

    useEffect(() => {
        websocketInstance.connect('wss://demo.vyking.com/ws');

        return () => {
            websocketInstance.disconnect();
        };
    }, [dispatch, websocketInstance]);

  return (
      <div className="App">
        <Header />
        <main>
          {/* Embed the WebSocket Component */}
        </main>
      </div>
  );
}

export default App;
