import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

const filters = ['All', 'Artist', 'Album', 'Playlist'];

const results = [
  {
    id: '1',
    title: 'Pehla Pyaar',
    subtitle: 'Kabir Singh',
    image: 'https://i.scdn.co/image/ab67616d0000b273c5545f737b16ad5ee767b62a',
  },
  {
    id: '2',
    title: 'Jab Tak',
    subtitle: 'M.S Dhoni: The Untold Story',
    image: 'https://i.ytimg.com/vi/K-Ts-NFR62o/maxresdefault.jpg',
  },
  {
    id: '3',
    title: 'I am Good (Blue)',
    subtitle: 'David Guetta',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9kBGM9omB8Kz0At_gsZg31FWDnYk4ypFUMA&s',
  },
  {
    id: '4',
    title: 'Bol Do Na Zara',
    subtitle: 'Azhar',
    image: 'https://i.ytimg.com/vi/EpEraRui1pc/maxresdefault.jpg',
  },
  {
    id: '5',
    title: 'Jhoome Jo Pathaan',
    subtitle: 'Vishal & Shekhar',
    image: 'https://upload.wikimedia.org/wikipedia/en/8/8b/Jhoome_Jo_Pathaan_song_cover.jpg',
  },
];

const SearchScreen = ({navigation}:any) => {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        style={styles.searchInput}
        placeholderTextColor="#999"
      />

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
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.resultRow}
      onPress={() => navigation.navigate('SongDetailScreen')}
    >
      <Image source={{ uri: item.image }} style={styles.resultImage} />
      <View style={styles.resultText}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <Text style={styles.resultSubtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  )}
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
  searchInput: {
    backgroundColor: '#F0F0F0',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 18,
    marginBottom: 24,
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
