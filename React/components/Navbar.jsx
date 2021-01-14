import React from 'react';
import { View, Text, Image, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const Navbar = ( props ) => {
    const navigation = useNavigation();
    const tab = props.tabPos;
    return (
        <View style={styles.navContainer}>
            <TouchableOpacity style={styles.gameCircle}>
                <Image style={styles.gameLogo} source={require('../assets/unselected-logo.png')} />
            </TouchableOpacity>
            <View style={styles.navbarContent}>
                <TouchableOpacity style={styles.navBtnSide} onPress={() => navigation.navigate('Home')}>
                    <Image resizeMode={'contain'} style={styles.btnIcon} source={require('../assets/icon-home.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navBtnCenter} onPress={() => navigation.navigate('SelectGame')}>
                    <Image resizeMode={'contain'} style={styles.btnIconMidLeft} source={require('../assets/icon-list.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navBtnCenter}>
                    <Image resizeMode={'contain'} style={styles.btnIconMidRight} source={require('../assets/icon-plus.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navBtnSide}>
                    <Image resizeMode={'contain'} style={styles.btnIcon} source={require('../assets/icon-account.png')} />
                </TouchableOpacity>
            </View>
            <View style={tab == 4 ? styles.selectBar4 : tab == 2 ? styles.selectBar2 : tab == 3 ? styles.selectBar3 : styles.selectBar1}>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
        // backgroundColor: 'red',
        alignItems: 'center',
        //   justifyContent: 'center',
    },
    navbarContent: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        width: '100%',
        height: '65%',
        flex: 1,
        flexDirection: "row",
    },
    gameCircle: {
        position: 'absolute',
        top: 10,
        height: windowWidth*25/100,
        borderRadius: 2000,
        borderWidth: 6,
        borderColor: 'white',
        width: windowWidth*25/100,
        backgroundColor: 'whitesmoke',
        zIndex: 1000,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameLogo: {
        height: '74%',
        width: '74%',
    },
    navBtnSide: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: 'blue',
        // backgroundColor: 'red',
    },
    navBtnCenter: {
        flex: 3,
        // alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: 'blue',
        // backgroundColor: 'blue',
    },
    btnIcon: {
        height: '38%',
        width: '38%',
    },
    btnIconMidRight: {
        height: '38%',
        width: '38%',
        marginLeft: '44%',
    },
    btnIconMidLeft: {
        height: '38%',
        width: '38%',
        marginLeft: '10%',
    },
    selectBar1: {
        position: 'absolute',
        width: '16%',
        height: 8,
        backgroundColor: '#66A5F9',
        left: '2%',
        top: '34%',
    },
    selectBar2: {
        position: 'absolute',
        width: '16%',
        height: 8,
        backgroundColor: '#66A5F9',
        left: '20%',
        top: '34%',
    },
    selectBar3: {
        position: 'absolute',
        width: '16%',
        height: 8,
        backgroundColor: '#66A5F9',
        left: '2%',
        top: '34%',
    },
    selectBar4: {
        position: 'absolute',
        width: '16%',
        height: 8,
        backgroundColor: '#66A5F9',
        left: '2%',
        top: '34%',
    },
});

export default Navbar;