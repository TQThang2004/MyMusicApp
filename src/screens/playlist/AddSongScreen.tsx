import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ButtonComponent, RowComponent, SongItemComponent, TextComponent } from '../../components';

const AddSongScreen = () => {
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

  return (
    <View style={styles.container}>
      <RowComponent justifyContent='space-between' styles={{ padding: 20, marginTop: 20 }}>
        <Icon name="chevron-back" size={25}/>
        <TextComponent text='Add Song' color='black' title styles={{ fontSize: 20 }}/>
        <Icon name="search" size={25}/>
      </RowComponent>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
      >
        {results.map((song) => (
          <SongItemComponent
            key={song.id}
            imageUrl={song.image}
            songName={song.title}
            artistName={song.subtitle}
            isButton
            icon={<Icon name="add-circle-outline" size={20} color="#555" />}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default AddSongScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
