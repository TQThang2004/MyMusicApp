// AuthNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import LoginScreen from '../screens/auth/LoginScreen'
import Onboarding from '../screens/auth/Onboarding'
import RegisterScreen from '../screens/auth/RegisterScreen'

const AuthNavigator = ({ setIsLoggedIn }: { setIsLoggedIn: (val: boolean) => void }) => {
  const Stack = createNativeStackNavigator()

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator
