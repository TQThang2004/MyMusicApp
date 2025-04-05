import { View, Text, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Feather';

const PlayScreen = () => {
  return (

    // <View style={{ flex: 1, alignItems: 'center' }}>

    //     <View style={{justifyContent: 'space-between', alignItems: 'center', height: 60, width: '100%', flexDirection: 'row', marginTop: 30}}>
    //         <Icon name="angle-down" size={30} color="#4f5952" style={{ paddingHorizontal: 20 }}/>
    //         <Icon1 name="more-horizontal" size={30} color="#4f5952" style={{ paddingHorizontal: 20 }}/>
    //     </View>

    //     <View style={styles.containerArtwork as any}>
    //         <Image source={require('../assets/images/logo.png')} style={styles.artwork} />
    //     </View>

    //     <View style={{justifyContent: 'space-between', alignItems: 'center', height: 40, width: '100%', flexDirection: 'row'}}>
    //         <Icon name="heart-o" size={20} color="#4f5952" style={{ paddingHorizontal: 20 }}/>
    //         <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Sự nghiệp chướng</Text>
    //         <Icon1 name="more-horizontal" size={30} color="#4f5952" style={{ paddingHorizontal: 20 }}/>
    //     </View>
        
    //     <Text style={{ fontSize: 15, fontWeight: '400', color: 'gray' }}>Phao Northside</Text>
    // </View>
    <View></View>
  )
}

const styles = {
    artwork: {
        width: 300,
        height: 300,
    },

    containerArtwork: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
        borderRadius: 20,
        backgroundColor: '#99FF66',
        marginBottom: 20,
    }
}

export default PlayScreen