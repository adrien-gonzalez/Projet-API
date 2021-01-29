import React, {useState, useEffect} from 'react';
import { View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { connect } from "react-redux";

const windowWidth = Dimensions.get('window').width;


function Tab(props) {

    console.log("youhou", props);
    
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    if (isFocused) {
        var color = props.selectedGame.gamecolor ? props.selectedGame.gamecolor : "#00BCFF";
        var colorBorder = props.selectedGame.gamecolor;
    }
    else {
        var color = "#262626";
        var colorBorder = "whitesmoke";
    }
    
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
                {props.accountTab && props.auth.isLogged ? 
                    <Image
                        source={{ uri: "http://nicolas-camilloni.students-laplateforme.io/assets/usersPictures/" + props.auth.pp }}
                        style={{height: 40, width: 40, borderRadius: 50, borderColor: colorBorder, borderWidth: 2}}
                    />
                :
                    <FontAwesome5 name={props.icon} size={Platform.OS === "ios" ? 34: 26} color={color} />
                }
            </View>
        </TouchableOpacity>
    );
}

const mapStateToProps = ({ selectedGame, auth }) => ({
    selectedGame,
    auth
});

export default connect(mapStateToProps)(Tab);

const styles = StyleSheet.create({
    btnContainerHome: {
        width: windowWidth*17.5/100,
        height: '100%',
        marginLeft: '6%',
        // paddingTop: 10,
        justifyContent: 'center',
    },
    btnContainerList: {
        width: windowWidth*17.5/100,
        height: '100%',
        marginLeft: '1%',
        justifyContent: 'center',
    },
    btnContainerAdd: {
        width: windowWidth*17.5/100,
        height: '100%',
        marginLeft: '25%',
        justifyContent: 'center',
    },
    btnContainerProfile: {
        width: windowWidth*17.5/100,
        height: '100%',
        // marginLeft: '1%',
        justifyContent: 'center',
        // backgroundColor: 'red',
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