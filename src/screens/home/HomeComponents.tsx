// components/HomeComponents.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import homeStyles from './HomeStyles';
import ZingChartScreen from '../../screens/zingChart/zingChart';

const HomeComponents = (props: any) => (

  <View>
    {/* Header */}
    <View style={homeStyles.header}>
      <Text style={homeStyles.welcome}>Hey You 👋</Text>
      <Text style={homeStyles.subtitle}>What do u  want to hear today?</Text>
      <Pressable
        style={homeStyles.searchInput}
        onPress={() => props.navigation.navigate('Search')}
      >
        <Text style={{ color: '#999',paddingTop: 8 }}>Search for songs, artists...</Text>
    </Pressable>
      
    </View>


    {/* Recommend*/}
    {props.recommendation?.length > 0 && (
      <>
        <View style={homeStyles.flex}>
          <Text style={homeStyles.sectionTitle}>Recommend for you</Text>
          <TouchableOpacity onPress={() => 
              {
                console.log("Props: -------",props)
                props.navigation.navigate('PopularSong', { popularSongs: props.recommendation }) 
                console.log("recommedn: -------",props.recommendation)
              }
              }>
            <Text style={homeStyles.textSeeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 10 }}>
          {props.recommendation.map((playlist: any) => (
            <TouchableOpacity
              key={playlist.encodeId}
              onPress={() => props.handlePlay(playlist,"recommend")}
            >
              <View style={homeStyles.card}>
                <Image
                  source={{ uri: playlist.thumbnailM }}
                  style={homeStyles.cardImage}
                />
                <Text style={homeStyles.cardTitle} numberOfLines={1}>
                  {playlist.name||playlist.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </>
    )}
    {/* New Release */}
    {props.newReleaseSongs?.length > 0 && (
      <>
        <View style={homeStyles.flex}>
          <Text style={homeStyles.sectionTitle}>New Release</Text>
          <TouchableOpacity onPress={() => 
              {
                console.log("Props: -------",props)
                props.navigation.navigate('PopularSong', { popularSongs: props.newReleaseSongs }) 
                console.log("PopularSong: -------",props.newReleaseSongs)
              }
              }>
            <Text style={homeStyles.textSeeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 10 }}>
          {props.newReleaseSongs.map((playlist: any) => (
            <TouchableOpacity
              key={playlist.encodeId}
              onPress={() => props.handlePlay(playlist,"new-release")}
            >
              <View style={homeStyles.card}>
                <Image
                  source={{ uri: playlist.thumbnailM }}
                  style={homeStyles.cardImage}
                />
                <Text style={homeStyles.cardTitle} numberOfLines={1}>
                  {playlist.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </>
    )}

    

    {/* Chill Playlists - Only show if data exists */}
    {props.chillPlaylists?.length > 0 && (
        <>
          <View style={homeStyles.flex}>
            <Text style={homeStyles.sectionTitle}>Chill</Text>
            <TouchableOpacity onPress={() => 
              {
                console.log("Chill Playlists: -------",props.chillPlaylists)
                props.navigation.navigate('Playlist', { playlists: props.chillPlaylists }) 
                
              }
              }>
              <Text style={homeStyles.textSeeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 10 }}>
            {props.chillPlaylists.map((playlist:any) => (
                <TouchableOpacity
                    key={playlist.encodeId}
                    onPress={() => 
                      {
                        console.log("Playlist EncodeId sdasd: -------",playlist.encodeId)
                        props.navigation.navigate('OnePlaylist', { playlist })
                        console.log("Playlist: -------",playlist)
                        // props.handlePlayPlaylist(playlist.encodeId, 0)
                      }               
                    }  
                >
                    <View key={playlist.encodeId} style={homeStyles.card}>
                        <Image
                        source={{ uri: playlist.thumbnailM}} 
                        style={homeStyles.cardImage}
                        />
                        <Text style={homeStyles.cardTitle} numberOfLines={1}>
                        {playlist.sortDescription}
                        </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
    {/* Artists - Only show if data exists */}
    {props.artists?.length > 0 && (

        console.log("props: -------",props),
        <>
          <View style={homeStyles.flex}>
            <Text style={homeStyles.sectionTitle}>Artists</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('FavoriteArtist')}>
              <Text style={homeStyles.textSeeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 10 }}>
            {props.artists.map((artist:any) => (
              <TouchableOpacity 
                key={artist.id} 
                style={homeStyles.artistCard}
                onPress={() => props.navigation.navigate('ArtistScreen', { artist })}
              >
                <Image 
                  source={{ uri: artist.thumbnail }} 
                  style={homeStyles.artistImage} 
                />
                <Text style={homeStyles.cardTitle}>{artist.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
  
    
    {/* Zing Chart */}
    {props.zingChart?.length > 0 && (
      <View>
       <ZingChartScreen songs={props.zingChart} navigation={props.navigation}/>

      </View>
    )}

    {/* Top 100 Playlists */}
    {props.top100?.length > 0 && (
      console.log("Top 100 Playlists ssssssssssss: -------",props.top100),
        <>
          <View style={homeStyles.flex}>
            <Text style={homeStyles.sectionTitle}>Top 100</Text>
            <TouchableOpacity onPress={() => 
              {
                props.navigation.navigate('Playlist', { playlists: props.top100 }) 
                console.log("Top 100 Playlists: -------",props.top100)
              }
              }>
              <Text style={homeStyles.textSeeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 10 }}>
            {props.top100.map((playlist:any) => (
                <TouchableOpacity
                    key={playlist.encodeId}
                    onPress={() => 
                      {
                        console.log("Playlist EncodeId sdasd: -------",playlist.encodeId)
                        props.navigation.navigate('OnePlaylist', { playlist })
                        console.log("Playlist: -------",playlist)
                        // props.handlePlayPlaylist(playlist.encodeId, 0)
                      }               
                    }  
                >
                    <View key={playlist.encodeId} style={homeStyles.card}>
                        <Image
                        source={{ uri: playlist.thumbnailM}} 
                        style={homeStyles.cardImage}
                        />
                        <Text style={homeStyles.cardTitle} numberOfLines={1}>
                        {playlist.sortDescription}
                        </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )
      }


      <View style={homeStyles.bottom}>
        <Text style={homeStyles.sectionTitle}></Text>
      </View>
        
  </View>

  

  
);

export default HomeComponents;

// SongItem component
HomeComponents.SongItem = ({ item, handlePlay, handleOpenBottomSheet }: any) => (
  <TouchableOpacity onPress={() => handlePlay(item)}>
    <View style={homeStyles.songItem}>
      <Image
        source={{ uri: item.thumbnail }}
        style={homeStyles.songImage}
      />
      <View style={{ ...homeStyles.songInfo, backgroundColor: 'red' }}>
        <Text style={homeStyles.songTitle}>{item.title}</Text>
        <Text style={homeStyles.songArtist}>{item.artists}</Text>
      </View>
      <TouchableOpacity onPress={() => handleOpenBottomSheet(item)}>
        <Text style={homeStyles.options}>⋯</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

