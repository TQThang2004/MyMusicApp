import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FloatingPlayer from '../../components/FloatPlayer';
import TrackPlayer from 'react-native-track-player';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../context/AuthContext';


export default function ProfileScreen({navigation}: any) {

  const [showModal, setShowModal] = useState(false);



const handleLogout = async () => {
  try {
    await auth().signOut();
    console.log('User signed out!');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

  const { user, logout } = useContext(AuthContext);
  console.log(user)
  return (
    <>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cá nhân</Text>
        <Text style={styles.title}>{user.avatar}</Text>
        <View style={styles.icons}>
        <Icon name="notifications-none" size={24} color="#000" style={styles.icon} />
        <Icon
            name="settings"
            size={24}
            color="#000"
            style={styles.icon}
            onPress={() => setShowModal(true)}
          />

        </View>
      </View>

      <View style={styles.profile}>
      <Image
          source={{
            uri: user?.photo
              ? user.photo
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8S3I6KP510EXnPjyEhheLidDuiLGXakMu5g&s',
          }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>{user.username}</Text>
          <Text style={styles.level}>{user.email}</Text>
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


      {/* TouchableOpacity section favorite song */}
      <TouchableHighlight  
        
        underlayColor="gray"
        onPress={() => navigation.navigate('FavoritePlaylist')}
      >
        <View style={styles.openSongButton}>
          <AntDesign name="staro" size={20} color="black" />
          <Text style={styles.openSongText}>Favorite Song</Text>

        </View>
      </TouchableHighlight >

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
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
  level: {  paddingHorizontal: 1, borderRadius: 6, marginTop: 4 },
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
  openSongButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#673AB7',
    // marginHorizontal: 16,
    // marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 16

  },
  openSongText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '300',
    marginLeft: 8,
  },
  logoutButton: {
    
    marginTop: 60,
    marginBottom: 50,
    marginHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ff3b30',
    borderRadius: 10,
    alignItems: 'center',
    opacity:0.9
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});
