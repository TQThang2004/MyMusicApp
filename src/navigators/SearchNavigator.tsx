import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import  SearchScreen  from '../screens/search/SearchScreen'
import  SongDetailScreen  from '../screens/song/SongDetailScreen'

const SearchNavigator = () => {

    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="SongDetailScreen" component={SongDetailScreen} />
        </Stack.Navigator>
    )
}

export default SearchNavigator