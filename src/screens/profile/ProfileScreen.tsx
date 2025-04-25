import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FloatingPlayer from '../../components/FloatPlayer';
import TrackPlayer from 'react-native-track-player';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../context/AuthContext';


export default function ProfileScreen(navigation: any) {


const handleLogout = async () => {
  try {
    await auth().signOut();
    console.log('User signed out!');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

  const { user, logout } = useContext(AuthContext);
  return (
    <>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cá nhân</Text>
        <View style={styles.icons}>
          <Icon name="settings" size={24} color="#000" style={styles.icon} />
          <Icon name="notifications-none" size={24} color="#000" style={styles.icon} />
          <Icon name="search" size={24} color="#000" style={styles.icon} />
        </View>

      </View>

      <View style={styles.profile}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8S3I6KP510EXnPjyEhheLidDuiLGXakMu5g&s' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>Nguyễn Hồng Phúc</Text>
          <Text style={styles.level}>BASIC</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.upgradeBox}>
        <Text style={styles.upgradeTitle}>Zing MP3 PLUS</Text>
        <Text>Miễn phí 7 ngày đầu tiên - Nghe nhạc không quảng cáo</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Trải nghiệm nâng cao</Text>
      <View style={styles.features}>
        <TouchableOpacity style={styles.featureBox}>
          <Icon name="tune" size={30} color="#FF6D00" />
          <Text style={styles.featureText}>Tùy chỉnh giao diện</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.featureBox}>
          <Icon name="graphic-eq" size={30} color="#00B0FF" />
          <Text style={styles.featureText}>Âm thanh vượt trội</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Cá nhân</Text>
    </ScrollView>
    <FloatingPlayer
                onPress={() =>
                navigation.navigate('Song', { song: TrackPlayer.getCurrentTrack })
            }
          /> 
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 20 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center',
  },
  title: { fontSize: 22, fontWeight: 'bold' },
  icons: { flexDirection: 'row' },
  icon: { marginLeft: 10 },
  profile: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 12 },
  name: { fontSize: 18, fontWeight: '600' },
  level: { width:42,backgroundColor: '#ddd', paddingHorizontal: 1, borderRadius: 6, marginTop: 4 },
  upgradeBox: {
    margin: 16, padding: 16, backgroundColor: '#e3d9ff', borderRadius: 12,
  },
  upgradeTitle: { fontWeight: 'bold', color: '#673AB7', marginBottom: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginLeft: 16, marginTop: 20 },
  features: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  featureBox: { alignItems: 'center', padding: 16 , borderRadius: 12, backgroundColor: '#f9f9f9'},
  featureText: { marginTop: 8 },
  songBar: {
    flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#f2f2f2',
    borderTopWidth: 1, borderColor: '#ccc',
  },
  songImage: { width: 50, height: 50, borderRadius: 4, marginRight: 12 },
});
