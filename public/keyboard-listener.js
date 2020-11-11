export default function createKeyBoardListener() {

    const state = {
        observers: [],
        currentPlayerId: null
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        console.log(`Notifing ${state.observers.length} observers`)

        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    function registerCurrentPlayer(id) {
        state.currentPlayerId = id
    }

    document.addEventListener('keydown', handleKeydown)

    function handleKeydown(event) {
        const command = {
            type: 'move-player',
            player: state.currentPlayerId,
            keyPressed: event.key
        }

        notifyAll(command)
    }

    return {
        subscribe,
        registerCurrentPlayer
    }
}