// AuthNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import LoginScreen from '../screens/auth/LoginScreen'
import Onboarding from '../screens/auth/Onboarding'

const AuthNavigator = ({ setIsLoggedIn }: { setIsLoggedIn: (val: boolean) => void }) => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="LoginScreen">
        {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default AuthNavigator
