import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigator from './src/navigators/MainNavigator';
import TrackPlayer from 'react-native-track-player';
import auth from '@react-native-firebase/auth';
import AuthNavigator from './src/navigators/AuthNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { WelcomeScreen } from './src/screens';

import { AuthContext, AuthProvider } from './src/context/AuthContext';
import FloatingPlayer from './src/components/FloatPlayer';

const AppContent = () => {
  const { user } = useContext(AuthContext); 
  const [isShowWelcome, setIsShowWelcome] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowWelcome(false);
    }, 2000);
    console.log("isShowWelcome", auth().currentUser);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '398598335148-ugdiuiai2bh7igc16t8619nvfeo5l4qv.apps.googleusercontent.com',
    });
  }, []);

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

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={{ flex: 1 }} edges={[]}>
        {isShowWelcome ? (
          <WelcomeScreen />
        ) : (
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
              {user ? (
                <MainNavigator />
              ) : (
                <AuthNavigator />
              )}
            </NavigationContainer>
          </GestureHandlerRootView>
        )}
      </SafeAreaView>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <SafeAreaProvider >
      <GestureHandlerRootView style={{ height: '100%', backgroundColor: 'transparent' }}>
        <AppContent />
      </GestureHandlerRootView>
      </SafeAreaProvider>
      
    </AuthProvider>
  );
};

export default App;
