import React, { useContext, useEffect, useState } from 'react';
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
import { AuthContext, AuthProvider } from './src/context/AuthContext';

const AppContent = () => {
  const { user } = useContext(AuthContext);
  const [isShowWelcome, setIsShowWelcome] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowWelcome(false);
    }, 2000);
    return () => clearTimeout(timeout);
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
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent />
      <SafeAreaView style={{ flex: 1 }} edges={[]}>
        {isShowWelcome ? (
          <WelcomeScreen />
        ) : (
          <NavigationContainer>
            {user ? <MainNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppContent />
      </GestureHandlerRootView>
    </AuthProvider>
  );
};

export default App;
