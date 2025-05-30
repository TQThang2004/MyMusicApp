import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import TrackPlayer, { useProgress, State, Event } from 'react-native-track-player';
import styles from './SongDetailStyle';
import { AuthContext } from '../../context/AuthContext';
import { FavoriteService } from '../../services/favoriteService';
import { ScrollView } from 'react-native-gesture-handler';
import LyricsScreen from './LyricScreen';
import { Dimensions } from 'react-native';
import { HistoryService } from '../../services/historyService';
import { HomeService } from '../../services/homeServices';
import Icon from 'react-native-vector-icons/Ionicons';
import appInfo from '../../constants/appInfo';
import { useFocusEffect } from '@react-navigation/native';
import { SongItemComponent } from '../../components';


const SongDetailScreen = ({ navigation, route }: any) => {
  const {user} = useContext(AuthContext)
  const { song } = route.params;
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSong, setCurrentSong] = useState(song);
  const [liked, setLiked] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const progress = useProgress();
  const [myPlaylists, setMyPlaylists] = useState<{ id: string, name:string,thumbnail:string, songs:[] }[]>([])
  const { width } = Dimensions.get('window');
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);




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

  useEffect(() => {
    if (currentSong?.encodeId) {
      console.log("current song encodeID",currentSong.encodeId)
      checkIfLiked();
    }
  }, [currentSong.encodeId]);
  
  

  const handleLikePress = async () => {
    try { 
      console.log("handleLikePress",currentSong)
      if (!liked) {
        await FavoriteService.addFavorite({
          userId: user.id,
          songId: currentSong.encodeId,
          title: currentSong.title,
          thumbnailM: currentSong.thumbnailM,
          genreIds: currentSong.genreIds,
          artist: currentSong.artistsNames
        });
      } else {
        await FavoriteService.removeFavorite({
          userId: user.id,
          songId: currentSong.encodeId,
        });
      }
      setLiked(!liked)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra';
      Alert.alert('❌ Lỗi', errorMessage);
    }
  };

  const handleShuffle = () => {
    setIsShuffle(!isShuffle)
  }

  const checkIfLiked = async () => {
    try {
      console.log("checkIfLiked",song.encodeId)
      console.log("checkIfLiked",user.id)
      const isFav = await FavoriteService.isFavorite({
        userId: user.id,
        songId: currentSong.encodeId,
      });
      console.log("isFav",isFav)
      setLiked(isFav);
    } catch (error) {
      console.log('Error checking if song is liked:', error);
    }
  };

  async function skipToNext() {
      try {
        if (isShuffle) {
          const queue = await TrackPlayer.getQueue();
          if (queue.length > 0) {
            const randomIndex = Math.floor(Math.random() * queue.length);
            await TrackPlayer.skip(randomIndex);

          }
        } else {
          await TrackPlayer.skipToNext();
        }
      } catch (error) {
        console.log('Error skipping to next track:', error);
      }
    }
    

  async function skipToPrevious() {
    await TrackPlayer.skipToPrevious();
  }

  async function setupPlayer() {
    try {
      const trackIndex = await TrackPlayer.getCurrentTrack();
  
      if (trackIndex === null) {
        console.log('No track is currently playing.');
        return;
      }
  
      const trackObject = await TrackPlayer.getTrack(trackIndex);
      
  
      if (trackObject) {
        console.log("Title trackObject:",trackObject);
        const songData = await HomeService.fetchInfoSongDetails(trackObject.id||trackObject.encodeId)
        console.log("songData", songData)
        
        // Update the current song details based on track
        setCurrentSong({
          encodeId: trackObject.id,
          title: trackObject.title|| trackObject.name,
          artistsNames: songData.artistsNames || "unknow" ,
          thumbnailM: trackObject.thumbnailM,
          url: trackObject.url,
          genreIds: songData?.genreIds
        });
        console.log('Updated currentSong:', trackObject);
      } else {
        console.log('Track not found.');
      }
    } catch (error) {
      console.log('Error setting up player:', error);
    }
  }
  

  useEffect(() => {
    const trackChangedListener = TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async ({ nextTrack }) => {
      
      const currentTrack = await TrackPlayer.getCurrentTrack();
      if (isRepeat) {    
          await TrackPlayer.seekTo(0);
          await TrackPlayer.play();
      } 
      else if(currentTrack) {
          const selectedItem = await TrackPlayer.getTrack(currentTrack);
          console.log("Track Changed, Current Track:", selectedItem)
          if(selectedItem){
            HistoryService.addSongToHistory(
              user.id,
              selectedItem.id,
            ).catch(error => console.log('Failed to add to history:', error));
          }
      }
      setupPlayer()
        
    });
  
    return () => {
      trackChangedListener.remove();
    };
  }, [isRepeat]);
  

  useEffect(() => {
    setupPlayer();
  }, []);

  const seekTo = async (value: number) => {
    await TrackPlayer.seekTo(value);
  };


  const fetchPlaylists = async () => {
    try {
      console.log('Fetching playlists for user ID:', user.id);
      const response = await fetch(`${appInfo.BASE_URL}/main/get-playlist/${user.id}`);
      const data = await response.json();
      console.log('MyPlaylist data:', data);
      setMyPlaylists(data.playlist.result);
    } catch (error) {
      console.log('Lỗi khi tải playlist:', error);
    }
  };
  
  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        fetchPlaylists();
      }
    }, [user?.id])
  );

  const handleAddSong = async (songId: string, playlistId:string) => {
    try {
      const response = await fetch(`${appInfo.BASE_URL}/main/add-song-to-playlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: user.id,
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
      console.log('Lỗi khi thêm bài hát:', error);
      Alert.alert('Lỗi', 'Không thể thêm bài hát vào playlist');
    }
  };

  return (
      
        <ScrollView 
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{ flexGrow: 1 }}
        >
            <View style={{ ...styles.container, width }}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="down" size={24} />
            </TouchableOpacity>
            
          </View>

          <Image
            source={{ uri: currentSong.thumbnailM}}
            style={styles.albumArt}
          />

          <View style={styles.songInfo}>
            <Text style={styles.songTitle}>{currentSong.title}</Text>
            <Text style={styles.artist}>
            {(() => {
              if (Array.isArray(currentSong.artists)) {
                return currentSong.artists.join(', ');
              } else if (currentSong.artistsNames) {
                return currentSong.artistsNames;
              } else if (currentSong.artist) {
                return currentSong.artist;
              } else if (currentSong.name) {
                return currentSong.artist;
              } else {
                return 's';
              }
            })()}
            </Text> 
          </View>

            <View style={styles.iconRow}>
            <TouchableOpacity onPress={handleLikePress}>
              <AntDesign
                name={liked ? 'heart' : 'hearto'} 
                size={24}
                color={liked ? 'red' : 'black'}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={openModal}>
                <Icon name="add-circle-outline" size={30} color="#555" />
            </TouchableOpacity>


            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                <Pressable style={styles.modalContainer} onPress={() => {}}>
                  <Text style={styles.modalTitle}>Add to Playlist</Text>
                  {myPlaylists.length > 0 ? (
                    myPlaylists.map((playlist, index) => (
                      // <TouchableOpacity
                      //   key={index}
                      //   style={styles.playlistItem}
                      //   onPress={() => handleAddSong(currentSong.encodeId, playlist.id)}

                      // >
                      //   <Text>{playlist.name}</Text>
                      // </TouchableOpacity>
                      <SongItemComponent
                      key={playlist.id}
                      imageUrl={playlist.thumbnail}
                      songName={playlist.name}
                      artistName={user.username}
                      onPress={() => handleAddSong(currentSong.encodeId, playlist.id)}
                    />
                    ))
                  ) : (
                    <Text style={{ color: '#999' }}>Bạn chưa có playlist nào</Text>
                  )}
                  {/* <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                    <Text style={{ color: 'white' }}>Close</Text>
                  </TouchableOpacity> */}
                </Pressable>
              </Pressable>
            </Modal>



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
            <TouchableOpacity onPress={handleShuffle}>
              <Ionicons name="shuffle" size={24} color={isShuffle?'green': 'black'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={skipToPrevious}>
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

            <TouchableOpacity onPress={skipToNext}>
              <Ionicons name="play-skip-forward" size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsRepeat(!isRepeat)}>
                <MaterialIcons
                  name= {isRepeat ? 'repeat-one' : 'repeat'}
                  size={22}
                  color={isRepeat ? 'green' : 'black'}
                />
              </TouchableOpacity>
          </View>
        </View>


        <View style={{ width }}>
        <LyricsScreen encodeId={currentSong.encodeId} />
        </View>

        </ScrollView>
    
  );
};

export default SongDetailScreen;

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};
