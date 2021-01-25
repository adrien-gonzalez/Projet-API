const initialState = { auth: {isLogged: false}, selectedGame: {id: 0, gamecolor: "#00BCFF"} }

function appState(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'UPDATE_SELECTED_GAME':
            console.log("state", state);
            nextState = {
                ...state, selectedGame: (action.value)
            }
            console.log("next", nextState);
            return nextState || state
        case 'UPDATE_ISLOGGED':
            // console.log("state", state);
            nextState = {
                ...state, auth: (action.value)
            }
            // console.log("next", nextState);
            return nextState || state
    default:
    return state
  }
}

export default appState;