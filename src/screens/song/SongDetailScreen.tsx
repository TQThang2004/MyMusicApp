import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SongDetailScreen = () => {
  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <AntDesign name="down" size={24} />
        <Entypo name="dots-three-horizontal" size={20} />
      </View>

      {/* Album art */}
      <Image
        source={{
          uri: 'https://images.genius.com/c2441e9b5e84e608829ef21a15a6abd4.1000x1000x1.png',
        }}
        style={styles.albumArt}
      />

      {/* Song title and artist */}
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>Headlights</Text>
        <Text style={styles.artist}>Alok & Alan Walker</Text>
      </View>

      {/* Icons under title */}
      <View style={styles.iconRow}>
        <AntDesign name="hearto" size={24} />
        <Entypo name="dots-three-horizontal" size={20} />
      </View>

      {/* Progress */}
      <View style={styles.progressRow}>
        <Text style={styles.timeText}>2:04</Text>
        <Text style={styles.timeText}>3:10</Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <Ionicons name="shuffle" size={24} />
        <Ionicons name="play-skip-back" size={24} />
        <TouchableOpacity style={styles.playButton}>
          <Ionicons name="play" size={32} color="white" />
        </TouchableOpacity>
        <Ionicons name="play-skip-forward" size={24} />
        <Ionicons name="repeat" size={24} />
      </View>
    </View>
  );
};

export default SongDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 60,
    alignItems: 'center',
  },
  topBar: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  albumArt: {
    width: 300,
    height: 300,
    borderRadius: 12,
    marginBottom: 30,
  },
  songInfo: {
    alignItems: 'center',
    marginBottom: 10,
  },
  songTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 16,
    color: 'gray',
    marginTop: 4,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 30,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 14,
    color: 'gray',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  playButton: {
    backgroundColor: '#2196F3',
    padding: 18,
    borderRadius: 40,
  },
});
