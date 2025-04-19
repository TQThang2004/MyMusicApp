import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

const filters = ['All', 'Artist', 'Album', 'Playli'];
const IP = '10.0.2.2';
const PORT = '5000';

const SearchScreen = ({ navigation }: any) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

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
        `http://${IP}:${PORT}/api/search?keyword=${encodeURIComponent(query)}`
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
          artist:
            song.artistsNames || song.artists?.map((a: any) => a.name).join(', '),
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
      console.error('Search error:', err);
      setResults([]);
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.resultRow}
      onPress={() =>
        item.type === 'artist'
          ? navigation.navigate('ArtistScreen', { artistId: item.id })
          : navigation.navigate('SongDetailScreen', { songId: item.id })
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

  return (
    <View style={styles.container}>
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

      <Text style={styles.topResult}>Top Result</Text>

      <View style={styles.filterRow}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setActiveFilter(filter)}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.activeFilterButton,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
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
    paddingVertical: 14,
    fontSize: 18,
  },
  topResult: {
    fontSize: 22,
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
});
