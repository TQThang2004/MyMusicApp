import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeNavigator  from "./HomeNavigator";
import ProfileNavigator from "./AuthNavigator";
import { Image } from "react-native";
import IMAGES from "../assets/images";
import AuthNavigator from "./AuthNavigator";
import SearchNavigator from "./SearchNavigator";
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Feather';
import SongNavigator from "./SongNavigator";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator  screenOptions={{headerShown: false}}>
      <Tab.Screen 
        name="Home" 
        component={HomeNavigator} 
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <Icon1 name="home" size={30} color={focused ? 'blue' : 'gray'} />
          )
        }}
      />
      <Tab.Screen
         name="Song"
         component={SongNavigator}
         options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <Icon2 name="music-box-outline" size={30} color={focused ? 'blue' : 'gray'} />
          )
        }}
       />
       <Tab.Screen
         name="Seach"
         component={SearchNavigator}
         options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <Icon1 name="search1" size={30} color={focused ? 'blue' : 'gray'} />
          )
        }}
       />
       <Tab.Screen
         name="User"
         component={AuthNavigator}
         options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <Icon3 name="user" size={30} color={focused ? 'blue' : 'gray'} />
          )
        }}
       />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

