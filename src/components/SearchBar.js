import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchBar = props => {
  const {onTextChange, value} = props;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={onTextChange}
        placeholder="Search Countries"
        value={value}
      />
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="nfc-search-variant" size={20} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
  },
  textInputStyle: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Rubik-Regular',
    borderBottomWidth: 0.3,
  },
  iconContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;
