
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import appInfo from '../../constants/appInfo';
import TrackPlayer from 'react-native-track-player';
import { HomeService } from '../../services/homeServices';

const SearchScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const [isChatVisible, setIsChatVisible] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string }[]>([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([]);
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
      let formattedResult: any[] = [];

      if (json?.data?.top) {
        const top = json.data.top;

        if (top.objectType === 'artist') {
          formattedResult.push({
            id: top.id || 'artist-id',
            title: top.name || 'Unknown Artist',
            image: top.thumbnailM || top.thumbnail,
            type: 'artist',
          });
        } else {
          const artistNames =
            top.artistsNames ||
            top.artists?.map((a: any) => a.name).join(', ') ||
            'Unknown Artist';

          formattedResult.push({
            id: top.encodeId || 'top-id',
            title: top.title || 'Unknown Title',
            artist: artistNames,
            image: top.thumbnail,
            type: 'song',
          });
        }
      }

      if (json?.data?.songs?.length) {
        const songs = json.data.songs.map((song: any) => ({
          id: song.encodeId || `song-${Math.random()}`,
          title: song.title,
          artist: song.artistsNames || song.artists?.map((a: any) => a.name).join(', '),
          image: song.thumbnail,
          type: 'song',
        }));

        formattedResult = formattedResult.concat(songs);
      }

      const uniqueResults = formattedResult.filter(
        (item, index, self) => index === self.findIndex((t) => t.id === item.id)
      );

      setResults(uniqueResults);
    } catch (err) {
      console.log('Search error:', err);
      setResults([]);
    }
  };

  const RASA_SERVER_URL = `http://192.168.2.16:5000/webhooks/rest/webhook`; // Rasa Server

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const newUserMessage = { sender: 'user', text: chatInput };
    setChatMessages((prev) => [...prev, newUserMessage]);
    const userText = chatInput;
    setChatInput('');

    try {
      const response = await fetch(RASA_SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: 'default',
          message: userText,
        }),
      });

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        // Rasa có thể trả về nhiều tin nhắn một lúc
        const botMessages = data.map((msg: any) => ({
          sender: 'bot',
          text: msg.text || '',
        }));

        setChatMessages((prev) => [...prev, ...botMessages]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          { sender: 'bot', text: 'Không nhận được phản hồi từ bot.' },
        ]);
      }
    } catch (error: any) {
      console.log('Lỗi khi gửi tin nhắn tới Rasa:', error.message);
      setChatMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Có lỗi xảy ra khi gửi tin nhắn.' },
      ]);
    }
  };

  const handlePlay = async (selectedItem: any) => {

    await TrackPlayer.reset();
    console.log('1111', selectedItem);
  
    const tracks = await Promise.all(
      [selectedItem].map(async (item: any) => {
        console.log('selected mâp:', item);
        const songData = await HomeService.fetchSongDetails(item.id);
        const songData2 = await HomeService.fetchInfoSongDetails(item.id);
        console.log('songData:', songData);
        console.log('songData2:', songData2);
        
        if (!songData) return null;

        return {
          id: item.id,
          url: songData['128'] || songData['320'] || songData['256'],
          title: item.title,
          artist: item.artist || 'Unknown',
          thumbnailM: item.image,
          genresIds: songData2.genreIds
        };
      })
    );
  
    const filteredTracks = tracks.filter((track) => track !== null);
  
    await TrackPlayer.add(filteredTracks);
  
    const index = filteredTracks.findIndex((track: any) => track.id === selectedItem.id);
  
    if (index >= 0) {
      await TrackPlayer.skip(index);
    }
  
    await TrackPlayer.play();
  
    console.log('Playing song:', selectedItem.title);
    navigation.navigate('Song', { song: selectedItem });
  };




  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.resultRow}
      onPress={() =>
        item.type === 'artist'
          ? navigation.navigate('ArtistScreen', { artistId: item.id })
          : handlePlay(item)
      }
    >
      <Image source={{ uri: item.image }} style={styles.resultImage} />
      <View style={styles.resultText}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        {item.type === 'artist' ? (
          <Text style={styles.resultSubtitle}>Artist</Text>
        ) : (
          <Text style={styles.resultSubtitle}>
            {item.artist || 'Unknown Artist'}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderChatItem = ({ item }: any) => (
    <View style={{ marginVertical: 6 }}>
      <Text style={{ fontWeight: item.sender === 'AI' ? 'bold' : 'normal' }}>
        {item.sender}: {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#999"
          value={query}
          onChangeText={(text) => setQuery(text)}
          returnKeyType="search"
        />
      </View>

      {/* Filters */}
      <Text style={styles.topResult}>Top Result</Text>

      

      {/* Results */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      {/* Chat Modal */}
      <Modal visible={isChatVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.chatBox}>
            <Text style={styles.chatTitle}>Trò chuyện với AI</Text>

            <FlatList
              data={chatMessages}
              keyExtractor={(_, i) => i.toString()}
              renderItem={renderChatItem}
              style={{ flex: 1 }}
            />

            <View style={styles.chatInputRow}>
              <TextInput
                style={styles.chatInput}
                placeholder="Nhập tin nhắn..."
                value={chatInput}
                onChangeText={setChatInput}
              />
              <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
                <Text style={{ color: 'white' }}>Gửi</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => setIsChatVisible(false)}
              style={styles.closeChatBtn}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Chat toggle button */}
      {/* <TouchableOpacity
        style={styles.chatToggle}
        onPress={() => setIsChatVisible(true)}
      >
        <Text style={{ fontWeight: 'bold', color: 'white' }}>💬</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default SearchScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontSize: 18,
  },
  topResult: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    marginRight: 12,
  },
  activeFilterButton: {
    backgroundColor: '#2196F3',
  },
  filterText: {
    color: 'black',
    fontSize: 16,
  },
  activeFilterText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  resultImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginRight: 18,
  },
  resultText: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultSubtitle: {
    fontSize: 16,
    color: 'gray',
  },
  chatToggle: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 52,
    height: 52,
    backgroundColor: '#2196F3',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  chatBox: {
    backgroundColor: 'white',
    height: '65%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },

  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  chatMessage: {
    paddingVertical: 4,
    fontSize: 16,
  },

  chatInputRow: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },

  chatInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 8,
  },

  sendButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },

  closeChatBtn: {
    marginTop: 12,
    alignSelf: 'center',
    backgroundColor: 'gray',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },

});
