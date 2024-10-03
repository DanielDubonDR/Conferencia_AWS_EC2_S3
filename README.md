# 🧑‍💻 Conferencia_AWS_EC2_S3

- [🧑‍💻 Conferencia\_AWS\_EC2\_S3](#-conferencia_aws_ec2_s3)
  - [📚 Descripción](#-descripción)
  - [📝 Requisitos](#-requisitos)
  - [📦 Instalación](#-instalación)
  - [📝 EndPoints](#-endpoints)

## 📚 Descripción

Este repositorio contiene el código fuente y la presentación de la conferencia de AWS EC2 y S3, en la cual se muestra como desplegar una aplicación en un servidor EC2 y como almacenar archivos y desplegar una web estática en un bucket de S3.

## 📝 Requisitos

- ***Golang***
  - [Descargar Go](https://go.dev/doc/install)
- ***Visual Studio Code***
  - [Descargar Visual Studio Code](https://code.visualstudio.com/)
  - [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)
- ***NVM (Node Version Manager)***
  - [Instalación de NVM](https://github.com/nvm-sh/nvm)
- ***Postman***
  - [Descargar Postman](https://www.postman.com/downloads/)

## 📦 Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/DanielDubonDR/Conferencia_AWS_EC2_S3.git
```

1. Ubicarse en la carpeta Backend

2. Instalar las dependencias

```bash
go mod tidy
```

4. Ejecutar el backend

```bash
go run main.go
```

5. Ubicarse en la carpeta Frontend
6. Instalar las dependencias del frontend

```bash
npm install
```
7. Ejecutar el frontend con host

```bash
npm run dev -- --host
```
8. No olvidar configurar las ips públicas

## 📝 EndPoints

El backend se estara ejecutando en el puerto 3000, por lo que los endpoints seran:

| Método | EndPoint | Descripción |
| --- | --- | --- |
| `GET` | /ping | Endpoint de prueba |
| `GET` | /ws | Endpoint para conectarse al WebSocket |