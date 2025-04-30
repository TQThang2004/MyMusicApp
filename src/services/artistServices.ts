import appInfo from "../constants/appInfo";


export const ArtistService = {


  async fetchArtist(name: string) {

    try {
      const response = await fetch(`${appInfo.BASE_URL}/api/artist?name=${name}`);
      const data = await response.json();
      return data.data; 
    } catch (error) {
      console.error('Error fetching artist:', error);
      return null;
    }
  },
  
};