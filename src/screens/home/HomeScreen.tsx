// screens/HomeScreen.tsx
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import HomeComponents from './HomeComponents';
import SongBottomSheet, { SongBottomSheetRef } from '../../components/SongBottomSheet';
import { HomeService } from './homeServices';

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

    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: item.id,
      url: songData['128'] || songData['320'] || songData['256'],
      title: item.title,
      artist: item.artist || 'Unknown',
      artwork: item.thumbnail,
    });
    await TrackPlayer.play();
    navigation.navigate('Song', { song: item });
  };

  // Bottom sheet handling
  const handleOpenBottomSheet = useCallback((song: any) => {
    setSelectedSong(song);
    bottomSheetRef.current?.expand();
  }, [setIsBottomSheetOpen]);

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