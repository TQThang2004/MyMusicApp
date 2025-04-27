  // src/navigators/HomeNavigator.jsx
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, SearchScreen, ProfileScreen, PlaylistScreen } from '../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    console.log("getBottom", getBottomSpace);
  return (
    <>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
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
          height: 60 + getBottomSpace(),
          paddingBottom: getBottomSpace(),

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
      <Tab.Screen name="PlayList" component={PlaylistScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
    </>
  );
};

export default HomeNavigator;
