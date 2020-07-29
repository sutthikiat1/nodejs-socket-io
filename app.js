const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 7070

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
    socket.on('username', (username) => {
        socket.username = username
        io.sockets.emit('is_online',socket.username)
    })

    socket.on('disconnect', () => {
        if (socket.username) {
            io.sockets.emit('is_offline',socket.username)
        }
    })
    
    socket.on('sent',message=>{
        io.sockets.emit('new-message',message)
    })

})

server.listen(port, () => console.log(`Listening on port ${port}`))