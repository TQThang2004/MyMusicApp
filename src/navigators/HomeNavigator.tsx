import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from '../screens'
import PlayScreen from '../screens/PlayScreen'
import { Ionicons } from '@expo/vector-icons' // hoặc 'react-native-vector-icons/Ionicons' nếu không dùng Expo

const Tab = createBottomTabNavigator()

const HomeNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string = 'home'

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (route.name === 'Play') {
                        iconName = focused ? 'play' : 'play-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                },
                tabBarActiveTintColor: '#1DB954',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Play" component={PlayScreen} />
        </Tab.Navigator>
    )
}

export default HomeNavigator
