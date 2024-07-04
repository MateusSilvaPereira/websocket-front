import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class WebSocketService {
  private stompClient: any;

  connect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const socket = new SockJS("http://localhost:8080/ws");
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect(
        {},
        () => {
          console.log("Connected to WebSocket");
          resolve(); // Resolve without any value
        },
        (error: any) => {
          console.error("Connection error:", error);
          reject(error);
        }
      );
    });
  }

  subscribe(topic: string, callback: (message: any) => void): void {
    if (this.stompClient) {
      this.stompClient.subscribe(topic, (message: any) => {
        console.log("Received message:", message.body);
        callback(message);
      });
    } else {
      console.error("STOMP client not initialized.");
    }
  }

  sendMessage(destination: string, message: any): void {
    if (this.stompClient) {
      this.stompClient.send(destination, {}, JSON.stringify(message));
    } else {
      console.warn("STOMP client not initialized.");
    }
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.disconnect();
      console.log("Disconnected from WebSocket");
    }
  }
}

export default WebSocketService;
