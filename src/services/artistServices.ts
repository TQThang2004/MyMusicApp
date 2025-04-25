
// const IP = '10.0.2.2';
const IP = '192.168.2.5';
const PORT = '5000';

export const ArtistService = {


  async fetchArtist(name: string) {

    try {
      const response = await fetch(`http://${IP}:${PORT}/api/artist?name=${name}`);
      const data = await response.json();
      return data.data; 
    } catch (error) {
      console.error('Error fetching artist:', error);
      return null;
    }
  },
  
};