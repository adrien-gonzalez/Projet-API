import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import Svg, { Circle, Path, G, Image} from 'react-native-svg';


export default class Header extends React.Component {
    render() {
        return (
            <View style={styles.svgHeader}>
                <ImageBackground source={require("../assets/Minecraft.png")} style={styles.image}>
                    <Svg xmlns="http://www.w3.org/2000/svg" width="146" height="146" viewBox="0 0 146 146" style={styles.logo}>
                        <G fill="none">
                            <Path d="M73,0A73,73,0,1,1,0,73,73,73,0,0,1,73,0Z" stroke="none"/>
                            <Path d="M 73 2 C 63.41417694091797 2 54.11615753173828 3.876937866210938 45.36421966552734 7.578720092773438 C 41.15760040283203 9.357955932617188 37.10015869140625 11.56028747558594 33.30461883544922 14.12449645996094 C 29.54461669921875 16.66470336914063 26.00881958007813 19.58202362060547 22.79541778564453 22.79541778564453 C 19.58202362060547 26.00881958007813 16.66470336914063 29.54461669921875 14.12449645996094 33.30461883544922 C 11.56028747558594 37.10015869140625 9.357955932617188 41.15760040283203 7.578720092773438 45.36421966552734 C 3.876937866210938 54.11615753173828 2 63.41417694091797 2 73 C 2 82.5858154296875 3.876937866210938 91.88383483886719 7.578720092773438 100.6357803344727 C 9.357955932617188 104.842399597168 11.56028747558594 108.8998413085938 14.12449645996094 112.6953811645508 C 16.66470336914063 116.4553833007813 19.58202362060547 119.9911804199219 22.79541778564453 123.2045822143555 C 26.00881958007813 126.4179840087891 29.54461669921875 129.3352966308594 33.30461883544922 131.8755035400391 C 37.10015869140625 134.4397277832031 41.15760040283203 136.6420440673828 45.36421966552734 138.4212799072266 C 54.11615753173828 142.1230621337891 63.41417694091797 144 73 144 C 82.5858154296875 144 91.88383483886719 142.1230621337891 100.6357803344727 138.4212799072266 C 104.842399597168 136.6420440673828 108.8998413085938 134.4397277832031 112.6953811645508 131.8755035400391 C 116.4553833007813 129.3352966308594 119.9911804199219 126.4179840087891 123.2045822143555 123.2045822143555 C 126.4179840087891 119.9911804199219 129.3352966308594 116.4553833007813 131.8755035400391 112.6953811645508 C 134.4397277832031 108.8998413085938 136.6420440673828 104.842399597168 138.4212799072266 100.6357803344727 C 142.1230621337891 91.88383483886719 144 82.5858154296875 144 73 C 144 63.41417694091797 142.1230621337891 54.11615753173828 138.4212799072266 45.36421966552734 C 136.6420440673828 41.15760040283203 134.4397277832031 37.10015869140625 131.8755035400391 33.30461883544922 C 129.3352966308594 29.54461669921875 126.4179840087891 26.00881958007813 123.2045822143555 22.79541778564453 C 119.9911804199219 19.58202362060547 116.4553833007813 16.66470336914063 112.6953811645508 14.12449645996094 C 108.8998413085938 11.56028747558594 104.842399597168 9.357955932617188 100.6357803344727 7.578720092773438 C 91.88383483886719 3.876937866210938 82.5858154296875 2 73 2 M 73 0 C 113.316780090332 0 146 32.68321990966797 146 73 C 146 113.316780090332 113.316780090332 146 73 146 C 32.68321990966797 146 0 113.316780090332 0 73 C 0 32.68321990966797 32.68321990966797 0 73 0 Z" stroke="none" fill="#26c96d"/>
                        </G>
                        <Circle cx="50%" cy="50%" r="65" fill="#fff" opacity="0.28"/>
                        <Image x="25" y="25"  width='94' height='94' href={require('../assets/logo_minecraft.png')}/>                        
                    </Svg>
                <Text style={styles.textColor}>XX Serveurs</Text> 
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    svgHeader: {
        width: '100%',
        height: '100%',
    },
    textColor: {
        color: "white",
        fontSize: 20,
    },
    image: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    logo: {
        marginTop: 50,
    }
})

