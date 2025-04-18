// src/navigators/HomeNavigator.jsx
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, SearchScreen, PlayListScreen, ProfileScreen } from '../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddSongScreen from '../screens/playlist/AddSongScreen';
import MyPlaylistScreen from '../screens/playlist/MyPlaylistScreen';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  return (
    <>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'PlayList') {
            iconName = focused ? 'play-circle' : 'play-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={28} color={focused ? '#1DB954' : 'gray'} />;
        },
      })}
    >
      <Tab.Screen name="Home">
        {(props) => <HomeScreen {...props} setIsBottomSheetOpen={setIsBottomSheetOpen} />}
      </Tab.Screen>
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="PlayList" component={PlayListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
    </>
  );
};

export default HomeNavigator;
