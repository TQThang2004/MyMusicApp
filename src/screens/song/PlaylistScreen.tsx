import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const playlists = [
  {
    id: '1',
    title: "Today's Hits",
    songs: 120,
    image: 'https://i.scdn.co/image/ab67616d0000b27333c8067af2d50cf57496ba49',
  },
  {
    id: '2',
    title: 'Bollywood Hits',
    songs: 30,
    image: 'https://yt3.googleusercontent.com/WpAmcYTCHmsfZSFdyaCQzovV2natjs4770tEEKvfGHifgfIkYF-15tltjUGGE548c4_PSHIT=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    id: '3',
    title: 'Punjabi Hits',
    songs: 80,
    image: 'https://yt3.googleusercontent.com/ytc/AIdro_mecoxTbN4vKQMxMhvjasbeERTBZLHOIpr5NqiGFaM9tGQ=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    id: '4',
    title: 'Friday Feeling',
    songs: 120,
    image: 'https://i1.sndcdn.com/avatars-E6K1S5wE3jYAGBp8-kcJh7Q-t1080x1080.jpg',
  },
  {
    id: '5',
    title: 'Hindi Pop Hits',
    songs: 50,
    image: 'https://i.ytimg.com/vi/W9_7v7-oWcQ/maxresdefault.jpg',
  },
  {
    id: '6',
    title: 'All Day Dance Party',
    songs: 30,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcQDzKggNCWeCtxhxSnXZvze6QNZFZRdCukw&s',
  },
  {
    id: '7',
    title: 'New Hip-Hop',
    songs: 11,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJVE7bUeA6DOvg_mAYj_CGq0hyFrhu-iNhRA&s',
  },
];

const PlaylistScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleCreate = () => {
    console.log('Creating playlist:', newPlaylistName);
    setModalVisible(false);
    setNewPlaylistName('');
    // TODO: Thêm vào danh sách playlist nếu cần
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Playlists</Text>
        <Ionicons name="search" size={22} color="black" />
      </View>

      {/* Playlist list */}
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.sub}>{item.songs} Songs</Text>
            </View>
            <Ionicons name="ellipsis-vertical" size={18} color="gray" />
          </View>
        )}
      />

      {/* Floating add button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>

      {/* Modal for new playlist */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Create New Playlist</Text>
            <TextInput
              placeholder="Playlist name"
              value={newPlaylistName}
              onChangeText={setNewPlaylistName}
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.createButton]}
                onPress={handleCreate}
              >
                <Text style={styles.createText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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