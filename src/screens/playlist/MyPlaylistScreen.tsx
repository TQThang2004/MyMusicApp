import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';
import { AuthContext } from '../../context/AuthContext';
import { useFocusEffect} from '@react-navigation/native';
import { SongItemComponent } from '../../components';


const MyPlaylistScreen = ({navigation}:any) => {

  const { user } = useContext(AuthContext);

  interface PlaylistItem {
    id: string;
    name: string;
    thumbnail: string;
  }
  
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);

  
  useFocusEffect(
    useCallback(() => {
      const fetchPlaylists = async () => {
        try {
          console.log('Fetching playlists for user ID:', user.id);
          const response = await fetch(`http://192.168.2.5:5000/api/main/get-playlist/${user.id}`);
          console.log('Playlist response:', response);
          const data = await response.json();
          console.log('Playlist data:', data);
          setPlaylists(data.playlist.result);
          console.log('Playlist data:', playlists);
        } catch (error) {
          console.error('Lỗi khi tải playlist:', error);
        }
      };

      if (user?.id) {
        fetchPlaylists();
      }
    }, [])
  );
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
                playlistId: item.id,
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
          navigation.navigate('CreatePlaylist');
        }}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
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
    bottom: 36,
    backgroundColor: '#2196F3',
    width: 72,
    height: 72,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 25,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  cancelButton: {
    backgroundColor: '#eee',
  },
  createButton: {
    backgroundColor: '#2196F3',
  },
  cancelText: {
    fontWeight: 'bold',
    color: '#555',
  },
  createText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});