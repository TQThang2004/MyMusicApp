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
                  source={{ uri: playlist.thumbnail }}
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
            <TouchableOpacity onPress={() => console.log('See all pressed')}>
              <Text style={homeStyles.textSeeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 10 }}>
            {props.chillPlaylists.map((playlist:any) => (
                <TouchableOpacity
                    key={playlist.encodeId}
                    onPress={() => console.log("Playlist EncodeId: -------",playlist.encodeId)}
                
                >
                    <View key={playlist.encodeId} style={homeStyles.card}>
                        <Image
                        source={{ uri: playlist.thumbnail}} 
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

