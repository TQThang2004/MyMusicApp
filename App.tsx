import React, { useEffect, useState } from 'react';
import AuthNavigator from './src/navigators/AuthNavigator';
import { WelcomeScreen } from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomeNavigator from './src/navigators/HomeNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const [isShowWelcome, setIsShowWelcome] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowWelcome(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StatusBar barStyle="dark-content" backgroundColor="white" translucent />
          <SafeAreaView style={{ flex: 1 }} edges={[]}>
            {isShowWelcome ? (
              <WelcomeScreen />
            ) : (
              <NavigationContainer>
                {isLoggedIn ? (
                  <HomeNavigator />
                ) : (
                  <AuthNavigator setIsLoggedIn={setIsLoggedIn} />
                )}
              </NavigationContainer>
            )}
          </SafeAreaView>
        </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;