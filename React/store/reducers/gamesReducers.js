const initialState = { selectedGame: 0 }

function updateSelectedGame(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'UPDATE_SELECTED_GAME':
            console.log(action.value);
            // const selectedGameIndex = state.selectedGame.findIndex(item => item.id === action.value.id)
            nextState = {
                ...state.selectedGame, selectedGame: (action.value),
            }
            return nextState || state
    default:
    return state
  }
}

export default updateSelectedGame;