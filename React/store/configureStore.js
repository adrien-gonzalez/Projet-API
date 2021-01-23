import { createStore } from 'redux';
import updateSelectedGame from './reducers/gamesReducers';

export default createStore(updateSelectedGame);