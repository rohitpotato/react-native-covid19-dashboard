import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

// const ScreenHeight = Dimensions.get('window').height;
// const ScreenWidth = Dimensions.get('window').width;

const Chart = props => {
  const {
    stats,
    backgroundColor,
    backgroundGradientFrom,
    backgroundGradientTo,
  } = props;
  console.log('stats', stats);
  return (
    <View>
      <LineChart
        data={{
          labels: Object.keys(stats),
          datasets: [
            {
              data: Object.values(stats),
            },
          ],
        }}
        width={Dimensions.get('window').width * 0.9} // from react-native
        height={Dimensions.get('window').height / 2}
        // yAxisLabel="$"
        // yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: backgroundColor,
          backgroundGradientFrom: backgroundGradientFrom,
          backgroundGradientTo: backgroundGradientTo,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 12,
          },
          propsForDots: {
            r: '5',
            strokeWidth: 1,
            stroke: 'black',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default React.memo(Chart);
