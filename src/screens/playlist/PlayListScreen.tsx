import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PlaylistScreen = ({ route }: any) => {

  const { chillPlaylists } = route.params;
  console.log('chillPlaylists', chillPlaylists);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Playlists</Text>
        <Ionicons name="search" size={22} color="black" />
      </View>

      {/* Playlist list */}
      <FlatList
        data={chillPlaylists}
        keyExtractor={(item) => item.encodeId}
        renderItem={({ item }) => (
          <TouchableOpacity 
              onPress={() => console.log('Playlist pressed', item.encodeId)}
              >
                <View style={styles.itemRow}>
                <Image source={{ uri: item.thumbnailM }} style={styles.image} />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{item.title}</Text>
                  <Text style={styles.sub}>{item.artistsNames}</Text>
                </View>
                <Ionicons name="ellipsis-vertical" size={18} color="gray" />
              </View>
          </TouchableOpacity>
        )}
      />   
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