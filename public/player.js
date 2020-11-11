export default function playerFunction(state, global) {

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
        movePlayer
    }
}