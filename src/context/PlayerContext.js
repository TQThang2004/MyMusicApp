import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);

  const saveCurrentTrack = async (track) => {
    setCurrentTrack(track);
    try {
      await AsyncStorage.setItem('currentTrack', JSON.stringify(track));
    } catch (error) {
      console.log('Failed to save currentTrack:', error);
    }
  };

  const loadCurrentTrack = async () => {
    try {
      const trackJson = await AsyncStorage.getItem('currentTrack');
      if (trackJson) {
        setCurrentTrack(JSON.parse(trackJson));
      }
    } catch (error) {
      console.log('Failed to load currentTrack:', error);
    }
  };

  useEffect(() => {
    loadCurrentTrack();
  }, []);

  return (
    <PlayerContext.Provider value={{ currentTrack, setCurrentTrack: saveCurrentTrack }}>
      {children}
    </PlayerContext.Provider>
  );
};
