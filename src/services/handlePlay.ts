import TrackPlayer from "react-native-track-player";
import { HomeService } from "./homeServices";

export const handlePlay = async (selectedItem: any, list:any, navigation:any) => {

    const fullList = list;
  
    await TrackPlayer.reset();
  
    const tracks = await Promise.all(
      fullList.map(async (item: any) => {
        const songData = await HomeService.fetchSongDetails(item.encodeId);
        if (!songData) return null;
  
        return {
          id: item.encodeId,
          url: songData['128'] || songData['320'] || songData['256'],
          title: item.title,
          artist: item.artistsNames || 'Unknown',
          artwork: item.thumbnailM,
        };
      })
    );
  
    const filteredTracks = tracks.filter((track) => track !== null);
  
    await TrackPlayer.add(filteredTracks);
  
    const index = filteredTracks.findIndex((track: any) => track.id === selectedItem.encodeId);
  
    if (index >= 0) {
      await TrackPlayer.skip(index);
    }
  
    await TrackPlayer.play();
  
    console.log('Playing song:', selectedItem.title);
    navigation.navigate('Song', { song: selectedItem });
  };