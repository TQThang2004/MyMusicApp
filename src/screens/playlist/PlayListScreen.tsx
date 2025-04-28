import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';
import { AuthContext } from '../../context/AuthContext';
import { SongItemComponent } from '../../components';
import { PlaylistService } from '../../services/playlistServices';


const PlaylistScreen = ({ navigation, route }: any) => {


  const { user } = useContext(AuthContext);

  interface PlaylistItem {
    encodeId: string;
    name: string;
    thumbnail: string;
  }
  
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    if (route.params?.playlists) {
      const mapped = route.params.playlists.map((playlist: any) => ({
        encodeId: playlist.encodeId,
        name: playlist.title,
        thumbnail: playlist.thumbnail,
      }));
      console.log("Lít",mapped)
      setPlaylists(mapped);
    }
  }, [route.params]);


 
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Playlists</Text>
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
            key={item.encodeId}
            imageUrl={item.thumbnail}
            songName={item.name}
            artistName={"Nhiều nghẹ sĩ"}
            isButton
            icon={<Icon name="dots-three-horizontal" size={20} color="#555" />}
            onPress={() => {
              console.log("Playlist One Item", item)
              navigation.navigate('OnePlaylist', {playlist: item});
            }}
          />
        ))}
      </Animated.ScrollView> 

    
    </View>
  );
};

export default PlaylistScreen;

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