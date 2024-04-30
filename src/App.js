import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import './App.scss';
import WebSocketService from "./websocket";
import Header from "./components/Header";

function App() {
    const dispatch = useDispatch();
    const websocketInstance = WebSocketService.getInstance(dispatch);

    useEffect(() => {
        websocketInstance.connect('wss://demo.vyking.com/ws');

        return () => {
            websocketInstance.disconnect();
        };
    }, [dispatch, websocketInstance]);

  return (
      <div className="App">
        <Header />
      </div>
  );
}

export default App;
