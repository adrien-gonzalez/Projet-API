const initialState = { auth: {isLogged: false, pp: ""}, selectedGame: {id: 0, gamecolor: "#00BCFF"}, apparence: {dark: false}, selectedServer: {id: 0} }

function appState(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'UPDATE_SELECTED_GAME':
            // console.log("state", state);
            nextState = {
                ...state, selectedGame: (action.value)
            }
            // console.log("next", nextState);
            return nextState || state
        case 'UPDATE_ISLOGGED':
            // console.log("state", state);
            nextState = {
                ...state, auth: (action.value)
            }
            // console.log("next", nextState);
            return nextState || state
        case 'UPDATE_SELECTED_SERVER':
                // console.log("state", state);
                nextState = {
                    ...state, selectedServer: (action.value)
                }
                // console.log("next", nextState);
                return nextState || state
        case 'UPDATE_APPARENCE':
            // console.log("state", state);
            nextState = {
                ...state, apparence: (action.value)
            }
            // console.log("next", nextState);
            return nextState || state
    default:
    return state
  }
}

export default appState;