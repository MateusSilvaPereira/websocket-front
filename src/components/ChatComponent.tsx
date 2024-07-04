import React, { useEffect, useState } from "react";
import WebSocketService from "../service/WebSocketService";

interface ChatComponentProps {
  webSocketService: WebSocketService;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ webSocketService }) => {
  const [messageInput, setMessageInput] = useState<string>("");

  useEffect(() => {
    webSocketService
      .connect()
      .then(() => {
        webSocketService.subscribe("/topic/messages", (message: any) => {
          console.log("Received message:", message.body);
          // Handle received messages
        });
      })
      .catch((error) => {
        console.error("WebSocket connection error:", error);
      });

    return () => {
      webSocketService.disconnect();
    };
  }, [webSocketService]);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      webSocketService.sendMessage("/app/enviarMensage", {
        content: messageInput,
      });
      setMessageInput(""); // Limpa o campo de entrada após enviar a mensagem
    } else {
      console.warn("Message is empty.");
    }
  };

  return (
    <div>
      <div className="message-input-container">
        <input
          type="text"
          className="message-input"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button className="send-button" onClick={sendMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
