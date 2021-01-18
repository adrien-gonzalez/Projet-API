import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import GamesAPI from '../services/gamesAPI';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export class HomeCarousel extends React.Component {
    
    constructor(props){
        
        super(props);
        this.state = {
          carouselItems: [
          {
              title:"Item 1",
              text: "Text 1",
          },
          {
              title:"Minecraft",
              text: "Minecraft",
          },
          {
              title:"Item 3",
              text: "Text 3",
          },
          {
              title:"Item 4",
              text: "Text 4",
          },
        ]
      }
    }

    componentDidMount(){
        const fetchGames = async () => {
            try {
                const data = await GamesAPI.findPopular();
                this.state.carouselItems = data;
                console.log(data);
            } catch (error) {
                console.log(error);
                console.log("nope");
            }
        };
        fetchGames();
    }
    
    _renderItem = ({item, index}) => {
        return (
            <View style={styles.carouselItemContainer}>
                <Image style={styles.imageCarouselItem} source={{uri: 'https://gameservapi.000webhostapp.com/assets/game-minecraft-card.png'}} />
                <Text style={styles.textCarouselItem}>{ item.title }</Text>
            </View>
        );
    }

    render () {
        return (
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.carouselItems}
              renderItem={this._renderItem}
              sliderWidth={100*windowWidth/100}
              itemWidth={50*windowWidth/100}
              firstItem={1}
            />
        );
    }

}
const styles = StyleSheet.create({
    carouselItemContainer: {
        backgroundColor: 'blue',
        height: '50%',
        marginTop: 10*windowHeight/100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageCarouselItem: {
        height: '85%',
        width: '90%',
        borderRadius: 10,
        marginBottom: 4
    },
    textCarouselItem: {
        fontSize: 2.2*windowHeight/100,
        fontFamily: 'TwCent',
        textTransform: 'uppercase',
        letterSpacing: 4,
    }
})