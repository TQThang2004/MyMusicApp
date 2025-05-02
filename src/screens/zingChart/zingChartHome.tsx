import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import styles from './ZingChartHomeStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer from 'react-native-track-player';
import { ZingChartService } from '../../services/zingChartServices';
import { HomeService } from '../../services/homeServices';
import { handlePlay } from '../../services/handlePlay';
import FloatingPlayer from '../../components/FloatPlayer';

const ZingChartHome = ({ navigation }: any) => {
  interface Song {
    encodeId: string;
    title: string;
    artistsNames: string;
    thumbnailM: string;
  }
  
  const [chartSongs, setChartSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchChart = async () => {
      const zingChart = await ZingChartService.fetchZingChart();
      setChartSongs(zingChart?.RTChart?.items || []);
      console.log('zingChart', zingChart);
    };

    fetchChart();
  }, []);

  
  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handlePlay(item, chartSongs, navigation)}
    >
      <View style={styles.rankContainer}>
        <Text style={[styles.rank, { color: index < 3 ? '#f00' : '#888' }]}>
          {index + 1}
        </Text>
      </View>
      <Image source={{ uri: item.thumbnailM }} style={styles.image} />
      <View style={styles.songInfo}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Text style={styles.artists} numberOfLines={1} ellipsizeMode="tail">
          {item.artistsNames}
        </Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.options}>⋯</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>#ZINGCHART</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={chartSongs}
        keyExtractor={(item) => item.encodeId}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <FloatingPlayer
      style={{bottom:0}}
                onPress={() =>
                navigation.navigate('Song', { song: TrackPlayer.getCurrentTrack })
            }
          /> 
    </SafeAreaView>
  );
};

export default ZingChartHome;
