import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

interface SongProps {
  encodeId: string;
  title: string;
  artistsNames: string;
  thumbnail: string;
  rank: number;
  previousRank: number;
}

interface Props {
  songs: SongProps[];
}

const ZingChart: React.FC<Props> = ({ songs }) => {
  const getRankChange = (current: number, previous: number) => {
    if (previous === 0) return null;
    const diff = previous - current;
    if (diff > 0) return { symbol: '↑', color: '#1DD05D', text: `+${diff}` };
    if (diff < 0) return { symbol: '↓', color: '#E35050', text: `${diff}` };
    return { symbol: '•', color: '#999', text: '0' };
  };

  const renderItem = ({ item }: { item: SongProps }) => {
    const change = getRankChange(item.rank, item.previousRank);

    return (
      <View style={styles.songRow}>
        <Text style={styles.rank}>{item.rank}</Text>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <View style={styles.infoContainer}>
          <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
          <Text numberOfLines={1} style={styles.artists}>{item.artistsNames}</Text>
        </View>
        <View style={styles.changeContainer}>
          {change && (
            <Text style={[styles.changeText, { color: change.color }]}>
              {change.symbol} {change.text}
            </Text>
          )}
        </View>
        <Text style={styles.more}>⋯</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.updateText}>Cập nhật 23.04.2025 - 06:30</Text>
      <Text style={styles.header}>#zingchart</Text>
      <FlatList
        data={songs.slice(0, 5)}
        renderItem={renderItem}
        keyExtractor={(item) => item.encodeId}
      />
      <TouchableOpacity style={styles.seeAllButton}>
        <Text style={styles.seeAllText}>Xem tất cả</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191919',
    padding: 16,
    borderRadius: 12,
    margin: 10,
  },
  updateText: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 4,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D14EFF',
    marginBottom: 12,
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rank: {
    width: 24,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginHorizontal: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  artists: {
    color: '#ccc',
    fontSize: 12,
  },
  changeContainer: {
    width: 40,
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  more: {
    fontSize: 18,
    color: '#aaa',
    paddingHorizontal: 6,
  },
  seeAllButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  seeAllText: {
    color: '#1DB954',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ZingChart;
