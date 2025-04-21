// AuthNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext, useEffect, useState } from 'react'
import LoginScreen from '../screens/auth/LoginScreen'
import Onboarding from '../screens/auth/Onboarding'
import RegisterScreen from '../screens/auth/RegisterScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'

// const AuthNavigator = ({ setIsLoggedIn }: { setIsLoggedIn: (val: boolean) => void }) => {
//   const Stack = createNativeStackNavigator()

//   const { user } = useContext(AuthContext);

//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="Onboarding" component={Onboarding} />
//             <Stack.Screen
//               name="LoginScreen"
//               children={(props) => (
//                 <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
//               )}
//             />
//             <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
//         </Stack.Navigator>
//     )
// }

// export default AuthNavigator
const AuthNavigator = () => {
  const Stack = createNativeStackNavigator()
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);


  useEffect(() => {
    const checkOnboarding = async () => {
      const seen = await AsyncStorage.getItem('hasSeenOnboarding');
      setHasSeenOnboarding(seen === 'true');
    };
    checkOnboarding();
  }, []);

  if (hasSeenOnboarding === null) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!hasSeenOnboarding && (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      )}
      <Stack.Screen
        name="LoginScreen"
        children={(props) => (
          <LoginScreen {...props} />
        )}
      />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  )
}

export default AuthNavigator
