import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import  ServerList  from './pages/server_list.jsx';
import  ServerInfo  from './pages/server_info.jsx';

export default function App({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* Afficher ma page ServerLit */}
      <ScrollView>
         {/* < ServerList /> */}
         < ServerInfo />
      </ScrollView>
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
