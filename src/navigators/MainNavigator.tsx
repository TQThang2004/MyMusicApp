import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNavigator from './HomeNavigator';
import ArtistScreen from '../screens/artist/ArtistScreen';
import FavoriteArtistScreen from '../screens/favoriteArtist/FavoriteArtistScreen';
import PopularSongScreen from '../screens/popularSong/PopularSongScreen';
import { SongDetailScreen } from '../screens';
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { user } = useContext(AuthContext);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {
        user && (
          <Stack.Screen name="MainTabs" component={HomeNavigator} />
        )
      }
      <Stack.Screen name="FavoriteArtist" component={FavoriteArtistScreen} />
      <Stack.Screen name="ArtistScreen" component={ArtistScreen} />
      <Stack.Screen name="PopularSong" component={PopularSongScreen} />
      <Stack.Screen name="Song" component={SongDetailScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
