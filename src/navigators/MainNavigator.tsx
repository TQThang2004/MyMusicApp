import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNavigator from './HomeNavigator';
import ArtistScreen from '../screens/artist/ArtistScreen';
import FavoriteArtistScreen from '../screens/favoriteArtist/FavoriteArtistScreen';
import PopularSongScreen from '../screens/popularSong/PopularSongScreen';
import { ProfileScreen, SongDetailScreen } from '../screens';
import OnePlaylistScreen from '../screens/playlist/OnePlaylistScreen';
import OneMyPlaylistScreen from '../screens/playlist/OneMyPlaylistScreen';
import ZingChartHome from '../screens/zingChart/zingChartHome';
import LyricsScreen from '../screens/song/LyricScreen';
import PlaylistScreen from '../screens/playlist/PlayListScreen';
import AddSongScreen from '../screens/playlist/AddSongScreen';
// import CreatePlaylistScreen from '../screens/playlist/CreatePlaylistScreen';


const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }  }>
      <Stack.Screen name="MainTabs" component={HomeNavigator} />
      <Stack.Screen name="FavoriteArtist" component={FavoriteArtistScreen} />
      <Stack.Screen name="ArtistScreen" component={ArtistScreen} />
      <Stack.Screen name="PopularSong" component={PopularSongScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Song" component={SongDetailScreen} />
      <Stack.Screen name="Playlist" component={PlaylistScreen} />
      <Stack.Screen name="OnePlaylist" component={OnePlaylistScreen} />
      <Stack.Screen name="AddSong" component={AddSongScreen}/>
      <Stack.Screen name="OneMyPlaylist" component={OneMyPlaylistScreen} />
      <Stack.Screen name="ZingChartHome" component={ZingChartHome} />
      {/* <Stack.Screen name="CreatePlaylist" component={CreatePlaylistScreen} /> */}
      <Stack.Screen name="Lyrics" component={LyricsScreen} />
      
    </Stack.Navigator>
    
  );
};

export default MainNavigator;
