  // src/navigators/HomeNavigator.jsx
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, SearchScreen, ProfileScreen } from '../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import MyPlaylistScreen from '../screens/playlist/MyPlaylistScreen';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  return (
    <>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        swipeEnabled: true,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#1DB954', 
        tabBarInactiveTintColor: 'gray', 
        tabBarStyle: {
          backgroundColor: 'white',
          opacity: 0.7,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home';
          if (route.name === 'AddSong') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Playlist') {
            iconName = focused ? 'musical-notes' : 'musical-notes-outline';
          } else
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'MyPlayList') {
            iconName = focused ? 'play-circle' : 'play-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return  <Ionicons name={iconName} size={28} color={focused ? '#1DB954' : 'gray'} />
        },
      })}
    >
      <Tab.Screen name="Home">
        {(props) => <HomeScreen {...props} setIsBottomSheetOpen={setIsBottomSheetOpen} />}
      </Tab.Screen>
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="PlayList" component={MyPlaylistScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
    </>
  );
};

export default HomeNavigator;
