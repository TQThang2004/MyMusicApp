import appInfo from "../constants/appInfo";


interface IsFavoriteParams {
  userId: string;
  songId: string;
}

export const FavoriteService = {

  async isFavorite({ userId, songId }: IsFavoriteParams) {
    try {
      console.log("UserID:",userId,"songID",songId)
      const url = `${appInfo.BASE_URL}/song/favorite/isFavorite?userId=${userId}&songId=${songId}`;
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

  async addFavorite({ userId, songId, name, thumbnailM, genreIds }: { userId: string; songId: string; name: string; thumbnailM: string;genreIds: string }) {
    try {
      console.log('Adding to favorite:', { userId, songId, name, thumbnailM , genreIds});  
      if (!thumbnailM) {
        throw new Error("thumbnailM is missing or undefined.");
      }

      const response = await fetch(`${appInfo.BASE_URL}/song/favorite/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, songId, name, thumbnailM, genreIds }),
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
      const response = await fetch(`${appInfo.BASE_URL}/song/favorite/remove`, {
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
