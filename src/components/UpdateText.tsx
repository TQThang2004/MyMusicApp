import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

const UpdateText = () => {
  const [currentTime, setCurrentTime] = useState('');

  const getFormattedTime = () => {
    const date = new Date();
    const formattedTime = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} - ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    return formattedTime;
  };

  useEffect(() => {
    setCurrentTime(getFormattedTime());

    const interval = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 180000);

    return () => clearInterval(interval);
  }, []);

  return <Text style={styles.updateText}>Cập nhật {currentTime}</Text>;
};

const styles = StyleSheet.create({
  updateText: {
    fontSize: 11,
    color: 'gray',
    marginTop: 5,
    marginBottom: 10,
  },
});

export default UpdateText;
