import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { PlaylistService } from '../../services/playlistServices';


const CreatePlaylistScreen = (navigation:any) => {
    const { user } = useContext(AuthContext);
    
    const [name, setName] = useState('');

    const IP = '192.168.2.5';
    const PORT = '5000';

    const onPressCreatePlaylist = async () => {
        try {
          const message = await PlaylistService.handleCreatePlaylist(name, user.id);
          Alert.alert("✅ Thành công", message);
          setName('');
        } catch (error: any) {
          Alert.alert("❌ Thất bại", error.message || "Lỗi không xác định");
        }
      };
      

    return (
        <View style={styles.container}>
        <TextInput
            placeholder="Nhập tên playlist"
            value={name}
            onChangeText={setName}
            style={styles.input}
        />
        <Button title="Tạo Playlist" onPress={onPressCreatePlaylist} />
        </View>
    );
};

export default CreatePlaylistScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
});
