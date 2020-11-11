export default function playerFunction(state, global, notifyPlayer) {

    const attibutes = {
        id: 0,
        speed: 60,
        name: null,
        maxLife: 0,
        currentLife: 0,
        x: 0,
        y: 0,
        nextPlayerDistanceToAttack: 60 * 4
    }

    function startPlayer() {
        const interval = 1000

        setInterval(() => {
            healPlayer(10)
        }, interval);
    }

    function healPlayer(value) {
        const player = state.players[attibutes.id]
        if (value + attibutes.currentLife < attibutes.maxLife) {
            player.currentLife += value
            attibutes.currentLife += value
            notifyPlayer({ type: "heal-player", player: attibutes.id, valueAdd: value })
        }
    }

    function movePlayer(command) {
        const acceptedMoves = {
            ArrowUp(player) {
                player.y -= global.fixedSizeY
            },
            ArrowDown(player) {
                player.y += global.fixedSizeY
            },
            ArrowLeft(player) {
                player.x -= global.fixedSizeX
            },
            ArrowRight(player) {
                player.x += global.fixedSizeX
            }
        }

        const player = state.players[command.player]
        const moveFunction = acceptedMoves[command.keyPressed]

        if (player && moveFunction && checkCollitionPlayer({ id: command.player, movement: command.keyPressed }))
            moveFunction(player)
    }

    function checkCollitionPlayer(action) {
        const mainPlayer = state.players[action.id]

        for (const id in state.players) {
            const player = state.players[id]
            if (id != action.id) {
                if (action.movement == 'ArrowUp' && mainPlayer.y - global.fixedSizeY == player.y && mainPlayer.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowDown' && mainPlayer.y + global.fixedSizeY == player.y && mainPlayer.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowLeft' && mainPlayer.x - global.fixedSizeX == player.x && mainPlayer.y == player.y) {
                    return false;
                } else if (action.movement == 'ArrowRight' && mainPlayer.x + global.fixedSizeX == player.x && mainPlayer.y == player.y) {
                    return false;
                }
            }
        }

        for (const id in state.monsters) {
            const player = state.monsters[id]
            if (id != action.id) {
                if (action.movement == 'ArrowUp' && mainPlayer.y - global.fixedSizeY == player.y && mainPlayer.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowDown' && mainPlayer.y + global.fixedSizeY == player.y && mainPlayer.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowLeft' && mainPlayer.x - global.fixedSizeX == player.x && mainPlayer.y == player.y) {
                    return false;
                } else if (action.movement == 'ArrowRight' && mainPlayer.x + global.fixedSizeX == player.x && mainPlayer.y == player.y) {
                    return false;
                }
            }
        }

        for (const id in state.tilesLayer3) {
            const player = state.tilesLayer3[id]
            if (id != action.id) {
                if (action.movement == 'ArrowUp' && mainPlayer.y - global.fixedSizeY == player.y && mainPlayer.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowDown' && mainPlayer.y + global.fixedSizeY == player.y && mainPlayer.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowLeft' && mainPlayer.x - global.fixedSizeX == player.x && mainPlayer.y == player.y) {
                    return false;
                } else if (action.movement == 'ArrowRight' && mainPlayer.x + global.fixedSizeX == player.x && mainPlayer.y == player.y) {
                    return false;
                }
            }
        }

        for (const id in state.tilesLayer4) {
            const player = state.tilesLayer4[id]
            if (id != action.id) {
                if (action.movement == 'ArrowUp' && mainPlayer.y - global.fixedSizeY == player.y && mainPlayer.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowDown' && mainPlayer.y + global.fixedSizeY == player.y && mainPlayer.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowLeft' && mainPlayer.x - global.fixedSizeX == player.x && mainPlayer.y == player.y) {
                    return false;
                } else if (action.movement == 'ArrowRight' && mainPlayer.x + global.fixedSizeX == player.x && mainPlayer.y == player.y) {
                    return false;
                }
            }
        }
        return true
    }


    return {
        attibutes,
        movePlayer,
        startPlayer
    }
}