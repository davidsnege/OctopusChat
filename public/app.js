const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configuración de rutas
app.use(express.static(__dirname + '/public'));

// Manejo de conexiones WebSocket
io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('message', (data) => {
        // Emitir mensaje a todos los clientes excepto al remitente
        socket.broadcast.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

// Configuración del servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
