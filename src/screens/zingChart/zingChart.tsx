import React, { useCallback, useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Modal, Pressable, Alert } from 'react-native';
import { ZingChartService } from '../../services/zingChartServices';
import UpdateText from '../../components/UpdateText';
import { HomeService } from '../../services/homeServices';
import TrackPlayer from 'react-native-track-player';
import { handlePlay } from '../../services/handlePlay';
import { AuthContext } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { SongItemComponent } from '../../components';
import appInfo from '../../constants/appInfo';
import { useFocusEffect } from '@react-navigation/native';

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

  const {user} = useContext(AuthContext);
  const [selectedSong, setSelectedSong] = useState<SongProps | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [myPlaylists, setMyPlaylists] = useState<{ id: string; thumbnail: string; name: string }[]>([]);

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


  const renderItem = ({ item, index }: { item: SongProps; index: number }) => {
    return (
      <View style={styles.songRow}>
        <TouchableOpacity key={item.encodeId} onPress={() => handlePlay(item, songs, navigation, user)} style={{ flexDirection: 'row', alignItems: 'center', flex: 1}}>
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
          
            <TouchableOpacity onPress={() => { setSelectedSong(item); setModalVisible(true); }}>
                    <Icon name="add-circle-outline" size={27} color="#555" />
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  playlistItem: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
});

export default ZingChart;
