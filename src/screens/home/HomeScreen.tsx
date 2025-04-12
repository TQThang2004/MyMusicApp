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

interface HomeScreenProps {
  setIsBottomSheetOpen: (isOpen: boolean) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ setIsBottomSheetOpen }) => {
  // Di chuyển tất cả dữ liệu vào trong component
  const trendingSongs = useMemo(() => [
    { id: '1', title: 'Ojos Tristes', artist: 'Unkown', image: require('../../assets/images/ojos_tristes.png') },
    { id: '2', title: 'Goodbye Rocky', artist: 'DangRangTo', image: require('../../assets/images/goodbye_rocky.jpg') },
    { id: '3', title: 'Loveis', artist: 'DangRangTo', image: require('../../assets/images/loveis.jpg') },
    { id: '4', title: 'Wrong Time', artist: 'DangRangTo, Puppy', image: require('../../assets/images/wrongtime.jpg') }
  ], []);

  const topPlaylists = useMemo(() => [...trendingSongs], [trendingSongs]);
  const favoriteArtists = useMemo(() => [
    { id: '1', name: 'Armaan Malik', image: require('../../assets/images/logo.png') },
    { id: '2', name: 'Justin Bieber', image: require('../../assets/images/logo.png') },
    { id: '3', name: 'Katy Perry', image: require('../../assets/images/logo.png') }
  ], []);
  const popularSongs = useMemo(() => [...trendingSongs], [trendingSongs]);

  const bottomSheetRef = useRef<SongBottomSheetRef>(null);
  const [selectedSong, setSelectedSong] = useState<any>(null);
  
  const handleOpenBottomSheet = useCallback((song: any) => {
    setSelectedSong(song);
    // setIsBottomSheetOpen(true);
    bottomSheetRef.current?.expand();
  }, [setIsBottomSheetOpen]);

  

  const SongItem = React.memo(({ item, onPress }: { item: any, onPress: () => void }) => (
    <View style={homeStyles.songItem}>
      <Image source={item.image} style={homeStyles.songImage} />
      <View style={homeStyles.songInfo}>
        <Text style={homeStyles.songTitle}>{item.title}</Text>
        <Text style={homeStyles.songArtist}>{item.artist}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Text style={homeStyles.options}>⋯</Text>
      </TouchableOpacity>
    </View>
  ));

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
        <TouchableOpacity onPress={() => console.log('See all pressed')}>
          <Text style={homeStyles.textSeeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 10 }}>
        {favoriteArtists.map(artist => (
          <View key={artist.id} style={homeStyles.artistCard}>
            <Image source={artist.image} style={homeStyles.artistImage} />
            <Text style={homeStyles.cardTitle}>{artist.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Popular Songs */}
      <View style={homeStyles.flex}>
        <Text style={homeStyles.sectionTitle}>Popular Songs</Text>
        <TouchableOpacity onPress={() => console.log('See all pressed')}>
          <Text style={homeStyles.textSeeAll}>See all</Text>
        </TouchableOpacity>
      </View>
    </View>
  ), [trendingSongs, topPlaylists, favoriteArtists, handleOpenBottomSheet]);

  return (
    <>
      <FlatList
        data={popularSongs}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <SongItem 
            item={item} 
            onPress={() => handleOpenBottomSheet(item)} 
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