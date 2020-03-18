import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {getData} from '../store/actions/actions';
import {LineChart} from 'react-native-chart-kit';

const Main = props => {
  useEffect(() => {
    props.getData();
  }, []);
  return (
    <View>
      <Text>Main</Text>
      <View>
        {props.data.confirmed.length > 0 &&
        props.data.confirmed[props.data.selected] ? (
          <LineChart
            data={{
              labels:
                props.data.confirmed.length > 0
                  ? Object.keys(props.data.confirmed[props.data.selected].data)
                  : [],
              datasets: [
                {
                  data:
                    props.data.confirmed.length > 0
                      ? Object.values(
                          props.data.confirmed[props.data.selected].data,
                        )
                      : [],
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={Dimensions.get('window').height / 2}
            // yAxisLabel="$"
            // yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  data: state.data,
});

export default connect(mapStateToProps, {getData})(React.memo(Main));
