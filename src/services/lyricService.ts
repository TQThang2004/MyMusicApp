// services/homeServices.ts

// const IP = '10.0.2.2';
const IP = '192.168.2.5';
const PORT = '5000';

export const LyricService = {


    async fetchLyric(encodeID:string) {
        if (!encodeID) {
            console.error('Invalid encodeId');
            return null;
          }
    
        try {
          console.log('Fetching lyric for ID:', encodeID);
          const response = await fetch(`http://${IP}:${PORT}/api/lyric?encodeId=${encodeID}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          // console.log('Data:', data.data.lyric);
          return data.data.lyric; 
        } catch (error) {
          console.error('Error fetching song details:', error);
          return null;
        }
      },
  
  
};