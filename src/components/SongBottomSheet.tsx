// SongBottomSheet.tsx
import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type SongBottomSheetRef = {
  expand: () => void;
  close: () => void;
};

type Props = {
  selectedSong: any;
};

const SongBottomSheet = forwardRef<SongBottomSheetRef, Props>(({ selectedSong }, ref) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['35%'], []); // Tăng lên 35% để đủ chỗ hiển thị
  

  useImperativeHandle(ref, () => ({
    expand: () => bottomSheetRef.current?.expand(),
    close: () => bottomSheetRef.current?.close(),
  }));

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: 'gray' }}
      handleIndicatorStyle={{ backgroundColor: 'gray' }}
    >
      <BottomSheetView style={styles.bottomSheetContainer}>
        {selectedSong ? (
          <>
            <Text style={styles.optionsTitle}>Options</Text>
            
            <Text style={styles.songTitle}>{selectedSong.title}</Text>
            <Text style={styles.artistName}>{selectedSong.artist}</Text>
            
            <View style={styles.separator} />
            
            <TouchableOpacity 
              style={styles.optionItem}
              onPress={() => console.log('Add to Playlist')}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="add-circle-outline" size={20} color="white" />
              </View>
              <Text style={styles.optionText}>Add to playlist</Text>
            </TouchableOpacity>
            
            <View style={styles.separator} />
            
            <TouchableOpacity 
              style={styles.optionItem}
              onPress={() => console.log('Share')}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="share-social-outline" size={20} color="white" />
              </View>
              <Text style={styles.optionText}>Share</Text>
            </TouchableOpacity>
            
            <View style={styles.separator} />
            
            <TouchableOpacity 
              style={styles.optionItem}
              onPress={() => console.log('Add to queue')}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="list-outline" size={20} color="black" />
              </View>
              <Text style={styles.optionText}>Add to queue</Text>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity 
              style={styles.optionItem}
              onPress={() => console.log('View artist')}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="person-outline" size={20} color="black" />
              </View>
              <Text style={styles.optionText}>View artist</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={{color: 'white'}}>No song selected</Text>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  bottomSheetContainer: {
    padding: 20,
    backgroundColor: 'gray',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flex: 1,
  },
  optionsTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
  },
  songTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  artistName: {
    color: '#b3b3b3',
    fontSize: 14,
    marginBottom: 24,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  optionText: {
    color: 'black',
    fontSize: 16,
    marginLeft: 16,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#282828',
    marginVertical: 8,
  },
  iconContainer: {
    width: 24,
    alignItems: 'center',
  },
});

export default SongBottomSheet;