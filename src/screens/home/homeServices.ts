// services/homeServices.ts
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebaseConfig';

const IP = '10.0.2.2';
const PORT = '5000';

export const HomeService = {
  async fetchArtists() {
    try {
      const snapshot = await getDocs(collection(db, 'artists'));
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Lỗi khi lấy artists từ Firebase:', error);
      return [];
    }
  },

  async fetchHomeData() {
    try {
      const response = await fetch(`http://${IP}:${PORT}/api/home`);
      const json = await response.json();
      console.log('json', json.data);
      return json.data?.items || [];
    } catch (error) {
      console.error('Lỗi khi fetch API:', error);
      return [];
    }
  },

  async fetchSongDetails(encodeId: string) {
    if (!encodeId) {
      console.error('Invalid encodeId');
      return null;
    }
    try {
      const response = await fetch(`http://${IP}:${PORT}/api/song?encodeId=${encodeId}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching song details:', error);
      return null;
    }
  },

  async fetchPlaylist(encodeId: string) {
    if (!encodeId) {
      console.error('Invalid encodeId');
      return null;
    }
    try {
      const response = await fetch(`http://${IP}:${PORT}/api/detailplaylist?encodeId=${encodeId}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching playlist details:', error);
      return null;
    }
  }
  
};