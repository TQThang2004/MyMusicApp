import React, { useEffect, useState } from 'react';
import AuthNavigator from './src/navigators/AuthNavigator';
import { WelcomeScreen } from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomeNavigator from './src/navigators/HomeNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FavoriteArtistScreen from './src/screens/favoriteArtist/FavoriteArtistScreen';
import ArtistScreen from './src/screens/artist/ArtistScreen';
import MainNavigator from './src/navigators/MainNavigator';
import TrackPlayer from 'react-native-track-player';

const App = () => {
  const [isShowWelcome, setIsShowWelcome] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowWelcome(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);


  useEffect(() => {
    const setup = async () => {
      await TrackPlayer.setupPlayer();
    };
    setup();
  }, []);
  

  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StatusBar barStyle="dark-content" backgroundColor="white" translucent />
          <SafeAreaView style={{ flex: 1 }} edges={[]}>
            {/* {isShowWelcome ? (
              <WelcomeScreen />
            ) : (
              <NavigationContainer>
                {isLoggedIn ? (
                  <HomeNavigator />
                ) : (
                  <AuthNavigator setIsLoggedIn={setIsLoggedIn} />
                )}
              </NavigationContainer>
            )} */}
            <NavigationContainer>
                <MainNavigator />
            </NavigationContainer>
            
            
          </SafeAreaView>
        </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

