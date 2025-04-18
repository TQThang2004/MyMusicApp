import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


interface SongProps {
  encodeId: string;
  title: string;
  artistsNames: string;
  score: number;
  thumbnail: string;
}

interface Props {
  songs: SongProps[];
}

const Top3Chart: React.FC<Props> = ({ songs }) => {
  const rankColor = (rank: number) => {
    if (rank === 1) return '#FF3E4D';
    if (rank === 2) return '#3B82F6';
    return '#8B5CF6';
  };

  return (
    <View style={styles.leftPanel}>
      {songs.slice(0, 3).map((song, index) => {
        const totalScore = songs
          .slice(0, 3)
          .reduce((acc, s) => acc + s.score, 0);

        const percent = Math.round((song.score / totalScore) * 100);

        return (
            <TouchableOpacity
                key={song.encodeId}
                onPress={() => console.log('Song pressed')}>
                <LinearGradient
                    key={index}
                    colors={['#607390', '#6B7655']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.songRow}
                    >
                    <Text style={[styles.rank, { color: rankColor(index + 1) }]}>
                        {index + 1}
                    </Text>
                    <Image source={{ uri: song.thumbnail }} style={styles.thumbnail} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>{song.title}</Text>
                        <Text style={styles.artist}>{song.artistsNames}</Text>
                    </View>
                    <Text style={styles.percent}>{percent}%</Text>
                </LinearGradient>
            </TouchableOpacity>
          );
          
      })}

      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreButtonText}>Xem thêm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  leftPanel: {
    width: '100%',
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 10,
    padding: 10,
  },
  rank: {
    fontSize: 22,
    fontWeight: 'bold',
    width: 30,
    textAlign: 'center',
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 6,
    marginHorizontal: 10,
  },
  title: {
    color: '#fff',
    fontWeight: '600',
  },
  artist: {
    color: '#bbb',
    fontSize: 13,
  },
  percent: {
    fontWeight: 'bold',
    color: '#fff',
  },
  moreButton: {
    borderColor: '#fff',
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  moreButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Top3Chart;
