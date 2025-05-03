import appInfo from '../constants/appInfo';


export const ZingChartService = {


  async fetchZingChart() {

    try {
      const response = await fetch(`${appInfo.BASE_URL}/charthome`);
      const data = await response.json();
      return data.data; 
    } catch (error) {
      console.log('Error fetching song details:', error);
      return null;
    }
  },
  
};