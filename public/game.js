import playerFunction from './player.js'
import monsterFunction from './monster.js'

export default function createGame() {

    const global = {
        fixedSizeX: 60,
        fixedSizeY: 60,
        quanX: 15,
        quanY: 9
    }

    const state = {
        players: {
            // 'player1': { x: 0, y: 0, name: "Gabriel", maxLife: 100, currentLife: 20 },
            // 'player2': { x: 60, y: 60, name: "Visitante", maxLife: 100, currentLife: 100 },
        },
        monsters: {
            // 'monster1': { x: -120, y: -120, maxLife: 100, currentLife: 80 }
        },
        tilesLayer1: {
            'tile1': { x: 180, y: 0 }
        },
        tilesLayer2: {
            'tile2': { x: 180, y: 60 }
        },
        tilesLayer3: {
            'tile3': { x: 180, y: 120 }
        },
        tilesLayer4: {
            'tile4': { x: 180, y: 180 }
        }
    }

    const observers = []

    function startGame() {
        const monsterFunc = monsterFunction(state, notifyMonster)

        monsterFunc.attibutes.id = "Monster1"
        monsterFunc.attibutes.x = 0
        monsterFunc.attibutes.y = 60
        monsterFunc.attibutes.name = "Monster1"
        monsterFunc.attibutes.maxLife = 100
        monsterFunc.attibutes.currentLife = 100

        addMonster(monsterFunc.attibutes)

        monsterFunc.startMonster()
    }

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        console.log(`Notifing game ${observers.length} observers`)

        for (const observerFunction of observers) {
            observerFunction(command)
        }
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    function createPlayer(command) {
        const playerFunc = playerFunction(state, global, notifyPlayer)

        playerFunc.attibutes.id = command.id
        playerFunc.attibutes.x = command.x
        playerFunc.attibutes.y = command.y
        playerFunc.attibutes.name = command.name
        playerFunc.attibutes.maxLife = command.maxLife
        playerFunc.attibutes.currentLife = command.currentLife

        playerFunc.startPlayer()

        addPlayer(playerFunc.attibutes)
    }

    function healPlayer(command) {

    }

    function addPlayer(command) {
        state.players[command.id] = {
            x: command.x,
            y: command.y,
            name: command.name,
            maxLife: command.maxLife,
            currentLife: command.currentLife
        }

        notifyAll({
            type: 'add-player',
            id: command.id,
            x: command.x,
            y: command.y
        })
    }

    function removePlayer(command) {
        delete state.players[command.id]

        notifyAll({
            type: 'remove-player',
            id: command.id
        })
    }

    function movePlayer(command) {
        notifyAll(command)

        const playerFunc = playerFunction(state, global)

        playerFunc.movePlayer(command)
    }

    function addMonster(command) {
        state.monsters[command.id] = {
            x: command.x,
            y: command.y,
            name: command.name,
            maxLife: command.maxLife,
            currentLife: command.currentLife
        }

        notifyAll({
            type: 'add-monster',
            id: command.id,
            x: command.x,
            y: command.y
        })
    }

    function removeMonster(command) {
        delete state.monsters[command.id]

        notifyAll({
            type: 'remove-monster',
            id: command.id
        })
    }

    function moveMonster(command) {
        const monsterFunc = monsterFunction(state, global)

        monsterFunc.attibutes.x = command.x
        monsterFunc.attibutes.y = command.y

        monsterFunc.moveMonster(command)
    }

    function notifyMonster(command) {
        notifyAll(command)
    }

    function notifyPlayer(command) {
        notifyAll(command)
    }

    return {
        startGame,
        createPlayer,
        addPlayer,
        removePlayer,
        movePlayer,
        addMonster,
        removeMonster,
        moveMonster,
        state,
        global,
        setState,
        subscribe,
        healPlayer
    }
}