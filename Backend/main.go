package main

import (
	"fmt"
	"net/http"
	"paquetes/controllers"
	"paquetes/routes"

	"github.com/gorilla/mux"
	"github.com/jesseokeya/go-httplogger"
	"github.com/rs/cors"
)

func main() {

	// Middleware
	c := cors.New(cors.Options{
        AllowedOrigins: []string{"*"},
        AllowedMethods: []string{"GET", "POST"},
        AllowedHeaders: []string{"*"},
    })


	// Rutas
	r := mux.NewRouter()
	routes.IndexRoutes(r)
	routes.WSRoutes(r)

	// Manejo del websocket
	go controllers.HandleMessages()

	// Aplicar middleware a las rutas
	corsHandler := c.Handler(r)

	fmt.Println("Servidor corriendo en el puerto 3000")
	http.ListenAndServe(":3000", httplogger.Golog(corsHandler))
}