import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [username] = useState(uuidv4()); // Genera un nombre de usuario único
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket("ws://192.168.192.129:3000/ws");

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    return () => {
      socket.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() !== "") {
      const message = {
        username: username,
        content: input,
      };
      socket.current.send(JSON.stringify(message));
      setInput("");
    }
  };

  return (
    <div className="App">
      <h1>Chat en Tiempo Real</h1>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}</strong>: {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}

export default App;