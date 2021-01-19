import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { Dimensions } from 'react-native';
import GamesAPI from '../services/gamesAPI';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export class HomeCarousel extends React.Component {
    
    constructor(props){
        
        super(props);
        this.state = {
            activeIndex: 0,
            carouselItems: []
        }
        // console.log(this.state.carouselItems);
    }

    componentDidMount(){
        const fetchGames = async () => {
            try {
                const data = await GamesAPI.findPopular();
                // this.state.carouselItems.push(data);
                var datatest = JSON.stringify(data)
                var dataObject = [];
                data.map((data) => {
                    dataObject.push(
                        {
                            title: data.name,
                            image: data.image,
                            color: data.color,
                            servers: data.serv_count
                        }
                    )
                })
                console.log(data);
                this.setState({carouselItems: dataObject})
                console.log(this.state.carouselItems);
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
                <Text style={{fontSize: 2.2*windowHeight/100, fontFamily: 'TwCent', textTransform: 'uppercase', letterSpacing: 4, color: item.color}}>{item.title}</Text>
                <Image style={styles.imageCarouselItem} source={{uri: `https://nicolas-camilloni.students-laplateforme.io/assets/${item.image}`}} />
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 2.2*windowHeight/100, fontFamily: 'HomepageBaukasten', color: item.color}}>{item.servers}</Text>
                    <Text style={{fontSize: 2.2*windowHeight/100, fontFamily: 'HomepageBaukasten', color: 'white'}}> serveur{item.servers > 1 ? "s" : ""}</Text>
                </View>
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
                onBeforeSnapToItem = { index => this.setState({activeIndex:index}) }
                loop = {Platform.OS === 'ios' ? true : false}
                lockScrollWhileSnapping = {true}
                loopClonesPerSide = {3}
                enableMomentum = {false}
                autoplay = {true}
                layout = {'default'}
                firstItem = {-1}
                containerCustomStyle={{ flexGrow: 0, height: '50%'}}
            />
        );
    }

}
const styles = StyleSheet.create({
    carouselItemContainer: {
        height: '100%',
        // marginTop: 10*windowHeight/100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageCarouselItem: {
        height: '80%',
        width: '90%',
        borderRadius: 10,
        marginBottom: 6,
        marginTop: 10,
    },
    textCarouselItem: {
        fontSize: 2.2*windowHeight/100,
        fontFamily: 'TwCent',
        textTransform: 'uppercase',
        letterSpacing: 4,
    }
})