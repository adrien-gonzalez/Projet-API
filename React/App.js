import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, ScrollView, Dimensions} from 'react-native';
import ResetMail from "./pages/ResetMail";
import ResetPassword from './pages/ResetPassword';
import Params from './pages/Params';

export default function App() {
  return (
    <ScrollView>
        <StatusBar style="auto"/>
        <Params />
      </ScrollView>
  );
}