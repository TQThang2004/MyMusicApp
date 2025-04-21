// components/HomeComponents.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import homeStyles from './HomeStyles';
import ZingChartScreen from '../../screens/zingChart/zingChart';

const HomeComponents = (props: any) => (
  <View>
    {/* Header */}
    <View style={homeStyles.header}>
      <Text style={homeStyles.welcome}>Hey You 👋</Text>
      <Text style={homeStyles.subtitle}>What you want to hear today?</Text>
      <TextInput
        style={homeStyles.searchInput}
        placeholder="Search for songs, artists..."
        placeholderTextColor="#999"
      />
    </View>

    {/* New Release */}
    {props.newReleaseSongs?.length > 0 && (
      <>
        <View style={homeStyles.flex}>
          <Text style={homeStyles.sectionTitle}>New Release</Text>
          <TouchableOpacity onPress={() => console.log('See all pressed')}>
            <Text style={homeStyles.textSeeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {props.newReleaseSongs.map((playlist: any) => (
            <TouchableOpacity
              key={playlist.encodeId}
              onPress={() => props.handlePlay(playlist)}
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
                props.navigation.navigate('Playlist', { chillPlaylists: props.chillPlaylists }) 
                console.log("Chill Playlists: -------",props.chillPlaylists)
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
  
    <View style={homeStyles.flex}>
      <Text style={homeStyles.sectionTitle}>#zingchart</Text>
      {/* <TouchableOpacity onPress={() => navigation.navigate('FavoriteArtist')}>
        <Text style={homeStyles.textSeeAll}>See all</Text>
      </TouchableOpacity> */}
    </View>
    {/* Zing Chart */}
    {props.zingChart?.length > 0 && (
      <View>
        <ZingChartScreen songs={props.zingChart} />
      </View>
    )}
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

