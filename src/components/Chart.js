import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
// import {LineChart} from 'react-native-chart-kit';
import {
  LineChart,
  AreaChart,
  Grid,
  XAxis,
  YAxis,
  Path,
} from 'react-native-svg-charts';
import {
  Defs,
  LinearGradient as L,
  Stop,
  Circle,
  G,
  Line,
  Rect,
  Text,
} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import * as shape from 'd3-shape';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const ChartWidth = ScreenWidth * 0.94;
const ChartHeight = ScreenHeight / 2;

const axesSvg = {fontSize: 10, fill: 'grey'};
const verticalContentInset = {top: 10, bottom: 10};
const xAxisHeight = 30;

const Decorator = ({x, y, data}) => {
  return data.map((value, index) => (
    <Circle
      key={index}
      cx={x(index)}
      cy={y(value)}
      r={5}
      stroke={'#f3f3f3'}
      strokeWidth={1}
      fill={'white'}
    />
  ));
};

const Chart = props => {
  const {
    stats,
    backgroundColor,
    backgroundGradientFrom,
    backgroundGradientTo,
  } = props;
  const labels = Object.keys(stats).map(val => Number(val));
  const data = Object.values(stats);
  const xaxissvg = {
    fill: 'black',
    fontSize: 10,
    fontFamily: 'Rubik-Regular',
  };

  const gridSvg = {
    fillRule: 'evenodd',
    strokeDashoffset: 8,
    strokeLinejoin: 'round',
    strokeDasharray: [8],
  };
  const yAxisSvg = {
    fill: 'black',
    fontSize: 10,
    fontFamily: 'Rubik-Regular',
  };
  const lineChartSvg = {
    stroke: 'white',
    strokeWidth: 1.5,
    // fill: 'rgba(134, 65, 244, 0.2)',
  };
  const Accessor = ({item}) => item;
  const formatLabelY = (value, index) =>
    value >= 1000 ? value / 1000 + 'k' : value;

  // Layout of an x-axis together with a y-axis is a problem that stems from flexbox.
  // All react-native-svg-charts components support full flexbox and therefore all
  // layout problems should be approached with the mindset "how would I layout regular Views with flex in this way".
  // In order for us to align the axes correctly we must know the height of the x-axis or the width of the x-axis
  // and then displace the other axis with just as many pixels. Simple but manual.
  return (
    <LinearGradient
      colors={[backgroundGradientTo, backgroundGradientFrom]}
      style={styles.container}>
      <YAxis
        data={data}
        style={styles.yAxis}
        contentInset={verticalContentInset}
        yAccessor={Accessor}
        formatLabel={formatLabelY}
        svg={yAxisSvg}
      />
      <View style={styles.main}>
        <LineChart
          style={styles.chart}
          data={data}
          contentInset={verticalContentInset}
          svg={lineChartSvg}
          // curve={shape.curveLinear}
        >
          <Grid direction="HORIZONTAL" svg={gridSvg} />
          <Decorator />
        </LineChart>
        <XAxis
          style={styles.xAxis}
          data={labels}
          xAccessor={Accessor}
          contentInset={styles.contentInsetX}
          svg={xaxissvg}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  chart: {flex: 1},
  main: {flex: 1, marginLeft: 12},
  xAxis: {marginHorizontal: -10, height: xAxisHeight},
  yAxis: {marginBottom: xAxisHeight},
  container: {
    height: ChartHeight,
    padding: 20,
    flexDirection: 'row',
    width: ChartWidth,
    marginVertical: 12,
    borderRadius: 12,
    elevation: 1,
  },
  contentInsetX: {left: 10, right: 10},
});

export default React.memo(Chart);
