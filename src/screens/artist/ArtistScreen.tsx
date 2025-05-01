import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import artistStyles from './ArtistStyle';
import { PlaylistService } from '../../services/playlistServices';

const ArtistScreen = ({ route, navigation }: any) => {
    console.log('ArtistScreen', route.params);
    const { artist } = route?.params || {};
    const [playlist, setPlaylist] = useState()


    if (!artist) return <Text>No artist selected</Text>;

    useEffect(() => {
  
        const fetchPlaylistDetails = async () => {
          try {
            const data = await PlaylistService.fetchDetailPlaylist(artist.playlistId);
            console.log("-----------",data.data.song.items)
            setPlaylist(data.data.song.items)
          } catch (error) {
            console.error('Error fetching playlist details:', error);
            Alert.alert('Error', 'Could not load playlist details');
          }
        }
        fetchPlaylistDetails();
      }, []);


  const renderSong = ({ item }: any) => (
    <View style={artistStyles.songItem}>
      <Image source={{ uri: item.thumbnailM }} style={artistStyles.songImage} />

      <View style={artistStyles.songInfo}>
        <Text style={artistStyles.songTitle}>{item.title}</Text>
        <Text style={artistStyles.songSubtitle}>{item.artistsNames}</Text>
      </View>
      <Ionicons name="ellipsis-vertical" size={20} color="#555" />
    </View>
  );

  return (
    <View style={artistStyles.container}>
      {/* Header with artist image */}
      <View style={artistStyles.header}>
        <Image source={{ uri: artist.image || artist.thumbnail }} style={artistStyles.artistImage} />
        <TouchableOpacity
          style={artistStyles.backIcon}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>

        <View style={artistStyles.headerOverlay}>
          <Text style={artistStyles.artistName}>{artist.name}</Text>
          <TouchableOpacity style={artistStyles.playButton}>
            <Ionicons name="play" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Song list */}
      <View style={artistStyles.songListHeader}>
        <Text style={artistStyles.topSong}>Top Song</Text>
        {/* <TouchableOpacity>
          <Text style={artistStyles.seeAll}>See All</Text>
        </TouchableOpacity> */}
      </View>

      <FlatList
        data={playlist}
        keyExtractor={item => item.id}
        renderItem={renderSong}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ArtistScreen;
