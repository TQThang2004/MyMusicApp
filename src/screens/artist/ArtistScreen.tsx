import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import artistStyles from './ArtistStyle';

const ArtistScreen = ({ route, navigation }: any) => {
    console.log('ArtistScreen', route.params);
    const { artist } = route?.params || {};
    // Nếu muốn tránh lỗi hoàn toàn:
    if (!artist) return <Text>No artist selected</Text>;

  const topSongs = [
    {
      id: '1',
      title: 'Pehla Pyaar',
      subtitle: 'Kabir Singh',
      image: require('../../assets/images/ojos_tristes.png'),
    },
    {
      id: '2',
      title: 'Jab Tak',
      subtitle: 'M.S Dhoni: The Untold Story',
      image: require('../../assets/images/ojos_tristes.png'),
    },
    {
      id: '3',
      title: 'Bol Do Na Zara',
      subtitle: 'Azhar',
      image: require('../../assets/images/ojos_tristes.png'),
    },
    {
      id: '4',
      title: 'Main Rahoon Ya Na Rahoon',
      subtitle: 'Main Rahoon Ya Na Rahoon',
      image: require('../../assets/images/ojos_tristes.png'),
    },
    {
      id: '5',
      title: 'Sab Tera',
      subtitle: 'Baaghi',
      image: require('../../assets/images/ojos_tristes.png'),
    },
  ];

  const renderSong = ({ item }: any) => (
    <View style={artistStyles.songItem}>
      <Image source={item.image} style={artistStyles.songImage} />
      <View style={artistStyles.songInfo}>
        <Text style={artistStyles.songTitle}>{item.title}</Text>
        <Text style={artistStyles.songSubtitle}>{item.subtitle}</Text>
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
        data={topSongs}
        keyExtractor={item => item.id}
        renderItem={renderSong}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ArtistScreen;
