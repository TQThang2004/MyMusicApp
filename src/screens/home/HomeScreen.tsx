import { View, Text, Button } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = ({navigation}:any) => {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 26, color: 'black', fontWeight: 'bold' }}>Home Screen</Text>
          <Button title="Logout" onPress = {async () => await AsyncStorage.clear()}/>

            <Button title="Go to Play Screen" onPress={() => navigation.navigate('PlayScreen')} />
      </View>
  )
}

export default HomeScreen