const initialState = { auth: {isLogged: false, pp: "", isUpdated: false}, selectedGame: {id: 0, gamecolor: "#00BCFF"}, apparence: {dark: false}, selectedServer: {id: 0}, serversRedux: {info: null, isUpdated: false}, stateServer: {id: 0, newState: false} }

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
        case 'UPDATE_SERVERS':
            // console.log("state", state);
            nextState = {
                ...state, serversRedux: (action.value)
            }
            // console.log("next", nextState);
            return nextState || state
        case 'UPDATE_STATE_SERVER':
            // console.log("state", state);
            nextState = {
                ...state, stateServer: (action.value)
            }
            // console.log("next", nextState);
            return nextState || state
    default:
    return state
  }
}

export default appState;