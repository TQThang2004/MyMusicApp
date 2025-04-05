import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { LoginScreen } from '../screens'
import Onboarding from '../screens/auth/Onboarding'

const AuthNavigator = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator