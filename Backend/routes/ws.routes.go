package routes

import (
	"paquetes/controllers"

	"github.com/gorilla/mux"
)

func WSRoutes(r *mux.Router) {
	r.HandleFunc("/ws", controllers.WebSocketHandler)
}