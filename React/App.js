import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import ResetMail from './pages/ResetMail';

export default function App() {
  return (
    <ScrollView style={styles.container}>
        <StatusBar style="auto"/>
        <ResetMail />
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