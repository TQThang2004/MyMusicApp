import appInfo from "../constants/appInfo";
import { HomeService } from "./homeServices";



export const HistoryService = {

    async addSongToHistory (userId: string, songId: string)  {

      console.log("addhistory",songId)

      
      const songData = await HomeService.fetchInfoSongDetails(songId);
      console.log("addSongToHistory songData",songData)
      const title = songData.title;
      const artist = songData.artistsNames;
      const genreIds = songData.genreIds;
      const thumbnailM = songData.thumbnailM;

        await fetch(`${appInfo.BASE_URL}/song/history`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, songId, title, thumbnailM, genreIds, artist }),
        });
        console.log("addSongToHistory successful")
      }

};
