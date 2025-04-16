import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const artistStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'relative',
  },
  artistImage: {
    width: width,
    height: width,
    resizeMode: 'cover',
  },
  backIcon: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 30,
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  artistName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  playButton: {
    backgroundColor: '#3eb6fb',
    padding: 10,
    borderRadius: 30,
  },
  songListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  topSong: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  seeAll: {
    color: '#3eb6fb',
    fontSize: 13,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 12,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  songSubtitle: {
    fontSize: 13,
    color: '#777',
  },
});

export default artistStyles;
