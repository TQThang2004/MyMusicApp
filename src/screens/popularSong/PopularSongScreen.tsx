import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './PopularSongStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer from 'react-native-track-player';
import { HomeService } from '../../services/homeServices';

const PopularSongScreen = ({ route, navigation}: any) => {

  const { popularSongs } = route.params;
  console.log('popularSongs', popularSongs);
  console.log('route.params', popularSongs[0]);
  

   // Player logic
   const handlePlay = async (item: any) => {
    const songData = await HomeService.fetchSongDetails(item.encodeId);
    if (!songData) return;

    console.log('songData', songData);

    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: item.id,
      url: songData['128'] || songData['320'] || songData['256'],
      title: item.title,
      artist: item.artist || '',
      artwork: item.thumbnailM,
    });
    await TrackPlayer.play();
    console.log('Playing song:', item.title);
    navigation.navigate('Song', { song: item });
  };

  const renderItem = ({ item }: any) => (
    console.log("item",item),
    <TouchableOpacity style={styles.item} key={item.id} onPress={() => handlePlay(item)}>
   
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <Image source={{ uri: item.image || item.thumbnailM }} style={styles.image} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text
            style={styles.nameSong}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.title}
          </Text>
          <Text
            style={styles.name}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.artistsNames || 'Unknown'}
          </Text>
        </View>
      </View>
      <TouchableOpacity>
        <Text style={styles.options}>⋯</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>New Release</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={popularSongs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default PopularSongScreen;
