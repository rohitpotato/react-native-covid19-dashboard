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
  // Line,
  Rect,
  Text,
} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import * as shape from 'd3-shape';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const ChartWidth = ScreenWidth * 0.94;
const ChartHeight = ScreenHeight / 1.8;

const axesSvg = {fontSize: 10, fill: 'grey'};
const verticalContentInset = {top: 10, bottom: 10};
const xAxisHeight = 30;

const Decorator = ({x, y, data}) => {
  return data.map((value, index) => (
    <Circle
      key={index}
      cx={x(index)}
      cy={y(value)}
      r={3.8}
      stroke={'rgb(0,0,0,0.1)'}
      strokeWidth={1}
      fill={'white'}
    />
  ));
};

const Clips = ({x, width}) => (
  <Defs key={'clips'}>
    <ClipPath id={'clip-path-1'} key={'0'}>
      <Rect x={0} y={'0'} width={x(indexToClipFrom)} height={'100%'} />
    </ClipPath>
    <ClipPath id="clip-path-2" key={'1'}>
      <Rect
        x={x(indexToClipFrom)}
        y={'0'}
        width={width - x(indexToClipFrom)}
        height={'100%'}
      />
    </ClipPath>
  </Defs>
);

const Line = ({line}) => (
  <Path
    key={'line'}
    d={line}
    strokeWidth={2}
    stroke={'rgb(59,59,59, 0.3)'}
    // fill={'rgb(0,0,0,0.1)'}
    clipPath={'url(#clip-path-1)'}
  />
);

const Chart = props => {
  const {
    stats,
    backgroundColor,
    backgroundGradientFrom,
    backgroundGradientTo,
    xAxisfill,
    yAxisfill,
  } = props;
  const labels = Object.keys(stats).map(val => Number(val));
  const data = Object.values(stats);
  const xaxissvg = {
    fill: 'white',
    fontSize: 10,
    fontFamily: 'Rubik-Regular',
  };

  const gridSvg = {
    fillRule: 'nonzero',
    // strokeDashoffset: 0,
    // strokeLinejoin: 'round',
    strokeDasharray: '',
    strokeWidth: 0.3,
    // strokeLinejoin: 'bevel',
    // fill: 'rgb(51,51,51, 0.3xs)',
    stroke: 'rgb(240,240,240, 0.5)',
  };
  const yAxisSvg = {
    fill: 'white',
    fontSize: 11,
    fontFamily: 'Rubik-Regular',
  };
  const lineChartSvg = {
    stroke: 'white',
    strokeWidth: 1.5,
    fill: 'rgb(255,255,255,0.1)',
  };
  const Accessor = ({item}) => item;
  const formatLabelY = (value, index) =>
    value >= 1000 ? value / 1000 + 'k' : value;

  // extract methods and objects to avoid recreating them at each render.

  return (
    // <View>
    //   <LineChart
    //     data={{
    //       labels: Object.keys(stats),
    //       datasets: [
    //         {
    //           data: Object.values(stats),
    //         },
    //       ],
    //     }}
    //     width={ChartWidth} // from react-native
    //     height={ChartWidth}
    //     // yAxisLabel="$"
    //     // yAxisSuffix="k"
    //     yAxisInterval={1} // optional, defaults to 1
    //     // yLabelsOffset={1.5}
    //     yAxisSvg={yAxisSvg}
    //     formatYLabel={formatLabelY}
    //     chartConfig={{
    //       backgroundColor: backgroundColor,
    //       backgroundGradientFrom: backgroundGradientFrom,
    //       backgroundGradientTo: backgroundGradientTo,
    //       decimalPlaces: 0, // optional, defaults to 2dp
    //       color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    //       labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    //       style: {
    //         backgroundColor: 'red',
    //         // borderRadius: 12,
    //         // padding: 16,
    //       },
    //       propsForDots: {
    //         r: '5',
    //         strokeWidth: 1,
    //         stroke: 'black',
    //       },
    //     }}
    //     bezier
    //     style={{
    //       marginVertical: 16,
    //       borderRadius: 16,
    //     }}
    //   />
    // </View>

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
        <AreaChart
          style={styles.chart}
          data={data}
          contentInset={verticalContentInset}
          svg={lineChartSvg}
          // curve={shape.curveLinear}
        >
          <Grid direction="BOTH" svg={gridSvg} />
          <Decorator />
        </AreaChart>
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
  main: {flex: 1, paddingHorizontal: 16},
  xAxis: {marginHorizontal: -10, height: xAxisHeight, marginTop: 16},
  yAxis: {marginBottom: xAxisHeight},
  container: {
    height: ChartHeight,
    padding: 16,
    flexDirection: 'row',
    width: ChartWidth,
    marginVertical: 12,
    borderRadius: 12,
    elevation: 1,
  },
  contentInsetX: {left: 10, right: 10},
});

export default React.memo(Chart);
