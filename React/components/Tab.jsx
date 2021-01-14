import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

function Tab(props) {
    
    const navigation = useNavigation();

    const imageNames = {
        home: require('../assets/icon-home.png'),
        list: require('../assets/icon-list.png'),
        add: require('../assets/icon-plus.png'),
        profile: require('../assets/icon-account.png'),
    };
    if ( props.page == "ServersListPage" ) {
        var style = styles.btnIconMidLeft;
        var btnContainerStyle = styles.btnContainerList;
    }
    else if ( props.page == "AddServerPage") {
        var style = styles.btnIconMidRight;
        var btnContainerStyle = styles.btnContainerAdd;
    }
    else if ( props.page == "ProfilePage") {
        var style = styles.btnIcon;
        var btnContainerStyle = styles.btnContainerProfile;
    }
    else {
        var style = styles.btnIcon;
        var btnContainerStyle = styles.btnContainerHome;
    }

    return (
        <TouchableOpacity style={btnContainerStyle} onPress={() => navigation.navigate(props.page)}>
            <View>
                <Image resizeMode={'contain'} style={styles.btnIcon} source={imageNames[props.icon]} />
            </View>
        </TouchableOpacity>
    );
}

export default Tab;

const styles = StyleSheet.create({
    btnContainerHome: {
        width: windowWidth*17.5/100,
        height: '100%',
        marginLeft: '6%'
    },
    btnContainerList: {
        width: windowWidth*17.5/100,
        height: '100%',
        marginLeft: '1%'
    },
    btnContainerAdd: {
        width: windowWidth*17.5/100,
        height: '100%',
        marginLeft: '25%'
    },
    btnContainerProfile: {
        width: windowWidth*17.5/100,
        height: '100%',
        marginLeft: '1%'
    },
    btnIcon: {
        marginTop: 10,
        height: windowWidth*9/100,
        width: windowWidth*9/100,
    },
    // selectBar1: {
    //     position: 'absolute',
    //     width: '16%',
    //     height: 8,
    //     backgroundColor: '#66A5F9',
    //     left: '2%',
    //     top: '34%',
    // },
    // selectBar2: {
    //     position: 'absolute',
    //     width: '16%',
    //     height: 8,
    //     backgroundColor: '#66A5F9',
    //     left: '20%',
    //     top: '34%',
    // },
    // selectBar3: {
    //     position: 'absolute',
    //     width: '16%',
    //     height: 8,
    //     backgroundColor: '#66A5F9',
    //     left: '2%',
    //     top: '34%',
    // },
    // selectBar4: {
    //     position: 'absolute',
    //     width: '16%',
    //     height: 8,
    //     backgroundColor: '#66A5F9',
    //     left: '2%',
    //     top: '34%',
    // },
});