package controllers

import (
	"fmt"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan Message)        
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var mutex = sync.Mutex{}

// Estructura de mensaje
type Message struct {
	Username string `json:"username"`
	Content  string `json:"content"`
}

func WebSocketHandler(w http.ResponseWriter, r *http.Request) {

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Error al actualizar a WebSocket:", err)
		return
	}
	defer ws.Close()

	
	mutex.Lock()
	clients[ws] = true
	mutex.Unlock()

	
	for {
		var msg Message
		err := ws.ReadJSON(&msg)
		if err != nil {
			// fmt.Println("Error al leer el mensaje:", err)
			delete(clients, ws)
			break
		}
		// Enviar el mensaje recibido a través del canal broadcast
		broadcast <- msg
	}
}

func HandleMessages() {
	for {
		// Escucha mensajes en el canal broadcast
		msg := <-broadcast

		// Enviar el mensaje a todos los clientes conectados
		mutex.Lock()
		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				fmt.Println("Error al enviar mensaje:", err)
				client.Close()
				delete(clients, client)
			}
		}
		mutex.Unlock()
	}
}