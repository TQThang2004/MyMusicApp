import React, { useEffect, useState } from 'react';
import AuthNavigator from './src/navigators/AuthNavigator';
import { WelcomeScreen } from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import HomeNavigator from './src/navigators/HomeNavigator';

const App = () => {
  const [isShowWelcome, setIsShowWelcome] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // dùng để điều hướng

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowWelcome(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
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
    </>
  );
};

export default App;
