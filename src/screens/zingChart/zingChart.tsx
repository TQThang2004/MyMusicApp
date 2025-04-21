import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Top3Chart from '../../components/Top3Chart';
import ChartLine from '../../components/ChartLine';
import LinearGradient from 'react-native-linear-gradient';

const ZingChartScreen = ({ songs }:any) => {

  return (
    <LinearGradient
    colors={['#FFFFFF', '#808080', '#FFFFFF', '#808080', '#FFFFFF']}
    locations={[0, 0.25, 0.5, 0.75, 1]}
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1 }}
    style={{
      flex: 1,
      padding: 16,
    }}
        >
        <ScrollView style={styles.container}>
            {/* <Text style={styles.heading}>#zingchart</Text> */}
            <Top3Chart songs={songs} />
        </ScrollView>
        </LinearGradient>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gradient(0deg, #3a0ca3, #7209b7)',
    padding: 16,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF334D ',
    marginBottom: 12,
  },
});

export default ZingChartScreen;
