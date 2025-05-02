import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from '../popularSong/PopularSongStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer from 'react-native-track-player';
import { HomeService } from '../../services/homeServices';
import { FavoriteService } from '../../services/favoriteService';
import { AuthContext } from '../../context/AuthContext';
import { handlePlay } from '../../services/handlePlay';

const FavoritePlaylistScreen = ({ navigation}: any) => {

  const [favoriteSongs, setFavoriteSongs] = useState();
  const {user} = useContext(AuthContext)

  useEffect(() => {
      const loadHomeData = async () => {
        const data = await FavoriteService.getAllFavorite(user.id);
        setFavoriteSongs(data)
        console.log('sections favorite', data);
        
      };
      loadHomeData();
    }, []);


  const renderItem = ({ item }: any) => (
    console.log("item",item),
    <TouchableOpacity style={styles.item} key={item.encodeId} onPress={() => handlePlay(item, favoriteSongs,navigation)}>
   
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
            {item.artist || 'Unknown'}
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
        <Text style={styles.title}>Favorite</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={favoriteSongs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default FavoritePlaylistScreen;
