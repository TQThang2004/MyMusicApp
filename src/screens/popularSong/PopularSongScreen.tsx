import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView, Modal, Pressable, Alert } from 'react-native';
import styles from './PopularSongStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer from 'react-native-track-player';
import { HomeService } from '../../services/homeServices';
import Icon from 'react-native-vector-icons/Ionicons';
import appInfo from '../../constants/appInfo';
import { AuthContext } from '../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { SongItemComponent } from '../../components';

const PopularSongScreen = ({ route, navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [myPlaylists, setMyPlaylists] = useState<{ id: string; thumbnail: string; name: string }[]>([]);
  const [selectedSong, setSelectedSong] = useState<{ encodeId: string } | null>(null);

  const { popularSongs } = route.params;
  const { user } = useContext(AuthContext);

  const handlePlay = async (item: any) => {
    const songData = await HomeService.fetchSongDetails(item.encodeId);
    if (!songData) return;

    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: item.id,
      url: songData['128'] || songData['320'] || songData['256'],
      title: item.title,
      artist: item.artist || '',
      artwork: item.thumbnailM,
    });
    await TrackPlayer.play();
    navigation.navigate('Song', { song: item });
  };

  const fetchPlaylists = async () => {
    try {
      const response = await fetch(`${appInfo.BASE_URL}/main/get-playlist/${user.id}`);
      const data = await response.json();
      setMyPlaylists(data.playlist.result);
    } catch (error) {
      console.log('Lỗi khi tải playlist:', error);
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
      console.log('Lỗi khi thêm bài hát:', error);
      Alert.alert('Lỗi', 'Không thể thêm bài hát vào playlist');
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.item} key={item.id || item.encodeId}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
        onPress={() => handlePlay(item)}
      >
        <Image source={{ uri: item.image || item.thumbnailM }} style={styles.image} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.nameSong} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{item.artistsNames || 'Unknown'}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { setSelectedSong(item); setModalVisible(true); }}>
        <Icon name="add-circle-outline" size={30} color="#555" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>New Release</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={popularSongs}
        keyExtractor={(item) => item.id||item.encodeId}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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

export default PopularSongScreen;
