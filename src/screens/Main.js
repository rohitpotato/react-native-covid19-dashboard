import React, {useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
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
  useEffect(() => {
    props.getData();
  }, []);

  const onRefresh = () => props.getData();

  const selectPress = () => {
    props.navigation.navigate('SelectCountry');
  };
  // console.log('Counting renders', props);
  return (
    <SafeAreaView style={styles.container}>
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.scrollContainer}>
        <View style={{margin: 20, marginBottom: 4}}>
          <Text style={styles.statText}>Stats</Text>
        </View>
        <View style={styles.statContainer}>
          <StatsCard
            confirmed={props.confirmedCount}
            recovered={props.recoveredCount}
            deaths={props.deathCount}
          />
        </View>

        {props.loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <View style={styles.chartContainer}>
            {props.confirmed &&
            props.confirmed.length > 0 &&
            props.confirmed[props.selected] ? (
              <Chart
                backgroundGradientFrom="#606c88"
                backgroundGradientTo="#3f4c6b"
                stats={props.confirmed[props.selected].data}
              />
            ) : null}

            {props.recovered &&
            props.recovered.length > 0 &&
            props.recovered[props.selected] ? (
              <Chart
                backgroundColor="rgb(81, 176, 86)"
                backgroundGradientFrom="#56ab2f"
                backgroundGradientTo="#a8e063"
                stats={props.recovered[props.selected].data}
              />
            ) : null}
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
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  // scrollContainer: {alignItems: 'center'},
  statContainer: {alignItems: 'center'},
  statText: {fontFamily: 'Rubik-Medium', fontSize: 16},
  loaderContainer: {alignItems: 'center'},
  chartContainer: {alignItems: 'center'},
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
