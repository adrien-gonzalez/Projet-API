import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Platform, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { render } from 'react-dom';


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Topbar = (props) => {
    return (
        <View style={{position: 'relative', height: 12*windowHeight/100, backgroundColor: props.backgroundColor ? props.backgroundColor : "transparent", width: "100%", justifyContent: "flex-end", alignItems: "center",}}>
            <TouchableOpacity style={styles.backArrow}  onPress={() => { props.navigation.goBack() }}>
                <AntDesign name="arrowleft" size={24} color={props.color} />
            </TouchableOpacity>
            {props.isText === true && <Text style={{color: props.color, marginBottom: 2*windowHeight/100, fontSize: Platform.OS === "ios" ? 18 : 20, fontFamily: 'HomepageBaukasten',}}>{props.title}</Text>}
        </View>
    );
}

export default Topbar;

const styles = StyleSheet.create({
    backArrow: {
        position: 'absolute',
        left: 10*windowWidth/100,
        top: 6.5*windowHeight/100,
    }
})