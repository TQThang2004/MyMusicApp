// const IP = '10.0.2.2';
const IP = '192.168.2.5';
const PORT = '5000';

interface IsFavoriteParams {
  userId: string;
  songId: string;
}

export const FavoriteService = {

  async isFavorite({ userId, songId }: IsFavoriteParams) {
    try {
      console.log("UserID:",userId,"songID",songId)
      const url = `http://${IP}:${PORT}/api/song/favorite/isFavorite?userId=${userId}&songId=${songId}`;
      const response = await fetch(url);

      const textResponse = await response.text();
      console.log('Response Text:', textResponse);

      if (!response.ok) {
        throw new Error(textResponse || 'Check favorite failed');
      }

      const data = JSON.parse(textResponse);
      return data.isFavorite;
    } catch (error) {
      console.error('Error checking favorite:', error);
      throw error;
    }
  },

  async addFavorite({ userId, songId, name, thumbnailM }: { userId: string; songId: string; name: string; thumbnailM: string }) {
    try {
      console.log('Adding to favorite:', { userId, songId, name, thumbnailM });  
      if (!thumbnailM) {
        throw new Error("thumbnailM is missing or undefined.");
      }

      const response = await fetch(`http://${IP}:${PORT}/api/song/favorite/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, songId, name, thumbnailM }),
      });
      console.log('Song Detail Response:', response);
      if (!response.ok) {

        
        const errorText = await response.text();
        throw new Error(`Server Error: ${errorText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error adding to favorite:', error.message);
      } else {
        console.error('Error adding to favorite:', error);
      }
      throw error;
    }
  },
  

  async removeFavorite({ userId, songId }: { userId: string; songId: string }) {
    try {
      const response = await fetch(`http://${IP}:${PORT}/api/song/favorite/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, songId }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Xóa khỏi yêu thích thất bại');
      }
      return data;
    } catch (error) {
      console.error('Error removing from favorite:', error);
      throw error;
    }
  },

};
