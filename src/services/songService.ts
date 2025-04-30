// services/homeServices.ts
import { db } from '../../config/firebaseConfig';
import appInfo from '../constants/appInfo';


export const SongService = {


    async toggleFavoriteService({
        isFavorite,
        userId,
        songId,
    }: {
        isFavorite: boolean;
        userId: string;
        songId: string;
    }) {
        try {
        const endpoint = isFavorite ? 'favorite/song/remove' : 'favorite/song/add';
        const response = await fetch(`${appInfo.BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, songId}),
        });
    
        const data = await response.json();
        return { success: response.ok, message: data.message };
        } catch (error) {
        return { success: false, message: 'Không thể cập nhật bài hát yêu thích' };
        }
    }
  
  
};