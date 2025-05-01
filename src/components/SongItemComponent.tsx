import React, { ReactNode } from 'react';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import Icon from 'react-native-vector-icons/Entypo';

interface Props {
  imageUrl: string;
  songName: string;
  artistName: string;
  isButton?: boolean;
  icon?: ReactNode
  onPress?: () => void;
  onPressButton?: () => void;
  onLongPress?: () => void;
}

const SongItemComponent = (props: Props) => {
  const { imageUrl, songName, artistName, isButton, icon, onPress, onPressButton, onLongPress } = props;

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={styles.container}>
      <RowComponent>
          <Image source={{ uri: imageUrl }} style={styles.image} />
    
          <View style={styles.textContainer}>
            <TextComponent text={songName} styles={styles.songName} title/>
            <TextComponent text={artistName} styles={styles.artistName} />
          </View>
      </RowComponent>

      {isButton && (
        <TouchableOpacity onPress={onPressButton}>
          {/* <Icon name="dots-three-horizontal" size={20} color="#555" /> */}
          {icon && icon}
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingRight: 30,
    justifyContent: 'space-between',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  songName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  artistName: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
});

export default SongItemComponent;
