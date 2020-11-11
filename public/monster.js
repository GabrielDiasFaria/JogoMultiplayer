export default function monsterFunction(state, notifyMonster) {

    const speed = 60

    function startMonster(monster) {
        const interval = 3000

        setInterval(() => {
            searchForNextPlayer(monster)
        }, interval);
    }

    function searchForNextPlayer(monster) {

        const random = Math.floor(Math.random() * 4);

        if (random == 0)
            moveMonster({ type: "move-monster", monster: monster, keyPressed: "ArrowUp" })
        else if (random == 1)
            moveMonster({ type: "move-monster", monster: monster, keyPressed: "ArrowDown" })
        else if (random == 2)
            moveMonster({ type: "move-monster", monster: monster, keyPressed: "ArrowLeft" })
        else if (random == 3)
            moveMonster({ type: "move-monster", monster: monster, keyPressed: "ArrowRight" })
    }

    function moveMonster(command) {
        const acceptedMoves = {
            ArrowUp(monster) {
                monster.y -= speed
            },
            ArrowDown(monster) {
                monster.y += speed
            },
            ArrowLeft(monster) {
                monster.x -= speed
            },
            ArrowRight(monster) {
                monster.x += speed
            }
        }

        const monster = state.monsters[command.monster]
        const moveFunction = acceptedMoves[command.keyPressed]

        if (monster && moveFunction && checkCollitionMonster({ id: command.monster, movement: command.keyPressed })) {
            moveFunction(monster)
            notifyMonster(command)
        }

    }

    function checkCollitionMonster(action) {
        const mainMonster = state.monsters[action.id]

        for (const id in state.players) {
            const player = state.players[id]
            if (id != action.id) {
                if (action.movement == 'ArrowUp' && mainMonster.y - speed == player.y && mainMonster.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowDown' && mainMonster.y + speed == player.y && mainMonster.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowLeft' && mainMonster.x - speed == player.x && mainMonster.y == player.y) {
                    return false;
                } else if (action.movement == 'ArrowRight' && mainMonster.x + speed == player.x && mainMonster.y == player.y) {
                    return false;
                }
            }
        }

        for (const id in state.monsters) {
            const player = state.monsters[id]
            if (id != action.id) {
                if (action.movement == 'ArrowUp' && mainMonster.y - speed == player.y && mainMonster.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowDown' && mainMonster.y + speed == player.y && mainMonster.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowLeft' && mainMonster.x - speed == player.x && mainMonster.y == player.y) {
                    return false;
                } else if (action.movement == 'ArrowRight' && mainMonster.x + speed == player.x && mainMonster.y == player.y) {
                    return false;
                }
            }
        }

        for (const id in state.tilesLayer3) {
            const player = state.tilesLayer3[id]
            if (id != action.id) {
                if (action.movement == 'ArrowUp' && mainMonster.y - speed == player.y && mainMonster.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowDown' && mainMonster.y + speed == player.y && mainMonster.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowLeft' && mainMonster.x - speed == player.x && mainMonster.y == player.y) {
                    return false;
                } else if (action.movement == 'ArrowRight' && mainMonster.x + speed == player.x && mainMonster.y == player.y) {
                    return false;
                }
            }
        }

        for (const id in state.tilesLayer4) {
            const player = state.tilesLayer4[id]
            if (id != action.id) {
                if (action.movement == 'ArrowUp' && mainMonster.y - speed == player.y && mainMonster.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowDown' && mainMonster.y + speed == player.y && mainMonster.x == player.x) {
                    return false;
                } else if (action.movement == 'ArrowLeft' && mainMonster.x - speed == player.x && mainMonster.y == player.y) {
                    return false;
                } else if (action.movement == 'ArrowRight' && mainMonster.x + speed == player.x && mainMonster.y == player.y) {
                    return false;
                }
            }
        }
        return true
    }


    return {
        startMonster,
        moveMonster
    }
}