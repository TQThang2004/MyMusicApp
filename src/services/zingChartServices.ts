// services/homeServices.ts
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

// const IP = '10.0.2.2';
const IP = '192.168.2.5';
const PORT = '5000';

export const ZingChartService = {


  async fetchZingChart() {

    try {
      const response = await fetch(`http://${IP}:${PORT}/api/charthome`);
      const data = await response.json();
      return data.data; 
    } catch (error) {
      console.error('Error fetching song details:', error);
      return null;
    }
  },
  
};