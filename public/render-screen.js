export default function renderScreen(screen, game, requestAnimationFrame, currentPlayer) {
    const context = screen.getContext('2d')

    context.fillStyle = 'white'
    context.clearRect(0, 0, screen.width, screen.height)

    for (const tileId in game.state.tilesLayer1) {
        const tile = game.state.tilesLayer1[tileId]
        context.fillStyle = 'lightgreen'

        context.fillRect(
            tile.x + game.global.fixedSizeX * (game.global.quanX / 2) - (game.global.fixedSizeX / 2) - currentPlayer.x,
            tile.y + game.global.fixedSizeY * (game.global.quanY / 2) - (game.global.fixedSizeY / 2) - currentPlayer.y,
            game.global.fixedSizeX,
            game.global.fixedSizeY
        )
    }

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]

        let newPositionX = 0
        let newPositionY = 0

        if (playerId == currentPlayer.id) {
            currentPlayer.x = player.x
            currentPlayer.y = player.y
            context.fillStyle = 'orange'

            newPositionX = game.global.fixedSizeX * (game.global.quanX / 2) - (game.global.fixedSizeX / 2)
            newPositionY = game.global.fixedSizeY * (game.global.quanY / 2) - (game.global.fixedSizeY / 2)

            context.fillRect(
                newPositionX,
                newPositionY,
                game.global.fixedSizeX,
                game.global.fixedSizeY
            )
        } else {
            context.fillStyle = 'blue'

            newPositionX = player.x + game.global.fixedSizeX * (game.global.quanX / 2) - (game.global.fixedSizeX / 2) - currentPlayer.x
            newPositionY = player.y + game.global.fixedSizeY * (game.global.quanY / 2) - (game.global.fixedSizeY / 2) - currentPlayer.y

            context.fillRect(
                newPositionX,
                newPositionY,
                game.global.fixedSizeX,
                game.global.fixedSizeY
            )
        }

        // Draw Player LifeBar
        context.fillStyle = 'lightgreen'
        context.fillRect(
            newPositionX,
            newPositionY - 8,
            game.global.fixedSizeX,
            5
        )
        context.fillStyle = 'green'
        context.fillRect(
            newPositionX,
            newPositionY - 8,
            (player.currentLife * game.global.fixedSizeX) / player.maxLife,
            5
        )

        // Draw Player Name
        context.fillStyle = 'black'
        context.font = "12px Arial";
        context.fillText(player.name, newPositionX, newPositionY - 10);
    }

    for (const monsterId in game.state.monsters) {
        const monster = game.state.monsters[monsterId]
        context.fillStyle = 'red'

        const newPositionX = monster.x + game.global.fixedSizeX * (game.global.quanX / 2) - (game.global.fixedSizeX / 2) - currentPlayer.x
        const newPositionY = monster.y + game.global.fixedSizeY * (game.global.quanY / 2) - (game.global.fixedSizeY / 2) - currentPlayer.y

        context.fillRect(
            newPositionX,
            newPositionY,
            game.global.fixedSizeX,
            game.global.fixedSizeY
        )

        // Draw Monster LifeBar
        context.fillStyle = 'lightgreen'
        context.fillRect(
            newPositionX,
            newPositionY - 8,
            game.global.fixedSizeX,
            5
        )
        context.fillStyle = 'green'
        context.fillRect(
            newPositionX,
            newPositionY - 8,
            (monster.currentLife * game.global.fixedSizeX) / monster.maxLife,
            5
        )

        // Draw Monster Name
        context.fillStyle = 'black'
        context.font = "12px Arial";
        context.fillText(monster.name, newPositionX, newPositionY - 10);
    }

    for (const tileId in game.state.tilesLayer2) {
        const tile = game.state.tilesLayer2[tileId]
        context.fillStyle = 'green'

        context.fillRect(
            tile.x + game.global.fixedSizeX * (game.global.quanX / 2) - (game.global.fixedSizeX / 2) - currentPlayer.x,
            tile.y + game.global.fixedSizeY * (game.global.quanY / 2) - (game.global.fixedSizeY / 2) - currentPlayer.y,
            game.global.fixedSizeX,
            game.global.fixedSizeY
        )
    }

    for (const tileId in game.state.tilesLayer3) {
        const tile = game.state.tilesLayer3[tileId]
        context.fillStyle = 'black'

        context.fillRect(
            tile.x + game.global.fixedSizeX * (game.global.quanX / 2) - (game.global.fixedSizeX / 2) - currentPlayer.x,
            tile.y + game.global.fixedSizeY * (game.global.quanY / 2) - (game.global.fixedSizeY / 2) - currentPlayer.y,
            game.global.fixedSizeX,
            game.global.fixedSizeY
        )
    }

    for (const tileId in game.state.tilesLayer4) {
        const tile = game.state.tilesLayer4[tileId]
        context.fillStyle = 'black'

        context.fillRect(
            tile.x + game.global.fixedSizeX * (game.global.quanX / 2) - (game.global.fixedSizeX / 2) - currentPlayer.x,
            tile.y + game.global.fixedSizeY * (game.global.quanY / 2) - (game.global.fixedSizeY / 2) - currentPlayer.y,
            game.global.fixedSizeX,
            game.global.fixedSizeY
        )
    }

    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame, currentPlayer)
    })
}