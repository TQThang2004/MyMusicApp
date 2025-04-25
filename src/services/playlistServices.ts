// services/homeServices.ts
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

// const IP = '10.0.2.2';
const IP = '192.168.2.5';
const PORT = '5000';

export const PlaylistService = {


  async fetchDetailPlaylist(playlistId:string) {
    if (!playlistId) {
        console.error('Invalid encodeId');
        return null;
      }

    try {
      console.log('Fetching playlist details for ID:', playlistId);
      const response = await fetch(`http://${IP}:${PORT}/api/detailplaylist?playlistId=${playlistId}`);
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Response:', response);
      const data = await response.json();
      console.log('Data:', data);
      return data; 
    } catch (error) {
      console.error('Error fetching song details:', error);
      return null;
    }
  },

  async handleCreatePlaylist(name: string, userId: string) {
    if (!name.trim()) {
      throw new Error("Vui lòng nhập tên playlist");
    }
  
    const response = await fetch(`http://${IP}:${PORT}/api/main/create-playlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.trim(),
        userId,
      }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Có lỗi xảy ra khi tạo playlist");
    }
  
    return data.message; // thành công, trả lại message
  }
  
};