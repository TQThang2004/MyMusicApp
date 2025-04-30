import appInfo from "../constants/appInfo";



export const HistoryService = {

    async addSongToHistory (userId: string, songId: string, name: string, thumbnailM: string, genreIds?: any)  {
      console.log("addSongToHistory +1")
        await fetch(`${appInfo.BASE_URL}/song/history`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, songId, name, thumbnailM, genreIds }),
        });
        console.log("addSongToHistory successful")
      }

};
