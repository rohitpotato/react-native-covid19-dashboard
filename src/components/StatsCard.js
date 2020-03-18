import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const colors = ['#0f0c29', '#302b63', '#24243e'];
const StatsCard = props => {
  return (
    <LinearGradient colors={colors} style={styles.container}>
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.confirmedText}>CONFIRMED:</Text>
          <Text style={styles.confirmedText}>1000</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.recoveredText}>RECOVERED:</Text>
          <Text style={styles.confirmedText}>1000</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.deathsText}>DEATHS:</Text>
          <Text style={styles.confirmedText}>1000</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    elevation: 1,
    // backgroundColor: 'rgb(69, 95, 180)',
    borderWidth: 0.3,
    borderColor: 'transparent',
    margin: 16,
    opacity: 0.85,
    borderRadius: 8,
    width: ScreenWidth * 0.8,
  },
  statsContainer: {
    padding: 8,
  },
  stat: {
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmedText: {
    fontFamily: 'Rubik-Medium',
    // fontSize: 18,
    color: 'white',
  },
  recoveredText: {
    fontFamily: 'Rubik-Medium',
    // fontSize: 18,
    color: 'white',
  },
  deathsText: {
    fontFamily: 'Rubik-Medium',
    // fontSize: 18,
    color: 'white',
  },
});

export default StatsCard;
