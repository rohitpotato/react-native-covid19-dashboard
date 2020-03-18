import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {connect} from 'react-redux';
import {getData} from '../store/actions/actions';

import StatsCard from '../components/StatsCard';
import Header from '../components/Header';
import Chart from '../components/Chart';

const colors = ['#0f0c29', '#302b63', '#24243e'];

const Main = props => {
  useEffect(() => {
    props.getData();
  }, []);
  return (
    <View style={{flex: 1}}>
      <Header country="WorldWide" />
      <View style={{margin: 16, marginBottom: 2}}>
        <Text style={{fontFamily: 'Rubik-Medium', fontSize: 16}}>Stats</Text>
      </View>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <StatsCard />
        {props.data &&
        props.data.confirmed &&
        props.data.confirmed.length > 0 &&
        props.data.confirmed[props.data.selected] ? (
          <Chart stats={props.data.confirmed[props.data.selected].data} />
        ) : null}
        {props.data &&
        props.data.recovered &&
        props.data.recovered.length > 0 &&
        props.data.recovered[props.data.selected] ? (
          <Chart
            backgroundColor="rgb(81, 176, 86)"
            backgroundGradientFrom="rgb(81, 176, 86)"
            backgroundGradientTo="rgb(81, 176, 86)"
            stats={props.data.recovered[props.data.selected].data}
          />
        ) : null}
        {props.data &&
        props.data.deaths &&
        props.data.deaths.length > 0 &&
        props.data.deaths[props.data.selected] ? (
          <Chart stats={props.data.deaths[props.data.selected].data} />
        ) : null}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  data: state.data,
});

export default connect(mapStateToProps, {getData})(React.memo(Main));
