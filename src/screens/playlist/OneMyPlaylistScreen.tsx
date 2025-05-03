import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import {
    Animated,
    View,
    StyleSheet,
    Dimensions,
    StatusBar,
    Alert,
    TouchableOpacity,
    Text,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ButtonComponent, RowComponent, SongItemComponent, TextComponent } from '../../components';
import Icon from 'react-native-vector-icons/Entypo';
import { appColor } from '../../constants/appColor';
import { PlaylistService } from '../../services/playlistServices';
import { HomeService } from '../../services/homeServices';
import TrackPlayer from 'react-native-track-player';
import FloatingPlayer from '../../components/FloatPlayer';
import { HistoryService } from '../../services/historyService';
import { AuthContext } from '../../context/AuthContext';
import appInfo from '../../constants/appInfo';

const { height: screenHeight } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = screenHeight * 0.5;
const HEADER_MIN_HEIGHT = screenHeight * 0.3;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const OneMyPlaylistScreen = ({ route, navigation }: any) => {
    const { user } = useContext(AuthContext);

    const [list, setList] = useState<{ thumbnailM: string; encodeId: string, title: string; artistsNames: string }[]>([]);

    const { playlist } = route.params;

    useEffect(() => {
        const fetchPlaylistDetails = async () => {
            try {
                const response = await fetch(`${appInfo.BASE_URL}/main/get-songs-from-playlist/${user.id}/${playlist.encodeId}`);
                const data = await response.json();
                setList(data.data.songs);
            } catch (error) {
                console.log('Error fetching playlist details:', error);
                Alert.alert('Error', 'Could not load playlist details');
            }
        };

        fetchPlaylistDetails();
    }, [playlist?.encodeId]);

    useFocusEffect(
        useCallback(() => {
            const fetchPlaylistDetails = async () => {
                try {
                    const response = await fetch(`${appInfo.BASE_URL}/main/get-songs-from-playlist/${user.id}/${playlist.encodeId}`);
                    const data = await response.json();
                    setList(data.data.songs);
                } catch (error) {
                    console.error('Error fetching playlist details:', error);
                    Alert.alert('Error', 'Could not load playlist details');
                }
            };

            if (route.params?.needRefresh) {
                fetchPlaylistDetails();
                // Clear the refresh flag
                navigation.setParams({ needRefresh: false });
            }
        }, [route.params?.needRefresh])
    );

    const handleRemoveSong = (songId: string) => {
        Alert.alert(
            'Xóa bài hát',
            'Bạn có chắc muốn xóa bài hát này khỏi playlist?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Xóa',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const response = await fetch(`${appInfo.BASE_URL}/main/remove-song-from-playlist`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    userId: user.id,
                                    playlistId: playlist.encodeId,
                                    songId: songId
                                }),
                            });

                            const data = await response.json();
                            setList(prevList => prevList.filter(song => song.encodeId !== songId));
                        } catch (error) {
                            console.error('Lỗi khi xóa bài hát:', error);
                            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi xóa bài hát');
                        }
                    },
                },
            ]
        );
    };

    const handlePlay = async (selectedItem: any, list: { thumbnailM: string; encodeId: string; title: string; artistsNames: string; }[], navigation: any) => {
        const fullList = list;

        await TrackPlayer.reset();

        const tracks = await Promise.all(
            fullList.map(async (item: any) => {
                const songData = await HomeService.fetchSongDetails(item.encodeId);
                if (!songData) return null;

                return {
                    id: item.encodeId,
                    url: songData['128'] || songData['320'] || songData['256'],
                    title: item.title,
                    artist: item.artistsNames || 'Unknown',
                    thumbnailM: item.thumbnailM || item.thumbnail,
                };
            })
        );

        const filteredTracks = tracks.filter((track) => track !== null);

        await TrackPlayer.add(filteredTracks);

        const index = filteredTracks.findIndex((track: any) => track.id === selectedItem.encodeId);

        if (index >= 0) {
            await TrackPlayer.skip(index);
        }

        await TrackPlayer.play();

        console.log('Playing song:', selectedItem.title);
        navigation.navigate('Song', { song: selectedItem });
    };

    const scrollY = useRef(new Animated.Value(0)).current;

    const headerTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -HEADER_SCROLL_DISTANCE],
        extrapolate: 'clamp',
    });

    const imageScale = scrollY.interpolate({
        inputRange: [-HEADER_MAX_HEIGHT, 0, HEADER_SCROLL_DISTANCE],
        outputRange: [2, 1, 1],
        extrapolate: 'clamp',
    });

    const titleTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 0],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="chevron-left" size={25} color="#fff" />
            </TouchableOpacity>
            {/* Animated Header */}

            <Animated.View
                style={[
                    styles.header,
                    { transform: [{ translateY: headerTranslate }] },
                ]}
            >
                <Animated.Image
                    source={require('../../assets/images/playlist.jpg')}
                    style={[
                        styles.backgroundImage,
                        { transform: [{ scale: imageScale }] },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.overlay,
                        {
                            transform: [{ translateY: titleTranslateY }],
                        },
                    ]}
                >
                    <TextComponent text={playlist.title} title />
                    <TextComponent text={playlist.artistsNames} />
                    <TextComponent text={`Count: ${list.length} song`} />
                </Animated.View>
            </Animated.View>

            {/* Song list */}
            <Animated.ScrollView
                contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                style={{ paddingHorizontal: 20, paddingVertical: 10 }}
            >
                {list.map(song => (
                    <SongItemComponent
                        key={song.encodeId}
                        imageUrl={song.thumbnailM}
                        songName={song.title}
                        artistName={song.artistsNames}
                        onPress={() => handlePlay(song, list, navigation)}
                        isButton
                        icon={<Icon name="cross" size={25} color="red" />}
                        onPressButton={() => handleRemoveSong(song.encodeId)}
                    />
                ))}
            </Animated.ScrollView>
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => {
                    navigation.navigate('AddSong', {
                        userId: user.id,
                        playlistId: playlist.encodeId,
                    });
                }}
            >
                <Icon name="plus" size={24} color="#fff" />
            </TouchableOpacity>

            <FloatingPlayer
                onPress={() =>
                    navigation.navigate('Song', { song: TrackPlayer.getCurrentTrack })
                }
                style={{ bottom: 0 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: HEADER_MAX_HEIGHT,
        zIndex: 1,
        overflow: 'hidden',
    },
    backgroundImage: {
        width: '100%',
        height: HEADER_MAX_HEIGHT,
        position: 'absolute',
    },
    backButton: {
        position: 'absolute',
        top: 45,
        left: 20,
        zIndex: 2,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        bottom: 20,
        left: 16,
    },
    title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#ddd',
        fontSize: 14,
        marginVertical: 4,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 80,
        right: 30,
        backgroundColor: '#73a3f0',
        width: 55,
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        elevation: 5,
    },
});

export default OneMyPlaylistScreen;

