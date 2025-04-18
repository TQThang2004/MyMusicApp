import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigator from './src/navigators/MainNavigator';
import TrackPlayer from 'react-native-track-player';
import auth from '@react-native-firebase/auth';
import AuthNavigator from './src/navigators/AuthNavigator';
import { WelcomeScreen } from './src/screens';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

const App = () => {
  const [isShowWelcome, setIsShowWelcome] = useState(true);
  const [isLogin, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowWelcome(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, [initializing]);

  useEffect(() => {
    const setup = async () => {
      try {
        await TrackPlayer.setupPlayer();
      } catch (err) {
        console.log("TrackPlayer setup error:", err);
      }
    };
    setup();
  }, []);

  if (initializing) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="white" translucent />
        <SafeAreaView style={{ flex: 1 }} edges={[]}>
          {isShowWelcome ? (
            <WelcomeScreen />
          ) : (
            <NavigationContainer>
              {user || isLogin ? (
                <MainNavigator />
              ) : (
                <AuthNavigator setIsLoggedIn={setIsLoggedIn}/>
              )}
            </NavigationContainer>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
