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


const HomeScreen = ({ navigation, setIsBottomSheetOpen }:any) => {
  // Di chuyển tất cả dữ liệu vào trong component
  const trendingSongs = useMemo(() => [
    { id: '1', title: 'Ojos Tristes', artist: 'Unkown', image: require('../../assets/images/ojos_tristes.png'),
       url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: '2', title: 'Goodbye Rocky', artist: 'DangRangTo', image: require('../../assets/images/goodbye_rocky.jpg'),
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
     },
    { id: '3', title: 'Loveis', artist: 'DangRangTo', image: require('../../assets/images/loveis.jpg'),
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
     },
    { id: '4', title: 'Wrong Time', artist: 'DangRangTo, Puppy', image: require('../../assets/images/wrongtime.jpg'),
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
     }
  ], []);

  const topPlaylists = useMemo(() => [...trendingSongs], [trendingSongs]);

  const [popularSongs, setPopularSongs] = useState<any[]>([]);
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

  useEffect(() => {
    const fetchPopularSongs = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'songs'));
        const songs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPopularSongs(songs);
      } catch (error) {
        console.error('Lỗi khi lấy popularSongs từ Firebase:', error);
      }
    };

    fetchPopularSongs();
  }, []);

  const handlePlay = async (item: any) => {
    console.log("🎵 Playing from Firebase:", item.title);
  
    await TrackPlayer.reset();
  
    await TrackPlayer.add({
      id: item.id,
      url: item.url128, // dùng url128 từ Firebase
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
    // setIsBottomSheetOpen(true);
    bottomSheetRef.current?.expand();
  }, [setIsBottomSheetOpen]);

  

  const SongItem = React.memo(({ item }: any) => {
    // Kiểm tra nếu là ảnh từ Firebase (URL) thì dùng {uri}, còn không thì dùng require()
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
          <Text style={homeStyles.welcome}>Hey John 👋</Text>
          <Text style={homeStyles.subtitle}>What you want to hear today?</Text>
          <TextInput
            style={homeStyles.searchInput}
            placeholder="Search for songs, artists..."
            placeholderTextColor="#999"
          />
      </View>

      {/* Trending Songs */}
      <Text style={homeStyles.sectionTitle}>Trending Songs</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 10 }}>
        {trendingSongs.map(song => (
          <TouchableOpacity key={song.id} style={homeStyles.card} onPress={() => handleOpenBottomSheet(song)}>
            <Image source={song.image} style={homeStyles.trendingImage} />
            <Text style={homeStyles.cardTitle} numberOfLines={1}>{song.title}</Text>
            <Text style={homeStyles.cardSubtitle} numberOfLines={1}>{song.artist}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Top Playlists */}
      <View style={homeStyles.flex}>
        <Text style={homeStyles.sectionTitle}>Top Playlists</Text>
        <TouchableOpacity onPress={() => console.log('See all pressed')}>
          <Text style={homeStyles.textSeeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 10 }}>
        {topPlaylists.map(playlist => (
          <View key={playlist.id} style={homeStyles.card}>
            <Image source={playlist.image} style={homeStyles.cardImage} />
            <Text style={homeStyles.cardTitle}>{playlist.title}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Favourite Artists */}
      <View style={homeStyles.flex}>
        <Text style={homeStyles.sectionTitle}>Favourite Artists</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('FavoriteArtist')}
        >
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

      {/* Popular Songs */}
      <View style={homeStyles.flex}>
        <Text style={homeStyles.sectionTitle}>Popular Songs</Text>

        <TouchableOpacity onPress={() => navigation.navigate('PopularSong')}>
          <Text style={homeStyles.textSeeAll}>See all</Text>
        </TouchableOpacity>

      </View>
    </View>
  ), [trendingSongs, topPlaylists, artists, handleOpenBottomSheet]);

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