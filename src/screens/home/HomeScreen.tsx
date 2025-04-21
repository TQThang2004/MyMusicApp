import React, { useRef, useState, useCallback, useEffect } from 'react';
import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import HomeComponents from './HomeComponents';
import SongBottomSheet, { SongBottomSheetRef } from '../../components/SongBottomSheet';
import { HomeService } from './homeServices';
import homeStyles from './HomeStyles';
import { ButtonComponent } from '../../components';
import ZingChartScreen from '../zingChart/zingChart';

const HomeScreen = ({ navigation, setIsBottomSheetOpen }: any) => {
  const [newReleaseSongs, setNewReleaseSongs] = useState<any[]>([]);
  const [popularSongs, setPopularSongs] = useState<any[]>([]);
  const [chillPlaylists, setChillPlaylists] = useState<any[]>([]);
  const [zingChart, setZingChart] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const bottomSheetRef = useRef<SongBottomSheetRef>(null);
  const [selectedSong, setSelectedSong] = useState<any>(null);

  // Fetch data effects
  useEffect(() => {
    const loadArtists = async () => {
      const result = await HomeService.fetchArtists();
      console.log('artists HomeScreen', result);
      setArtists(result);
    };
    loadArtists();
  }, []);

  useEffect(() => {
    const loadHomeData = async () => {
      const sections = await HomeService.fetchHomeData();
      console.log('sections', sections);
      sections.forEach((section: any) => {
      
        if (!section?.sectionType) return;
        switch (section.sectionType) {
          case 'playlist':
            if (section.title === 'Chill') {
              setChillPlaylists(section.items);
            }
            break;
          case 'new-release':
            setNewReleaseSongs(section.items.all);
            break;
          case 'RTChart':
            setZingChart(section.items);
            break;
          default:
            break;
        }
      });
    };
    loadHomeData();
  }, []);

  // Player logic
  const handlePlay = async (item: any) => {
    const songData = await HomeService.fetchSongDetails(item.encodeId);
    if (!songData) return;

    console.log('songData', songData);

    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: item.id,
      url: songData['128'] || songData['320'] || songData['256'],
      title: item.title,
      artist: item.artist || 'Unknown',
      artwork: item.thumbnailM,
    });
    await TrackPlayer.play();
    console.log('Playing song:', item.title);
    navigation.navigate('Song', { song: item });
  };


  const handlePlayPlaylist = async (playlist: any, startIndex: number = 0) => {
    try {
      // Reset player
      await TrackPlayer.reset();
  
      // Thêm tất cả bài hát trong playlist vào queue
      const tracks = await HomeService.fetchPlaylist(playlist);

      console.log('fetch tracks ', tracks.song.items);

      navigation.navigate('Playlist', { playlist });

      return;
  
      // await TrackPlayer.add(tracks);
      
      // Phát bài đầu tiên
      await TrackPlayer.skip(startIndex);
      await TrackPlayer.play();
      
      // Navigate với cả playlist
      navigation.navigate('Song', { 
        playlist: tracks,
        currentIndex: startIndex 
      });
  
    } catch (error) {
      console.error('Error playing playlist:', error);
    }
  };

  // Bottom sheet handling
  const handleOpenBottomSheet = useCallback((song: any) => {
    setSelectedSong(song);
    bottomSheetRef.current?.expand();
  }, [setIsBottomSheetOpen]);

  const SongItem = React.memo(({ item }: any) => {
    const isRemoteImage = typeof item.image === 'string' || item.thumbnail;
  
    return (
      <TouchableOpacity onPress={() => handlePlay(item)}>
        <View style={homeStyles.songItem}>
          <Image
            source={
              isRemoteImage
                ? { uri: item.image || item.thumbnail }
                : item.image
            }
            style={homeStyles.songImage}
          />
          <View style={homeStyles.songInfo}>
            <Text style={homeStyles.songTitle}>{item.title}</Text>
            <Text style={homeStyles.songArtist}>{item.artist || item.artists}</Text>
          </View>
          <TouchableOpacity onPress={() => handleOpenBottomSheet(item)}>
            <Text style={homeStyles.options}>⋯</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  });
  

  const renderHeader = useCallback(() => (
    <View>
      {/* Header */}
      <View style={homeStyles.header}>
        <Text style={homeStyles.welcome}>Hey You 👋</Text>
        <Text style={homeStyles.subtitle}>What you want to hear today?</Text>
        <ButtonComponent text='logout' type='primary'/>
        <TextInput
          style={homeStyles.searchInput}
          placeholder="Search for songs, artists..."
          placeholderTextColor="#999"
        />
      </View>
  
      {/* New Release - Only show if data exists */}
      {newReleaseSongs?.length > 0 && (
        <>
          <View style={homeStyles.flex}>
            <Text style={homeStyles.sectionTitle}>New Release</Text>
            <TouchableOpacity onPress={() => console.log('See all pressed')}>
              <Text style={homeStyles.textSeeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 10 }}>
            {newReleaseSongs.map(playlist => (
              <View key={playlist.encodeId || playlist.id} style={homeStyles.card}>
                <Image
                  source={{ uri: playlist.thumbnail || playlist.image }} 
                  style={homeStyles.cardImage}
                />
                <Text style={homeStyles.cardTitle} numberOfLines={1}>
                  {playlist.title}
                </Text>
              </View>
            ))}
          </ScrollView>
        </>
      )}
  
      {/* Chill Playlists - Only show if data exists */}
      {chillPlaylists?.length > 0 && (
        <>
          <View style={homeStyles.flex}>
            <Text style={homeStyles.sectionTitle}>Chill</Text>
            <TouchableOpacity onPress={() => console.log('See all pressed')}>
              <Text style={homeStyles.textSeeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 10 }}>
            {chillPlaylists.map(playlist => (
              <View key={playlist.encodeId || playlist.id} style={homeStyles.card}>
                <Image
                  source={{ uri: playlist.thumbnail || playlist.image }} 
                  style={homeStyles.cardImage}
                />
                <Text style={homeStyles.cardTitle} numberOfLines={1}>
                  {playlist.sortDescription}
                </Text>
              </View>
            ))}
          </ScrollView>
        </>
      )}
  
      {/* Artists - Only show if data exists */}
      {artists?.length > 0 && (
        <>
          <View style={homeStyles.flex}>
            <Text style={homeStyles.sectionTitle}>Artists</Text>
            <TouchableOpacity onPress={() => navigation.navigate('FavoriteArtist')}>
              <Text style={homeStyles.textSeeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 10 }}>
            {artists.map(artist => (
              <TouchableOpacity 
                key={artist.id} 
                style={homeStyles.artistCard}
                onPress={() => navigation.navigate('ArtistScreen', { artist })}
              >
                <Image 
                  source={{ uri: artist.thumbnail }} 
                  style={homeStyles.artistImage} 
                />
                <Text style={homeStyles.cardTitle}>{artist.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
  
      {/* Zing Chart - Only show if data exists */}
      {zingChart?.length > 0 && (
        <View>
          <ZingChartScreen songs={zingChart}/>
        </View>
      )}
  
      {/* Popular Songs - Only show if data exists */}
      {popularSongs?.length > 0 && (
        <View style={homeStyles.flex}>
          <Text style={homeStyles.sectionTitle}>Popular Songs</Text>
          <TouchableOpacity onPress={() => navigation.navigate('PopularSong')}>
            <Text style={homeStyles.textSeeAll}>See all</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  ), [newReleaseSongs, chillPlaylists, artists, zingChart, popularSongs]);

  return (
    <>
      <FlatList
        data={popularSongs}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <HomeComponents
            newReleaseSongs={newReleaseSongs}
            chillPlaylists={chillPlaylists}
            artists={artists}
            zingChart={zingChart}
            navigation={navigation}
            handlePlay={handlePlay}
            handlePlayPlaylist={handlePlayPlaylist}
            handleOpenBottomSheet={handleOpenBottomSheet}
          />
        }
        renderItem={({ item }) => (
          <HomeComponents.SongItem
            item={item}
            handlePlay={handlePlay}
            handleOpenBottomSheet={handleOpenBottomSheet}
          />
        )}
      />

      <SongBottomSheet
        ref={bottomSheetRef}
        selectedSong={selectedSong}
      />
    </>
  );
};

export default HomeScreen;