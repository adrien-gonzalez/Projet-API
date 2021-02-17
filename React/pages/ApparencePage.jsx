import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Switch } from 'react-native';
import { Dimensions } from 'react-native';
import Topbar from '../components/Topbar';
import { CommonActions, useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { connect } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ApparencePage = (props) => {

    const navigation = useNavigation();

    console.log("salutcmoi", props);

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
    }

    const _updateApparence = (value) => {
        const action = { type: "UPDATE_APPARENCE", value: { dark: value } };
        props.dispatch(action);
    }

    const combinedFunctionEnable = (value) => {
        var newValue = "";
        value === true ? newValue = "false" : newValue = "true";
        save("theme", newValue);
        _updateApparence(!value);
        // resetNav();
    }

    const getTheme = async () => {
        const theme = await SecureStore.getItemAsync("theme")
        if (theme === "true") setIsEnabled(true);
        if (theme === "false") setIsEnabled(false);
        // console.log('===============================4=====');
        // console.log(theme);
        // console.log('====================================');
    }

    useEffect (() => {
        getTheme()
    })

    const resetNav = async (value) => {
        console.log("lol", value)
        const newValue = await SecureStore.getItemAsync("theme")
        save("theme", newValue);
        console.log("icila2", newValue);
        navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'HomePage' },
              ],
            })
        );
    }

    // console.log('================isEnabled====================');
    // console.log(isEnabled);
    // console.log('====================================');
    return(
        <ScrollView style={{backgroundColor: props.apparence.dark ? "#141229" : '#F1F1F1'}}>
            <Topbar color={props.apparence.dark ? "white" : "#262626"} title="Thème" isText={true} navigation={navigation} backgroundColor={props.apparence.dark ? "#080015" : "white"} />
            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 8*windowHeight/100,
                paddingLeft: 40,
                paddingRight: 40,
                backgroundColor: props.apparence.dark ? '#242048' : '#eaeaea',
                
            }}>
                <Text style={{
                    fontFamily: 'TwCent',
                    fontSize: 20,
                    color: props.apparence.dark ? 'white' : '#262626',
                }}>Thème sombre</Text>
                <Switch
                    trackColor={{ false: props.apparence.dark ? '#3e3e3e' : '#ffffff', true: props.apparence.dark ? '#3e3e3e' : '#ffffff' }}
                    thumbColor={isEnabled ? props.selectedGame.gamecolor : '#f4f3f4'}
                    ios_backgroundColor='#3e3e3e'
                    onValueChange={() => {
                        combinedFunctionEnable(isEnabled)
                    }}
                    value={isEnabled}
                />
            </View>
        </ScrollView>
    )

}

const mapStateToProps = ({ selectedGame, apparence }) => ({
    selectedGame,
    apparence
});

const mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApparencePage)