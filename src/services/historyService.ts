// const IP = '10.0.2.2';
const IP = '192.168.2.5';
const PORT = '5000';


export const HistoryService = {

    async addSongToHistory (userId: string, songId: string, name: string, thumbnailM: string)  {
      console.log("addSongToHistory +1")
        await fetch(`http://${IP}:${PORT}/api/song/history`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, songId, name, thumbnailM }),
        });
        console.log("addSongToHistory successful")
      }

};
