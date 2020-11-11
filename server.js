// const express = require('express')
// const http = require('http')
// const createGame = require('./public/game')
// const socketio = require('socket.io')

import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import playerFunction from './public/player.js'

import { Server } from "socket.io"

const app = express()
const server = http.createServer(app)
const sockets = new Server(server)

app.use(express.static('public'))

const game = createGame()

game.subscribe((command) => {
    console.log(`======> Emitting ${command.type}`)
    sockets.emit(command.type, command)
})

game.startGame()

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`=> Player connected on Server with id: ${playerId}`)

    game.createPlayer({ id: playerId, x: 0, y: 0, name: `Jogador`, maxLife: 100, currentLife: 20 })

    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePlayer({ id: playerId })
        console.log(`=> Player disconnected on Server with id: ${playerId}`)
    })

    socket.on('move-player', (command) => {
        console.log(`Receiving move-player event to server`)
        command.player = playerId
        command.type = 'move-player'
        game.movePlayer(command)
    })
})

server.listen(3000, () => {
    console.log('==> Server listening on port: 3000')
})