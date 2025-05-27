const { Server } = require('socket.io')

let io

module.exports = {
  init: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST']
      }
    })

    io.on('connection', (socket) => {
      console.log('Cliente conectado:', socket.id)

      socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id)
      })
    })

    return io
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!')
    }
    return io
  }
} 