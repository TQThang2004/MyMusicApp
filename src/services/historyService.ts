import appInfo from "../constants/appInfo";



export const HistoryService = {

    async addSongToHistory (userId: string, songId: string, title: string, thumbnailM: string, genreIds: any, artist: any)  {
      console.log("addSongToHistory +1",userId, songId, title, thumbnailM, genreIds, artist)
        await fetch(`${appInfo.BASE_URL}/song/history`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, songId, title, thumbnailM, genreIds,artist }),
        });
        console.log("addSongToHistory successful")
      }

};
