import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import ResetPassword from './pages/ResetPassword';

export default function App() {
  return (
    <ScrollView style={styles.container}>
        <StatusBar style="auto"/>
        <ResetPassword />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
  },
});