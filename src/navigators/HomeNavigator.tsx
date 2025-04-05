import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { HomeScreen } from '../screens'
import PlayScreen from '../screens/PlayScreen'

const HomeNavigator = () => {

    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="PlayScreen" component={PlayScreen} />
        </Stack.Navigator>
    )
}

export default HomeNavigator