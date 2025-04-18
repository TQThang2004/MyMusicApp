import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ChartLine = () => {
  return (
    <LineChart
      data={{
        labels: ['03:00', '07:00', '11:00', '15:00', '19:00', '23:00'],
        datasets: [
          {
            data: [5, 20, 22, 30, 24, 15],
            color: () => '#FF3E4D',
            strokeWidth: 2,
          },
          {
            data: [3, 14, 13, 20, 18, 13],
            color: () => '#3B82F6',
          },
          {
            data: [2, 10, 10, 15, 12, 10],
            color: () => '#8B5CF6',
          },
        ],
      }}
      width={screenWidth - 32}
      height={220}
      chartConfig={{
        backgroundGradientFrom: '#3a0ca3',
        backgroundGradientTo: '#7209b7',
        color: () => '#ffffff',
        labelColor: () => '#ffffff',
        propsForDots: {
          r: '4',
          strokeWidth: '2',
          stroke: '#fff',
        },
      }}
      bezier
      style={styles.chart}
    />
  );
};

const styles = StyleSheet.create({
  chart: {
    marginTop: 16,
    borderRadius: 16,
  },
});

export default ChartLine;
