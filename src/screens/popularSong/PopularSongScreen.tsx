import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './PopularSongStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer from 'react-native-track-player';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebaseConfig';

const PopularSongScreen = ({ navigation}: any) => {
  
  const [popularSongs, setPopularSongs] = useState<any[]>([]);

  useEffect(() => {
    const fetchPopularSongs = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'songs'));
        const songs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPopularSongs(songs);
      } catch (error) {
        console.error('Lỗi khi lấy popularSongs từ Firebase:', error);
      }
    };

    fetchPopularSongs();
  }, []);

  const handlePlay = async (item: any) => {
      console.log("🎵 Playing from Firebase:", item.title);
    
      await TrackPlayer.reset();
    
      await TrackPlayer.add({
        id: item.id,
        url: item.url128, // dùng url128 từ Firebase
        title: item.title,
        artist: item.artists || 'Unknown',
        artwork: item.thumbnail, // từ Firebase
      });
    
      await TrackPlayer.play();
    
      navigation.navigate('Song', { song: item });
    };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePlay(item)}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <Image source={{ uri: item.image || item.thumbnail }} style={styles.image} />
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
            {item.artists}
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
        <Text style={styles.title}>Popular Songs</Text>
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
