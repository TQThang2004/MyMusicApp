import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';

const trendingSongs = [
  { id: '1', title: 'Hold Me Closer', artist: 'Britney Spears', image: require('../../assets/images/logo.png') },
  { id: '2', title: 'Under The Influence', artist: 'Chris Brown', image: require('../../assets/images/logo.png') }
];

const topPlaylists = [
  { id: '1', title: 'Bollywood Romance', image: require('../../assets/images/logo.png') },
  { id: '2', title: 'New Music Daily', image: require('../../assets/images/logo.png') }
];

const favoriteArtists = [
  { id: '1', name: 'Armaan Malik', image: require('../../assets/images/logo.png') },
  { id: '2', name: 'Justin Bieber', image: require('../../assets/images/logo.png') },
  { id: '3', name: 'Katy Perry', image: require('../../assets/images/logo.png') }
];

const popularSongs = [
  { id: '1', title: 'Headlights', artist: 'Alok & Alan Walker' },
  { id: '2', title: 'I am Good (Blue)', artist: 'David Guetta' },
  { id: '3', title: 'Besharam Rang', artist: 'Arijit Singh' }
];

const HomeScreen = () => {
  const renderHeader = () => (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Hey John 👋</Text>
        <Text style={styles.subtitle}>What you want to hear today?</Text>
        <TextInput style={styles.searchInput} placeholder="Search" />
      </View>

      {/* Trending Songs */}
      <Text style={styles.sectionTitle}>Trending Song</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {trendingSongs.map(song => (
          <View key={song.id} style={styles.card}>
            <Image source={song.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{song.title}</Text>
            <Text style={styles.cardSubtitle}>{song.artist}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Top Playlists */}
      <Text style={styles.sectionTitle}>Top Playlists</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {topPlaylists.map(playlist => (
          <View key={playlist.id} style={styles.card}>
            <Image source={playlist.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{playlist.title}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Favourite Artists */}
      <Text style={styles.sectionTitle}>Favourite Artists</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favoriteArtists.map(artist => (
          <View key={artist.id} style={styles.artistCard}>
            <Image source={artist.image} style={styles.artistImage} />
            <Text style={styles.cardTitle}>{artist.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Popular Songs */}
      <Text style={styles.sectionTitle}>Popular Songs</Text>
    </View>
  );

  return (
    <FlatList
      data={popularSongs}
      keyExtractor={item => item.id}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <View style={styles.songRow}>
          <Text style={styles.songTitle}>{item.title}</Text>
          <Text style={styles.songArtist}>{item.artist}</Text>
        </View>
      )}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  header: { marginBottom: 20 },
  welcome: { fontSize: 24, fontWeight: 'bold', color: 'black' },
  subtitle: { fontSize: 16, color: 'gray', marginBottom: 10 },
  searchInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 40
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  card: { marginRight: 15, width: 150 },
  cardImage: { width: 150, height: 150, borderRadius: 10 },
  cardTitle: { fontWeight: 'bold', marginTop: 5, color: 'black' },
  cardSubtitle: { color: 'gray' },
  artistCard: { marginRight: 15, alignItems: 'center' },
  artistImage: { width: 80, height: 80, borderRadius: 40 },
  songRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  songTitle: { fontWeight: 'bold', fontSize: 16, color: 'black' },
  songArtist: { color: 'gray' }
});

export default HomeScreen;
