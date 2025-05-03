import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import styles from './FavoriteArtistStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebaseConfig';


const FavoriteArtistScreen = ({ navigation }: any) => {

  const [artists, setArtists] = useState<any[]>([]);
  
    useEffect(() => {
      const fetchArtists = async () => {
        try {
          const snapshot = await getDocs(collection(db, 'artists'));
          const fetchedArtists = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setArtists(fetchedArtists);
        } catch (error) {
          console.log('Lỗi khi lấy artists từ Firebase:', error);
        }
      };
  
      fetchArtists();
    }, []);
    
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.item}
        onPress={ () => 
          navigation.navigate('ArtistScreen', { artist: item })
        }
      >
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Ionicons name="chevron-forward" size={20} color="#555" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Favourite Artists</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={artists}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default FavoriteArtistScreen;
