import React, { use, useEffect, useRef, useState } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { ButtonComponent, RowComponent, SongItemComponent, TextComponent } from '../../components';
import Icon from 'react-native-vector-icons/Entypo';
import { appColor } from '../../constants/appColor';
import { PlaylistService } from '../../services/playlistServices';
import { HomeService } from '../../services/homeServices';
import TrackPlayer from 'react-native-track-player';
import FloatingPlayer from '../../components/FloatPlayer';

const { height: screenHeight } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = screenHeight * 0.5;
const HEADER_MIN_HEIGHT = screenHeight * 0.3;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


const OnePlaylistScreen = ({route, navigation}:any) => {

  const [list, setList] = useState<{ thumbnailM: string;encodeId:string, title: string; artistsNames: string }[]>([]);

  const { playlist } = route.params;
  console.log('Playlist:', playlist);
  console.log('encodeId Playlist', playlist.encodeId);
  
  useEffect(() => {
    console.log('Playlist ID:', playlist.encodeId);
    const fetchPlaylistDetails = async () => { 
      try {
        const playlistObj = await PlaylistService.fetchDetailPlaylist(playlist.encodeId);
        console.log('Playlist details:', playlistObj.data.song.items);
        setList(playlistObj.data.song.items);
      } catch (error) {
        console.error('Error fetching playlist details:', error);
      }  
     }
     fetchPlaylistDetails();
    },[]);


    const handlePlay = async (selectedItem: any, list: { thumbnailM: string; encodeId: string; title: string; artistsNames: string; }[], navigation: any) => {

      const fullList = list;
    
      await TrackPlayer.reset();
    
      const tracks = await Promise.all(
        fullList.map(async (item: any) => {
          const songData = await HomeService.fetchSongDetails(item.encodeId);
          if (!songData) return null;
    
          return {
            id: item.encodeId,
            url: songData['128'] || songData['320'] || songData['256'],
            title: item.title,
            artist: item.artistsNames || 'Unknown',
            artwork: item.thumbnailM,
          };
        })
      );
    
      const filteredTracks = tracks.filter((track) => track !== null);
    
      await TrackPlayer.add(filteredTracks);
    
      const index = filteredTracks.findIndex((track: any) => track.id === selectedItem.encodeId);
    
      if (index >= 0) {
        await TrackPlayer.skip(index);
      }
    
      await TrackPlayer.play();
    
      console.log('Playing song:', selectedItem.title);
      navigation.navigate('Song', { song: selectedItem });
    };



  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-HEADER_MAX_HEIGHT, 0, HEADER_SCROLL_DISTANCE],
    outputRange: [2, 1, 1],
    extrapolate: 'clamp',
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0],
    extrapolate: 'clamp',
  });

  return (

    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {/* Animated Header */}

      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: headerTranslate }] },
        ]}
      >
        <Animated.Image
          source={{uri: playlist.thumbnailM}}
          style={[
            styles.backgroundImage,
            { transform: [{ scale: imageScale }] },
          ]}
        />
        <Animated.View
          style={[
            styles.overlay,
            {
              transform: [{ translateY: titleTranslateY }],
            },
          ]}
        >
          {/* <TextComponent text={`${playlist.title}`} title styles={{ textAlign: 'center' }} /> */}
          {/* <RowComponent justifyContent='space-around' styles={{ height: 50 }}>
            <ButtonComponent
              text='Shuffle'
              type='primary'
              textStyles={{ color: appColor.textWhite }}
              styles={{ width: '45%', backgroundColor: '#92c0e8' }}
              icon={<Icon name="shuffle" size={15} color={appColor.textWhite} />}
              iconFlex='left'
            />
            <ButtonComponent
              text='Play'
              type='primary'
              textStyles={{ color: appColor.textBlack }}
              styles={{ width: '45%', backgroundColor: '#e3e3e3' }}
              icon={<Icon name="controller-play" size={20} color={appColor.textBlack} />}
              iconFlex='left'
            />
          </RowComponent> */}
        </Animated.View>
      </Animated.View>

      {/* Song list */}
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        style={{ paddingHorizontal: 20, paddingVertical: 10 }}
      >

    <TextComponent text={`${list.length} songs`} styles={{ textAlign: 'center',color:'black' }} />

        {list.map(song => (
          <SongItemComponent
            key={song.encodeId}
            imageUrl={song.thumbnailM}
            songName={song.title}
            artistName={song.artistsNames}
            onPress={() => handlePlay(song, list, navigation)}
            isButton
            icon={<Icon name="dots-three-horizontal" size={20} color="#555" />}
          />
        ))}
      </Animated.ScrollView>
      {/* <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          // TODO: handle thêm bài hát
          console.log('Thêm bài hát được nhấn');
        }}
      >
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity> */}

      <FloatingPlayer
                onPress={() =>
                navigation.navigate('Song', { song: TrackPlayer.getCurrentTrack })
            }
          /> 

          
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: HEADER_MAX_HEIGHT,
    zIndex: 1,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: HEADER_MAX_HEIGHT,
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    left: 16,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#ddd',
    fontSize: 14,
    marginVertical: 4,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#92c0e8',
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    elevation: 5,
  },
});

export default OnePlaylistScreen;

