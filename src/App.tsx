import React from "react";
import "./App.css";
import ChatComponent from "./components/ChatComponent";
import WebSocketService from "./service/WebSocketService";
import img from "./img/socket.png";

const App: React.FC = () => {
  const webSocketService = new WebSocketService();

  return (
    <div className="App">
      <img className="img" src={img} alt="WebSocket" />
      <h1 className="title">Chat WebSocket</h1>
      <ChatComponent webSocketService={webSocketService} />
    </div>
  );
};

export default App;
