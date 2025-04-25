import React, { useRef, useState, useCallback, useEffect } from 'react';
import { FlatList} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import HomeComponents from './HomeComponents';
import SongBottomSheet, { SongBottomSheetRef } from '../../components/SongBottomSheet';
import { HomeService } from '../../services/homeServices';
import FloatingPlayer from '../../components/FloatPlayer';


const HomeScreen = ({ navigation, setIsBottomSheetOpen }: any) => {
  const [newReleaseSongs, setNewReleaseSongs] = useState<any[]>([]);
  const [popularSongs, setPopularSongs] = useState<any[]>([]);
  const [chillPlaylists, setChillPlaylists] = useState<any[]>([]);
  const [top100Playlists, setTop100Playlists] = useState<any[]>([]);
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
            }else if (section.title === 'Top 100') {
              setTop100Playlists(section.items);
              console.log('Top 100', section.items);
              console.log('Top 100', top100Playlists);
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

  const handlePlay = async (selectedItem: any) => {

  
    await TrackPlayer.reset();
  
    const tracks = await Promise.all(
      newReleaseSongs.map(async (item: any) => {
        const songData = await HomeService.fetchSongDetails(item.encodeId);
        if (!songData) return null;
  
        return {
          id: item.encodeId,
          url: songData['128'] || songData['320'] || songData['256'],
          title: item.title,
          artist: item.artistsNames || 'Unknown',
          artwork: item.thumbnailM,
        };
      })
    );
  
    const filteredTracks = tracks.filter((track) => track !== null);
  
    await TrackPlayer.add(filteredTracks);
  
    const index = filteredTracks.findIndex((track: any) => track.id === selectedItem.encodeId);
  
    if (index >= 0) {
      await TrackPlayer.skip(index);
    }
  
    await TrackPlayer.play();
  
    console.log('Playing song:', selectedItem.title);
    navigation.navigate('Song', { song: selectedItem });
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
        keyExtractor={item => item.encodeId}
        ListHeaderComponent={
          <HomeComponents
            newReleaseSongs={newReleaseSongs}
            chillPlaylists={chillPlaylists}
            artists={artists}
            zingChart={zingChart}
            top100={top100Playlists}
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

        <FloatingPlayer
                onPress={() =>
                navigation.navigate('Song', { song: TrackPlayer.getCurrentTrack })
            }
          />  

      <SongBottomSheet
        ref={bottomSheetRef}
        selectedSong={selectedSong}
      />
    </>
  );
};

export default HomeScreen;