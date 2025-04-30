import appInfo from "../constants/appInfo";


export const LyricService = {


    async fetchLyric(encodeID:string) {
        if (!encodeID) {
            console.error('Invalid encodeId');
            return null;
          }
    
        try {
          console.log('Fetching lyric for ID:', encodeID);
          const response = await fetch(`${appInfo.BASE_URL}/lyric?encodeId=${encodeID}`);
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