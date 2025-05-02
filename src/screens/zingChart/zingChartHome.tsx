import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
  Pressable
} from 'react-native';
import styles from './ZingChartHomeStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer from 'react-native-track-player';
import { ZingChartService } from '../../services/zingChartServices';
import { HomeService } from '../../services/homeServices';
import { handlePlay } from '../../services/handlePlay';
import FloatingPlayer from '../../components/FloatPlayer';
import { AuthContext } from '../../context/AuthContext';
import appInfo from '../../constants/appInfo';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SongItemComponent } from '../../components';

interface SongProps {
  encodeId: string;
  title: string;
  artistsNames: string;
  thumbnail: string;
}

interface Song {
  encodeId: string;
  title: string;
  artistsNames: string;
  thumbnailM: string;
}

const ZingChartHome = ({ navigation }: any) => {
  
  
  const [chartSongs, setChartSongs] = useState<Song[]>([]);
  const {user} = useContext(AuthContext);
  const [selectedSong, setSelectedSong] = useState<SongProps | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [myPlaylists, setMyPlaylists] = useState<{ id: string; thumbnail: string; name: string }[]>([]);

  useEffect(() => {
    const fetchChart = async () => {
      const zingChart = await ZingChartService.fetchZingChart();
      setChartSongs(zingChart?.RTChart?.items || []);
      console.log('zingChart', zingChart);
    };

    fetchChart();
  }, []);


  const fetchPlaylists = async () => {
    try {
      const response = await fetch(`${appInfo.BASE_URL}/main/get-playlist/${user.id}`);
      const data = await response.json();
      setMyPlaylists(data.playlist.result);
    } catch (error) {
      console.error('Lỗi khi tải playlist:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        fetchPlaylists();
      }
    }, [user?.id])
  );

  const handleAddSong = async (songId: string, playlistId: string) => {
    try {
      const response = await fetch(`${appInfo.BASE_URL}/main/add-song-to-playlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          playlistId: playlistId,
          songId: songId
        }),
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert('Thành công', 'Bài hát đã được thêm vào playlist!');
        setModalVisible(false);
      } else {
        Alert.alert('Lỗi', result.message || 'Thêm bài hát thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi thêm bài hát:', error);
      Alert.alert('Lỗi', 'Không thể thêm bài hát vào playlist');
    }
  };

  
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
      <TouchableOpacity onPress={() => { setSelectedSong(item); setModalVisible(true); }}>
            <Icon name="add-circle-outline" size={22} color="#555" />
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


          {/* Modal thêm vào playlist */}
       <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modalContainer} onPress={() => {}}>
            <Text style={styles.modalTitle}>Add to playlist</Text>
            {myPlaylists.length > 0 ? (
              myPlaylists.map((playlist) => (
                <SongItemComponent
                  key={playlist.id}
                  imageUrl={playlist.thumbnail}
                  songName={playlist.name}
                  artistName={user.username}
                  onPress={() => selectedSong && handleAddSong(selectedSong.encodeId, playlist.id)}
                />
              ))
            ) : (
              <Text style={{ color: '#999' }}>Bạn chưa có playlist nào</Text>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default ZingChartHome;
