import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import Store from './store/configureStore';
import Main from './pages/Main';

export default function App() {
      return (
        <Provider store={Store}>
          <Main />
        </Provider>
      );
}
