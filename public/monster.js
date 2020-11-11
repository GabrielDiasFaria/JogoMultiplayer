export default function monsterFunction(state, notifyMonster) {

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

    function startMonster() {
        const interval = 3000

        setInterval(() => {
            searchForNextPlayer()
        }, interval);
    }

    function searchForNextPlayer() {

        let nextPlayerDistance = 999
        let nextPlayer = 0

        for (const playerId in state.players) {
            const player = state.players[playerId]
            const playerDistance = Math.sqrt((player.x - attibutes.x) * (player.x - attibutes.x) + (player.y - attibutes.y) * (player.y - attibutes.y))

            if (playerDistance < nextPlayerDistance) {
                nextPlayer = playerId
                nextPlayerDistance = playerDistance
            }
        }

        // console.log(`Next Player: ${nextPlayer}, Distance: ${nextPlayerDistance}`)
        // console.log(`Monster X: ${attibutes.x}, Player X: ${attibutes.y}`)

        if (nextPlayerDistance <= attibutes.nextPlayerDistanceToAttack) {
            const player = state.players[nextPlayer]

            if (attibutes.x < player.x)
                moveMonster({ type: "move-monster", monster: attibutes.id, keyPressed: "ArrowRight" })
            else if (attibutes.x > player.x) {
                moveMonster({ type: "move-monster", monster: attibutes.id, keyPressed: "ArrowLeft" })
            } else if (attibutes.y > player.y) {
                moveMonster({ type: "move-monster", monster: attibutes.id, keyPressed: "ArrowUp" })
            } else if (attibutes.y < player.y) {
                moveMonster({ type: "move-monster", monster: attibutes.id, keyPressed: "ArrowDown" })
            }
        } else {
            const random = Math.floor(Math.random() * 4);

            if (random == 0)
                moveMonster({ type: "move-monster", monster: attibutes.id, keyPressed: "ArrowUp" })
            else if (random == 1)
                moveMonster({ type: "move-monster", monster: attibutes.id, keyPressed: "ArrowDown" })
            else if (random == 2)
                moveMonster({ type: "move-monster", monster: attibutes.id, keyPressed: "ArrowLeft" })
            else if (random == 3)
                moveMonster({ type: "move-monster", monster: attibutes.id, keyPressed: "ArrowRight" })
        }
    }

    function moveMonster(command) {
        const acceptedMoves = {
            ArrowUp(monster) {
                monster.y -= attibutes.speed
            },
            ArrowDown(monster) {
                monster.y += attibutes.speed
            },
            ArrowLeft(monster) {
                monster.x -= attibutes.speed
            },
            ArrowRight(monster) {
                monster.x += attibutes.speed
            }
        }

        const monster = state.monsters[command.monster]
        const moveFunction = acceptedMoves[command.keyPressed]

        if (monster && moveFunction && checkCollitionMonster({ id: command.monster, movement: command.keyPressed })) {
            moveFunction(monster)
            attibutes.x = monster.x
            attibutes.y = monster.y
            notifyMonster(command)
        }

    }

    function checkCollitionMonster(action) {
        const mainMonster = state.monsters[action.id]

        for (const id in state.players) {
            const player = state.players[id]
            if (id != action.id) {
                if (action.movement == 'ArrowUp' && mainMonster.y - attibutes.speed == player.y && mainMonster.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowDown' && mainMonster.y + attibutes.speed == player.y && mainMonster.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowLeft' && mainMonster.x - attibutes.speed == player.x && mainMonster.y == player.y) {
                    return false;
                } else if (action.movement == 'ArrowRight' && mainMonster.x + attibutes.speed == player.x && mainMonster.y == player.y) {
                    return false;
                }
            }
        }

        for (const id in state.monsters) {
            const player = state.monsters[id]
            if (id != action.id) {
                if (action.movement == 'ArrowUp' && mainMonster.y - attibutes.speed == player.y && mainMonster.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowDown' && mainMonster.y + attibutes.speed == player.y && mainMonster.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowLeft' && mainMonster.x - attibutes.speed == player.x && mainMonster.y == player.y) {
                    return false;
                } else if (action.movement == 'ArrowRight' && mainMonster.x + attibutes.speed == player.x && mainMonster.y == player.y) {
                    return false;
                }
            }
        }

        for (const id in state.tilesLayer3) {
            const player = state.tilesLayer3[id]
            if (id != action.id) {
                if (action.movement == 'ArrowUp' && mainMonster.y - attibutes.speed == player.y && mainMonster.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowDown' && mainMonster.y + attibutes.speed == player.y && mainMonster.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowLeft' && mainMonster.x - attibutes.speed == player.x && mainMonster.y == player.y) {
                    return false;
                } else if (action.movement == 'ArrowRight' && mainMonster.x + attibutes.speed == player.x && mainMonster.y == player.y) {
                    return false;
                }
            }
        }

        for (const id in state.tilesLayer4) {
            const player = state.tilesLayer4[id]
            if (id != action.id) {
                if (action.movement == 'ArrowUp' && mainMonster.y - attibutes.speed == player.y && mainMonster.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowDown' && mainMonster.y + attibutes.speed == player.y && mainMonster.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowLeft' && mainMonster.x - attibutes.speed == player.x && mainMonster.y == player.y) {
                    return false;
                } else if (action.movement == 'ArrowRight' && mainMonster.x + attibutes.speed == player.x && mainMonster.y == player.y) {
                    return false;
                }
            }
        }
        return true
    }


    return {
        attibutes,
        startMonster,
        moveMonster
    }
}