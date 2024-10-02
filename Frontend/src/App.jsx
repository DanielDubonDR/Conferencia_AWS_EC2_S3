import React, { useState, useEffect } from 'react';

function App() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = new WebSocket('ws://192.168.192.129:3000/ws');

    newSocket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const sendMessage = () => {
    if (message && username) {
      const msg = {
        username,
        content: message,
      };
      socket.send(JSON.stringify(msg));
      setMessage('');
    }
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    setIsConnected(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {!isConnected ? (
        <form onSubmit={handleUsernameSubmit} className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ingresa tu nombre</h2>
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Ingresar
          </button>
        </form>
      ) : (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <div className="h-64 overflow-y-scroll mb-4 bg-gray-200 p-4 rounded">
            {messages.map((msg, index) => (
              <p key={index} className="mb-2">
                <strong>{msg.username}:</strong> {msg.content}
              </p>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Escribe tu mensaje"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-grow p-2 border border-gray-300 rounded-l"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition duration-300"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
