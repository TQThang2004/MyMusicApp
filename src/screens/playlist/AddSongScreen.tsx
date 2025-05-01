import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ButtonComponent, RowComponent, SongItemComponent, TextComponent } from '../../components';
import { HomeService } from '../../services/homeServices';
import appInfo from '../../constants/appInfo';

const AddSongScreen = ({ route, navigation }: any) => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const { userId, playlistId } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${appInfo.BASE_URL}/home`);
        const json = await response.json();
        setData(json.data?.items[3].items.vPop || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddSong = async (songId: string) => {
    try {
      const response = await fetch(`${appInfo.BASE_URL}/main/add-song-to-playlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: userId,
          playlistId: playlistId,
          songId: songId 
        }),
      });
  
      const result = await response.json();
  
      if (result.success) {
        Alert.alert('Thành công', 'Bài hát đã được thêm vào playlist!', [
          { 
            text: 'OK', 
            onPress: () => navigation.goBack()
          }
        ]);
      } else {
        Alert.alert('Lỗi', result.message || 'Thêm bài hát thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi thêm bài hát:', error);
      Alert.alert('Lỗi', 'Không thể thêm bài hát vào playlist');
    }
  };

  const handleSearch = async () => {
    Keyboard.dismiss(); // Dismiss keyboard when searching

    if (!query.trim()) {
      // If search is empty, fetch default data
      const response = await fetch(`${appInfo.BASE_URL}/home`);
      const json = await response.json();
      setData(json.data?.items[3].items.vPop || []);
      return;
    }

    try {
      const res = await fetch(
        `${appInfo.BASE_URL}/search?keyword=${encodeURIComponent(query)}`
      );

      if (!res.ok) {
        console.log('Fetch failed with status:', res.status);
        return;
      }

      const json = await res.json();
      if (json?.data?.songs?.length) {
        const songs = json.data.songs.map((song: any) => ({
          encodeId: song.encodeId,
          title: song.title,
          artistsNames: song.artistsNames || song.artists?.map((a: any) => a.name).join(', '),
          thumbnail: song.thumbnail,
        }));
        setData(songs);
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <RowComponent justifyContent='space-between' styles={{ padding: 20, marginTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Icon name="chevron-back" size={25}/></TouchableOpacity>
        <TextComponent text='Add Song' color='black' title styles={{ fontSize: 20 }}/>
        <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
          <Icon name="search" size={25}/>
        </TouchableOpacity>
      </RowComponent>

      {/* Search Bar - Only show when showSearch is true */}
      {showSearch && (
        <RowComponent styles={styles.searchRow}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Tìm kiếm bài hát..."
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          <TouchableOpacity 
            style={styles.searchButton} 
            onPress={handleSearch}
          >
            <Icon name="search" size={20} color="white"/>
          </TouchableOpacity>
        </RowComponent>
      )}

      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
      >
        {data.map((song) => (
          <SongItemComponent
            key={song.encodeId}
            imageUrl={song.thumbnail}
            songName={song.title}
            artistName={song.artistsNames}
            isButton
            icon={<Icon name="add-circle-outline" size={30} color="#555" />}
            onPressButton={() => handleAddSong(song.encodeId)}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default AddSongScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchRow: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#2196F3',
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
