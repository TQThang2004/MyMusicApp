import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // width:360,
      backgroundColor: 'white',
      paddingTop: 60,
      alignItems: 'center',
    },
    topBar: {
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    albumArt: {
      width: 300,
      height: 300,
      borderRadius: 12,
      marginBottom: 30,
    },
    songInfo: {
      alignItems: 'center',
      marginBottom: 10,
    },
    songTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
      backgroundColor: 'white',
    },
    artist: {
      fontSize: 16,
      color: 'gray',
      marginTop: 4,
    },
    iconRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '90%',
      marginBottom: 30,
    },
    progressRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
      marginBottom: 10,
    },
    timeText: {
      fontSize: 14,
      color: 'gray',
    },
    controls: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '80%',
      paddingHorizontal: 20,
      marginTop: 10,
    },
    playButton: {
      backgroundColor: '#2196F3',
      padding: 18,
      borderRadius: 40,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '80%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    playlistItem: {
      padding: 10,
      borderBottomColor: '#ddd',
      borderBottomWidth: 1,
    },
    closeButton: {
      marginTop: 10,
      backgroundColor: 'black',
      padding: 10,
      alignItems: 'center',
      borderRadius: 6,
    },
  });

  export default styles;
  