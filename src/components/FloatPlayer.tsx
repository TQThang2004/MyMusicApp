import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import TrackPlayer, { usePlaybackState, useTrackPlayerEvents, Event, State } from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface FloatingPlayerProps {
  onPress: () => void;
  style?: object; // <== thêm dòng này
}

const FloatingPlayer = ({ onPress, style }: FloatingPlayerProps) => {
  const playbackState = usePlaybackState();
  const [track, setTrack] = useState<any>(null);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async () => {
    const index = await TrackPlayer.getCurrentTrack();
    const currentTrack = index !== null ? await TrackPlayer.getTrack(index) : null;
    setTrack(currentTrack);
    console.log('Track in FloatingPlayer:', track);

  });

  useEffect(() => {
    const fetchTrack = async () => {
      const index = await TrackPlayer.getCurrentTrack();
      if (index !== null) {
        const currentTrack = await TrackPlayer.getTrack(index);
        setTrack(currentTrack);
        console.log('Track in FloatingPlayer:', track);

      }
    };
    fetchTrack();
  }, []);

  const togglePlayback = async () => {
    const currentState = await TrackPlayer.getState();
    if (currentState === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  if (!track) return null;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Image source={{ uri: track.thumbnailM }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>{track.title}</Text>
        {/* <Text numberOfLines={1} style={styles.artist}>{track.artist || ''}</Text> */}
        <Text style={styles.artist}>
        {(() => {
          if (Array.isArray(track.artists)) {
            return track.artists.map((a: { name: any; }) => a.name || a).join(', ');
          } else if (track.artistsNames) {
            return track.artistsNames;
          } else if (Array.isArray(track.artist)) {
            return track.artist.map((a: { name: any; }) => a.name || a).join(', ');
          } else if (typeof track.artist === 'string') {
            return track.artist;
          } else if (typeof track.artist === undefined) {
            return "track.artist";
          } else if (track.name) {
            return track.name;
          } else {
            console.log("track.ảtist",track.artist)
            return 'Unknown';
          }
        })()}

            </Text> 
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={togglePlayback}>
          <Ionicons
            name={playbackState === State.Playing ? 'pause' : 'play'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToNext}>
          <Ionicons name="play-skip-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default FloatingPlayer;


import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 55,
    left: 5,
    right: 5,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  artist: {
    color: '#bbb',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    gap: 10,
    marginLeft: 10,
  },
});


