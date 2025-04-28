import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { ZingChartService } from '../../services/zingChartServices';
import UpdateText from '../../components/UpdateText';
import { HomeService } from '../../services/homeServices';
import TrackPlayer from 'react-native-track-player';
import { handlePlay } from '../../services/handlePlay';

interface SongProps {
  encodeId: string;
  title: string;
  artistsNames: string;
  thumbnail: string;
  rank: number;
  previousRank: number;
}

interface Props {
  songs: SongProps[];
  navigation: any;
}

const ZingChart: React.FC<Props> = ({ songs, navigation }:any) => {

  // const handlePlay = async (item: any) => {
  //   const songData = await HomeService.fetchSongDetails(item.encodeId);
  //   const songInfoData = await HomeService.fetchInfoSongDetails(item.encodeId);
  //   console.log('songInfoData', songInfoData);
  //   if (!songData) return;

  //   console.log('songData', songData);

  //   await TrackPlayer.reset();
  //   await TrackPlayer.add({
  //     id: item.encodeId,
  //     url: songData['128'] || songData['320'] || songData['256'],
  //     title: item.title,
  //     artist: item.artistsNames || 'Unknown',
  //     artwork: item.thumbnailM,
  //   });
  //   await TrackPlayer.play();
  //   console.log('Playing song:', item.title);
  //   navigation.navigate('Song', { song: item });
  // };


  const renderItem = ({ item, index }: { item: SongProps; index: number }) => {


    return (
      <View style={styles.songRow}>
        <TouchableOpacity key={item.encodeId} onPress={() => handlePlay(item, songs, navigation)} style={{ flexDirection: 'row', alignItems: 'center', flex: 1}}>
        <Text style={styles.rank}>{(index+1)}</Text>
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          {/* <View style={styles.changeContainer}>
            {change && (
              <Text style={[styles.changeText, { color: change.color }]}>
                {change.symbol} {change.text}
              </Text>
            )}
          </View> */}
          <View style={styles.infoContainer}>
            <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
            <Text numberOfLines={1} style={styles.artists}>{item.artistsNames}</Text>
          </View>
          
          <TouchableOpacity style={{ width: 40, alignItems: 'center' }}>
            <Text style={styles.more}>...</Text>
          </TouchableOpacity>
        </TouchableOpacity>

      </View>
    );
  };

  return (
    <View style={styles.container}>
      <UpdateText />
      <Text style={styles.header}>#zingchart</Text>
      <FlatList
        data={songs.slice(0, 5)}
        renderItem={renderItem}
        keyExtractor={(item) => item.encodeId}
      />
      <TouchableOpacity style={styles.seeAllButton} onPress={() => navigation.navigate('ZingChartHome')}>
        <Text style={styles.seeAllText}>Xem tất cả</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191919',
    padding: 15,
    borderRadius: 12,
    margin: 10,
  },
  updateText: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 4,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D14EFF',
    marginBottom: 12,
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rank: {
    width: 24,
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginHorizontal: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  artists: {
    color: '#ccc',
    fontSize: 12,
  },
  changeContainer: {
    width: 40,
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  more: {
    fontSize: 18,
    color: '#aaa',
    paddingHorizontal: 6,
  },
  seeAllButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  seeAllText: {
    color: '#1DB954',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ZingChart;
