import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import TrackPlayer, { usePlaybackState, useProgress, State } from 'react-native-track-player';
import styles from './SongDetailStyle';

const SongDetailScreen = ({ navigation, route }: any) => {
  const { song } = route.params;
  const [isPlaying, setIsPlaying] = useState(true);
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const togglePlayPause = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      await TrackPlayer.pause();
      setIsPlaying(false);
    } else if (state === State.Paused || state === State.Ready) {
      await TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  const seekTo = async (value: number) => {
    await TrackPlayer.seekTo(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="down" size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="dots-three-horizontal" size={20} />
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: song.image || song.thumbnailM || song.artwork }}
        style={styles.albumArt}
      />

      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{song.title}</Text>
        <Text style={styles.artist}>
          {Array.isArray(song.artists)
            ? song.artists.map((a: { name: any; }) => a.name).join(', ')
            : (song.artists?.name || song.artists || 'Unknown')}
        </Text>
      </View>

      <View style={styles.iconRow}>
        <TouchableOpacity>
          <AntDesign name="hearto" size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="dots-three-horizontal" size={20} />
        </TouchableOpacity>
      </View>

      <Slider
        style={{ width: '80%', height: 40 }}
        minimumValue={0}
        maximumValue={progress.duration || 1}
        value={progress.position}
        minimumTrackTintColor="#1FB28A"
        maximumTrackTintColor="#000000"
        onSlidingComplete={seekTo}
      />

      <View style={styles.progressRow}>
        <Text style={styles.timeText}>{formatTime(progress.position)}</Text>
        <Text style={styles.timeText}>{formatTime(progress.duration)}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity>
          <Ionicons name="shuffle" size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="play-skip-back" size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.playButton}
          onPress={togglePlayPause}
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={32}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="play-skip-forward" size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="repeat" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SongDetailScreen;

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};
