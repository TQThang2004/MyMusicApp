import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNavigator from './HomeNavigator';
import ArtistScreen from '../screens/artist/ArtistScreen';
import FavoriteArtistScreen from '../screens/favoriteArtist/FavoriteArtistScreen';
import PopularSongScreen from '../screens/popularSong/PopularSongScreen';
import { AuthContext } from '../context/AuthContext';
import { PlaylistScreen, SongDetailScreen } from '../screens';
import OnePlaylistScreen from '../screens/playlist/OnePlaylistScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={HomeNavigator} />
      <Stack.Screen name="FavoriteArtist" component={FavoriteArtistScreen} />
      <Stack.Screen name="ArtistScreen" component={ArtistScreen} />
      <Stack.Screen name="PopularSong" component={PopularSongScreen} />
      <Stack.Screen name="Song" component={SongDetailScreen} />
      <Stack.Screen name="Playlist" component={PlaylistScreen} />
      <Stack.Screen name="OnePlaylist" component={OnePlaylistScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
