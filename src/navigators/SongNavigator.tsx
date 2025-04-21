import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import  SongDetailScreen  from '../screens/song/SongDetailScreen'
import  PlaylistScreen  from '../screens/playlist/PlaylistScreen'
import MyPlaylistScreen from '../screens/playlist/OnePlaylistScreen'

const SongNavigator = () => {

    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PlaylistScreen" component={PlaylistScreen} />
            <Stack.Screen name="MyPlaylistScreen" component={MyPlaylistScreen} />
            <Stack.Screen name="SongDetailScreen" component={SongDetailScreen} />
        </Stack.Navigator>
    )
}

export default SongNavigator