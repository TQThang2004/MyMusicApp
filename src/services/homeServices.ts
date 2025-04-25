// services/homeServices.ts
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

// const IP = '10.0.2.2';
const IP = '192.168.2.5';
const PORT = '5000';

export const HomeService = {

  async fetchArtists() {
    try {
      const snapshot = await getDocs(collection(db, 'artists'));

      snapshot.docs.forEach((doc, i) => {
      });
        
      if (snapshot.empty) {
        console.warn('6. Collection artists trống!');
        return [];
      }
  
      const artists = snapshot.docs.map(doc => {
        // console.log(`7. Xử lý document ${doc.id}:`, doc.data());
        return {
          id: doc.id,
          ...doc.data()
        };
      });
      
      return artists;
    } catch (error) {
      if (error instanceof Error) {
        console.error('8. Lỗi chi tiết:', {
          code: (error as any).code,
          message: error.message,
          stack: error.stack
        });
      } else {
        console.error('8. Lỗi không xác định:', error);
      }
      return [];
    }
  },

  async fetchHomeData() {
    try {
      const response = await fetch(`http://${IP}:${PORT}/api/home`);
      const json = await response.json();
      console.log('fecth Home Data', json.data);
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
  async fetchInfoSongDetails(encodeId: string) {
    if (!encodeId) {
      console.error('Invalid encodeId');
      return null;
    }
    try {
      const response = await fetch(`http://${IP}:${PORT}/api/infosong?encodeId=${encodeId}`);
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
      console.log('Fetching playlist with encodeId:', encodeId);
     
      const response = await fetch(`http://${IP}:${PORT}/api/detailplaylist?playlistId=${encodeId}`);
      console.log("Response raw:", response);
      const data = await response.json();
      console.log("JSON data:", data);
      return data.data;
    } catch (error) {
      console.error('Error fetching playlist details:', error);
      return null;
    }
  }
  
};