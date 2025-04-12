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



const ProfileScreen = () => {

  return (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Profile 👋</Text>
        <Text style={styles.subtitle}>What you want to hear today?</Text>
        <TextInput style={styles.searchInput} placeholder="Search" />
      </View>

      

    

      {/* Popular Songs */}
      <Text style={styles.sectionTitle}>Popular Songs</Text>
    </View>
  )
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

export default ProfileScreen;
