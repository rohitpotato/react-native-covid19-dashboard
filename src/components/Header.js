import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {} from '@react-navigation/native';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const Header = props => {
  const onCountryPress = () => {
    props.onSelectPress();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.covidText}>COVID-19</Text>
        <Text style={styles.dashboardText}>Dashboard</Text>
      </View>
      <TouchableOpacity
        onPress={onCountryPress}
        style={styles.countryContainer}>
        <Ionicons name="ios-send" size={18} />
        <Text style={{...styles.covidText, marginLeft: 4}}>
          {props.country}
        </Text>
      </TouchableOpacity>
      {/* <View ></View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 0.6,
    borderBottomWidth: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // margin: 24,
  },
  headingContainer: {
    marginLeft: 16,
    marginTop: 8,
    padding: 3,
    paddingBottom: 5,
  },
  covidText: {
    fontFamily: 'Rubik-Medium',
  },
  dashboardText: {fontFamily: 'Rubik-MediumItalic'},
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    elevation: 1,
  },
});

export default Header;
