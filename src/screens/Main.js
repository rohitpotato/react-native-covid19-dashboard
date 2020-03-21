import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  InteractionManager,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {connect} from 'react-redux';
import {getData} from '../store/actions/actions';

import StatsCard from '../components/StatsCard';
import Header from '../components/Header';
import Chart from '../components/Chart';
// import console = require('console');

const colors = ['#0f0c29', '#302b63', '#24243e'];

const Main = props => {
  const [displayData, setDisplayData] = useState(null);
  useEffect(() => {
    props.getData();
    // displayCharts();
    // return () => {
    //   displayCharts();
    // };
  }, []);

  useEffect(() => {
    setDisplayData(
      props.loading ? (
        <View style={styles.scrollContainer}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          horizontal
          contentContainerStyle={styles.scrollContainer}>
          <View style={styles.chartContainer}>
            <StatsCard
              colors={['#434343', '#000000']}
              value={props.confirmedCount}
              type="CONFIRMED"
            />
            {props.confirmed &&
            props.confirmed.length > 0 &&
            props.confirmed[props.selected] ? (
              <Chart
                backgroundColor="#000000"
                backgroundGradientFrom="#7F8C8D"
                backgroundGradientTo="#000000"
                stats={props.confirmed[props.selected].data}
              />
            ) : null}
          </View>
          <View style={styles.chartContainer}>
            <StatsCard
              colors={['#3BB78F', '#0BAB64']}
              value={props.recoveredCount}
              type="RECOVERED"
            />
            {props.recovered &&
            props.recovered.length > 0 &&
            props.recovered[props.selected] ? (
              <Chart
                backgroundColor="rgb(81, 176, 86)"
                backgroundGradientFrom="#0BAB64"
                backgroundGradientTo="#3BB78F"
                stats={props.recovered[props.selected].data}
              />
            ) : null}
          </View>
          <View style={styles.chartContainer}>
            <StatsCard
              colors={['#eb3349', '#f45c43']}
              value={props.deathCount}
              type="DEATHS"
            />
            {props.deaths &&
            props.deaths.length > 0 &&
            props.deaths[props.selected] ? (
              <Chart
                backgroundColor=""
                backgroundGradientFrom="#eb3349"
                backgroundGradientTo="#f45c43"
                stats={props.deaths[props.selected].data}
              />
            ) : null}
          </View>
        </ScrollView>
      ),
    );
  }, [props.selected, props.loading]);

  // const displayCharts = () => {
  //   return setTimeout(() => {
  //     setDisplayData(

  //     );
  //   }, 100);
  // };

  const onRefresh = () => props.getData();

  const selectPress = () => {
    props.navigation.navigate('SelectCountry');
  };
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient style={{flex: 1}} colors={['#a3bded', '#e2ebf0']}>
        <Header
          onSelectPress={selectPress}
          country={
            // props.data &&
            // props.countries &&
            props.countries.length > 0 && props.countries[props.selected]
              ? props.countries[props.selected].value
              : ''
          }
        />
        <View
          // refreshControl={
          //   <RefreshControl refreshing={false} onRefresh={onRefresh} />
          // }
          style={styles.scrollContainer}>
          <View style={{margin: 20, marginBottom: 4}}>
            <Text style={styles.statText}>Stats</Text>
          </View>
          {/* <View style={styles.statContainer}> */}
          {/* <StatsCard
            confirmed={props.confirmedCount}
            recovered={props.recoveredCount}
            deaths={props.deathCount}
          /> */}
          {/* </View> */}
          {displayData}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  scrollContainer: {alignItems: 'center'},
  statContainer: {alignItems: 'center'},
  statText: {fontFamily: 'Rubik-Medium', fontSize: 16},
  loaderContainer: {alignItems: 'center'},
  chartContainer: {padding: 8},
});

const mapStateToProps = state => ({
  // data: state.data,
  loading: state.data.loading,
  confirmed: state.data.confirmed,
  recovered: state.data.recovered,
  deaths: state.data.deaths,
  // error: '',
  countries: state.data.countries,
  // labels: [],
  selected: state.data.selected,
  confirmedCount: state.data.confirmedCount,
  recoveredCount: state.data.recoveredCount,
  deathCount: state.data.deathCount,
});

export default connect(mapStateToProps, {getData})(React.memo(Main));
