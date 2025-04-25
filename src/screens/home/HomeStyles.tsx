import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
  container: { paddingBottom: 20, backgroundColor: '#fff' },
  header: { marginBottom: 20, marginTop: 50, paddingHorizontal: 16 },
  welcome: { fontSize: 24, fontWeight: 'bold', color: 'black' },
  subtitle: { fontSize: 16, color: 'gray', marginBottom: 10 },
  searchInput: {
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 40,
    fontSize: 14,
    color: '#000',
  },
  flex:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  textSeeAll: {
    fontSize: 13,
    color: '#3eb6fb',
    paddingRight: 16,
    paddingTop: 6,
  },
  bottom: {
    height: 350,
    width: '100%',
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  card: { marginRight: 15, width: 140 },
  cardPlaylist: { marginRight: 15, width: 130 },
  cardImage: {
    width: 130,
    height: 130,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  trendingImage: {
    width: 140,
    height: 140,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  cardTitle: { fontWeight: '400', marginTop: 5, color: 'black', fontSize: 14 },
  cardSubtitle: { color: 'gray', fontSize: 12 },
  artistCard: { marginRight: 15, alignItems: 'center' },
  artistImage: { width: 80, height: 80, borderRadius: 40 },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 12,
    resizeMode: 'cover',
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  songArtist: {
    fontSize: 14,
    color: '#777',
  },
  options: {
    fontSize: 24,
    color: '#555',
    paddingHorizontal: 8,
  },
  
});

export default homeStyles;
