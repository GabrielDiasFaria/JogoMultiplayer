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
        addMonster({ id: "moster1", x: 60, y: 0, name: "Monstro 1", maxLife: 100, currentLife: 20 })
        const monsterFunc = monsterFunction(state, notifyMonster)
        monsterFunc.startMonster("moster1")
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

    function addPlayer(command) {
        state.players[command.id] = {
            x: command.x,
            y: command.y
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
            y: command.y
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

        monsterFunc.moveMonster(command)
    }

    function notifyMonster(command) {
        notifyAll(command)
    }

    return {
        startGame,
        addPlayer,
        removePlayer,
        movePlayer,
        addMonster,
        removeMonster,
        moveMonster,
        state,
        global,
        setState,
        subscribe
    }
}