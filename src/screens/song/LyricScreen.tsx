import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { LyricService } from '../../services/lyricService';

const LyricsScreen = ({ encodeId }: any) => {
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadLyrics = async () => {
      if (!encodeId) {
        console.log("Lyric Screen code ID", encodeId);
        return;
      }

      setLoading(true);
      const result = await LyricService.fetchLyric(encodeId);
      setLyrics(result);
      setLoading(false);
    };

    loadLyrics();
  }, [encodeId]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {lyrics ? (
          lyrics.split('\n').map((line, index) => (
            <Text key={index} style={styles.lyricsText}>
              {line.trim() === '' ? '\n' : line}
            </Text>
          ))
        ) : (
          <Text style={styles.lyricsText}>Không tìm thấy lời bài hát.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default LyricsScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f4f8',
      paddingHorizontal: 20,
      paddingTop: 50,
    },
    scrollContent: {
      paddingBottom: 40,
    },
    lyricsText: {
      fontSize: 18,
      lineHeight: 30,
      color: '#1e1e1e',
      marginBottom: 10,
      fontFamily: 'System',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f2f4f8',
    },
  });
  