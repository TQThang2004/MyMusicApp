import React, { useRef } from 'react';
import {
  Animated,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { ButtonComponent, RowComponent, SongItemComponent, TextComponent } from '../../components';
import Icon from 'react-native-vector-icons/Entypo';
import { appColor } from '../../constants/appColor';

const { height: screenHeight } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = screenHeight * 0.5;
const HEADER_MIN_HEIGHT = screenHeight * 0.3;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

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
  {
    id: '6',
    title: 'Pehla Pyaar',
    subtitle: 'Kabir Singh',
    image: 'https://i.scdn.co/image/ab67616d0000b273c5545f737b16ad5ee767b62a',
  },
  {
    id: '7',
    title: 'Jab Tak',
    subtitle: 'M.S Dhoni: The Untold Story',
    image: 'https://i.ytimg.com/vi/K-Ts-NFR62o/maxresdefault.jpg',
  },
  {
    id: '8',
    title: 'I am Good (Blue)',
    subtitle: 'David Guetta',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9kBGM9omB8Kz0At_gsZg31FWDnYk4ypFUMA&s',
  },
  {
    id: '9',
    title: 'Bol Do Na Zara',
    subtitle: 'Azhar',
    image: 'https://i.ytimg.com/vi/EpEraRui1pc/maxresdefault.jpg',
  },
  {
    id: '10',
    title: 'Jhoome Jo Pathaan',
    subtitle: 'Vishal & Shekhar',
    image: 'https://upload.wikimedia.org/wikipedia/en/8/8b/Jhoome_Jo_Pathaan_song_cover.jpg',
  },
];

const OnePlaylistScreen = () => {

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
          source={require('../../assets/images/playlist.jpg')}
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
          <TextComponent text='Trịnh Quang Thắng' title styles={{ textAlign: 'center' }} />
          <TextComponent text='54 Songs | 15:45:00 mins' styles={{ textAlign: 'center' }} />
          <RowComponent justifyContent='space-around'>
            <ButtonComponent
              text='Shuffle'
              type='primary'
              textStyles={{ color: appColor.textWhite }}
              styles={{ width: '45%', backgroundColor: '#92c0e8' }}
              icon={<Icon name="shuffle" size={20} color={appColor.textWhite} />}
              iconFlex='left'
            />
            <ButtonComponent
              text='Play'
              type='primary'
              textStyles={{ color: appColor.textBlack }}
              styles={{ width: '45%', backgroundColor: '#e3e3e3' }}
              icon={<Icon name='play-outline' color='black' size={20} />}
              iconFlex='left'
            />
          </RowComponent>
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
        {results.map(song => (
          <SongItemComponent
            imageUrl={song.image}
            songName={song.title}
            artistName={song.subtitle}
            isButton
            icon={<Icon name="dots-three-horizontal" size={20} color="#555" />}
          />
        ))}
      </Animated.ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          // TODO: handle thêm bài hát
          console.log('Thêm bài hát được nhấn');
        }}
      >
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
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

