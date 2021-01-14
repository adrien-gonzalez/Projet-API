import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

function TabGame(props) {
    
    const navigation = useNavigation();

    return (
        <TouchableOpacity activeOpacity={1} style={styles.btnContainer} onPress={() => navigation.navigate(props.page)}>
            <View>
                <Image resizeMode={'contain'} style={styles.btnIcon} source={require('../assets/minecraft-logo.png')} />
            </View>
        </TouchableOpacity>
    );
}

export default TabGame;

const styles = StyleSheet.create({
    btnContainer: {
        position: 'absolute',
        top: -40,
        height: windowWidth*25/100,
        borderRadius: 2000,
        borderWidth: 6,
        borderColor: 'white',
        left: (windowWidth*50/100)-(windowWidth*25/100)/2,
        width: windowWidth*25/100,
        backgroundColor: 'whitesmoke',
        zIndex: 1000,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // width: windowWidth*30/100,
    },
    gameLogo: {
        height: '74%',
        width: '74%',
    },
    btnIcon: {
        height: windowWidth*16/100,
        width: windowWidth*16/100,
    },
});