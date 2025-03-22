import { View, Text, ImageBackground, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const WelcomScreen = () => {
    return (
        <ImageBackground 
            source={require('../assets/images/background.jpg')}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            imageStyle= {{ flex: 1 }}
        >
           <Image source={require('../assets/images/logo.png')}
                style={{ width: Dimensions.get('window').width * 0.8, resizeMode: 'contain' }}
            />
            <Text style={{ fontSize: 21, color: 'green', fontWeight: 'bold' }}>Enjoy music your way</Text>
        </ImageBackground>
    )
}

export default WelcomScreen