import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import Store from './store/configureStore';
import Main from './pages/Main';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

export default function App() {

  // CHARGEMENT DES POLICES
  let [fontsLoaded] = useFonts({
    'TwCent': require('./assets/fonts/TCM.ttf'),
    'HomepageBaukasten': require ('./assets/fonts/HomepageBaukasten-Bold.otf')
  });
  if (!fontsLoaded) {
      return <AppLoading />;
  }
  else {
      return (
        <Provider store={Store}>
          <Main />
        </Provider>
      );
  }
}
