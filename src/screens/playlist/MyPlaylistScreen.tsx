import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';
import { AuthContext } from '../../context/AuthContext';
import { useFocusEffect} from '@react-navigation/native';
import { SongItemComponent } from '../../components';
import { PlaylistService } from '../../services/playlistServices';


const MyPlaylistScreen = ({navigation}:any) => {

  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  interface PlaylistItem {
    id: string;
    name: string;
    thumbnail: string;
  }
  
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);

  
  const fetchPlaylists = async () => {
    try {
      console.log('Fetching playlists for user ID:', user.id);
      const response = await fetch(`http://192.168.2.16:5000/api/main/get-playlist/${user.id}`);
      const data = await response.json();
      console.log('Playlist data:', data);
      setPlaylists(data.playlist.result);
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

  
  const onPressCreatePlaylist = async () => {
    try {
      const message = await PlaylistService.handleCreatePlaylist(name, user.id);
      fetchPlaylists();
      setName('');
      setModalVisible(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Lỗi không xác định";
      Alert.alert("❌ Thất bại", errorMessage);
    }
  };



  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Playlists</Text>
        <Ionicons name="search" size={22} color="black" />
      </View>

      {/* Playlist list */}
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 5, paddingVertical: 10 }}
      >
        {playlists.map((item) => (
          <SongItemComponent
            key={item.id}
            imageUrl={item.thumbnail}
            songName={item.name}
            artistName={user.username}
            isButton
            icon={<Icon name="dots-three-horizontal" size={20} color="#555" />}
            onPress={() => {
              navigation.navigate('OnePlaylist', {
                encodeId: item.id,
                playlistName: item.name,
                thumbnail: item.thumbnail,
                creatorName: user.username
              });
            }}
          />
        ))}
      </Animated.ScrollView> 

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          console.log('Add button pressed');
          setModalVisible(true)
        }}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>



      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TextInput
              placeholder="Nhập tên playlist"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <Button title="Tạo Playlist" onPress={onPressCreatePlaylist} />

            {/* Nút đóng modal */}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


    </View>
  );
};

export default MyPlaylistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  sub: {
    color: 'gray',
    fontSize: 14,
    marginTop: 2,
  },
  addButton: {
    position: 'absolute',
    right: 24,
    bottom: 56,
    backgroundColor: '#2196F3',
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Modal Styles

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    width: '100%',
  },
  closeButton: {
    color: 'blue',
    marginTop: 10,
    fontSize: 16,
  },
});