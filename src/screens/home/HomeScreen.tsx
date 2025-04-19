import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import homeStyles from './HomeStyles';
import SongBottomSheet, { SongBottomSheetRef } from '../../components/SongBottomSheet';
import TrackPlayer from 'react-native-track-player';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebaseConfig';
import Top3Chart from '../../components/Top3Chart';
import ZingChartScreen from '../zingChart/zingChart';


const HomeScreen = ({ navigation, setIsBottomSheetOpen }:any) => {

  const IP = '192.168.2.7';
  const PORT = '5000';
  
  const [home, setHomes] = useState([]);

  const [newReleaseSongs, setNewReleaseSongs] = useState<any[]>([]);
  const [popularSongs, setPopularSongs] = useState<any[]>([]); 
  const [chillPlaylists, setChillPlaylists] = useState<any[]>([]); 
  const [zingChart, setZingChart] = useState<any[]>([]); 
  const [artists, setArtists] = useState<any[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'artists'));
        const fetchedArtists = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setArtists(fetchedArtists);
      } catch (error) {
        console.error('Lỗi khi lấy artists từ Firebase:', error);
      }
    };

    fetchArtists();
  }, []);

  // useEffect(() => {
  //   const fetchPopularSongs = async () => {
  //     try {
  //       const snapshot = await getDocs(collection(db, 'songs'));
  //       const songs = snapshot.docs.map(doc => ({
  //         id: doc.id,
  //         ...doc.data()
  //       }));
  //       setPopularSongs(songs);
  //     } catch (error) {
  //       console.error('Lỗi khi lấy popularSongs từ Firebase:', error);
  //     }
  //   };

  //   fetchPopularSongs();
  // }, []);



  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await fetch('http://'+IP+':'+PORT+'/api/home');
        const json = await response.json();
        const sections = json.data.items; 

        console.log('Dữ liệu từ API:', sections);
        console.log('Dữ liệu từ API section 6:', sections[6].items);

        setChillPlaylists(sections[3].items);
        setNewReleaseSongs(sections[5].items);
        setZingChart(sections[6].items);

        console.log('Dữ liệu từ API chillPlaylists:', sections[6].items);

  
        if (json.err === 0 && json.data?.items) {
          setHomes(json.data.items);
        } else {
          console.log('Không có items trong dữ liệu:', json);
        }
      } catch (error) {
        console.error('Lỗi khi fetch API:', error);
      }
    };
  
    fetchHomeData();
  }, []);
  

  const handlePlay = async (item: any) => {
    console.log("🎵 Playing from Firebase:", item.title);
  
    await TrackPlayer.reset();
  
    await TrackPlayer.add({
      id: item.id,
      url: item.url128, 
      title: item.title,
      artist: item.artists || 'Unknown',
      artwork: item.thumbnail, // từ Firebase
    });
  
    await TrackPlayer.play();
  
    navigation.navigate('Song', { song: item });
  };
  

  const bottomSheetRef = useRef<SongBottomSheetRef>(null);
  const [selectedSong, setSelectedSong] = useState<any>(null);
  
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
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <SongItem 
            item={item} 
           
          />
        )}
        contentContainerStyle={homeStyles.container}
        showsVerticalScrollIndicator={false}
      />

      <SongBottomSheet
        ref={bottomSheetRef}
        selectedSong={selectedSong}
      />
    </>
  );
};

export default HomeScreen;