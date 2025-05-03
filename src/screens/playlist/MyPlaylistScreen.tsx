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
  Pressable,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';
import { AuthContext } from '../../context/AuthContext';
import { useFocusEffect} from '@react-navigation/native';
import { SongItemComponent, TextComponent } from '../../components';
import { PlaylistService } from '../../services/playlistServices';
import appInfo from '../../constants/appInfo';
import FloatingPlayer from '../../components/FloatPlayer';
import TrackPlayer from 'react-native-track-player';


interface PlaylistItem {
  id: string;
  name: string;
  thumbnail: string;
}
const MyPlaylistScreen = ({navigation}:any) => {

  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);

  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  
  const fetchPlaylists = async () => {
    try {
      console.log('Fetching playlists for user ID:', user.id);
      const response = await fetch(`${appInfo.BASE_URL}/main/get-playlist/${user.id}`);
      const data = await response.json();
      console.log('Playlist data:', data);
      setPlaylists(data.playlist.result);
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

  const handleRemoveSong = (playlistId: string) => {
    Alert.alert(
      'Xóa Playlist',
      'Bạn có chắc muốn xóa Playlist không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`${appInfo.BASE_URL}/main/remove-playlist`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userId: user.id,
                  playlistId: playlistId
                }),
              });
  
              const data = await response.json();
              console.log('Xóa playlist:', data);
              if (data) {
                setPlaylists(prev => prev.filter(playlist => playlist.id !== playlistId));
              } else {
                console.log('Xóa thất bại:', data.message);
              }
            } catch (error) {
              console.log('Lỗi khi xóa playlist:', error);
            }
          },
        },
      ]
    );
  };
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TextComponent text='My Playlist' title color='black'/>
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
            onLongPress={() => handleRemoveSong(item.id)}
            onPress={() => {
              console.log('Playlist item pressed:', item.id);
              navigation.navigate('OneMyPlaylist', {
                playlist: {
                  encodeId: item.id,
                  thumbnailM: item.thumbnail,
                  title: item.name,
                  artistsNames: user.username
                }
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

      { !keyboardOpen && (
        <FloatingPlayer
          onPress={() => navigation.navigate('Song', { song: TrackPlayer.getCurrentTrack })}
        />
      )}

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modalContainer} onPress={() => {}}>
            <Text style={styles.modalTitle}>Nhập tên playlist</Text>
            <TextInput
              placeholder="Tên playlist..."
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            <TouchableOpacity style={styles.createButton} onPress={onPressCreatePlaylist}>
              <Text style={styles.createButtonText}>Tạo Playlist</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>


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
    bottom: 130,
    backgroundColor: '#73a3f0',
    width: 55,
    height: 55,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Modal Styles


  closeButtonTextStyle: {
    color: 'blue',
    marginTop: 10,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',  // làm tối hậu cảnh
  },

  // Container modal chính
  modalContainer: {
    width: '80%',                       // chiếm 80% chiều ngang màn hình
    backgroundColor: '#fff',
    borderRadius: 16,                   // bo tròn góc
    paddingVertical: 20,
    paddingHorizontal: 16,
    // shadow iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    // elevation Android
    elevation: 10,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },

  // Tạo button custom thay vì Button mặc định
  createButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },

  closeButton: {
    alignSelf: 'center',
    marginTop: 8,
    padding: 8,
  },
  closeButtonText: {
    color: '#888',
    fontSize: 14,
  },
});