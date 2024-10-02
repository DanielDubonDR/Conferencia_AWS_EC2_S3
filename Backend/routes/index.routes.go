package routes

import (
	"paquetes/controllers"
	"github.com/gorilla/mux"
)

func IndexRoutes(r *mux.Router) {
	r.HandleFunc("/ping", controllers.Hello).Methods("GET")
	
}