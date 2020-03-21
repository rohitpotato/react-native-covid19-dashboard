import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import SearchBar from '../components/SearchBar';
import {setCountry} from '../store/actions/actions';
import {debounce} from 'lodash';

const ListItem = React.memo(props => {
  // console.log('render flatlist item');
  const {item, handleCountrySelect} = props;
  const handleSelect = () => {
    handleCountrySelect(item.key);
  };

  return (
    <TouchableOpacity onPress={handleSelect} style={styles.itemStyle}>
      <View>
        <Text style={styles.textStyle}>{item.value}</Text>
      </View>
    </TouchableOpacity>
  );
});

// ListItem = React.memo(ListItem);

const SelectCountry = props => {
  const [filteredCountries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const ITEM_HEIGHT = 12;

  const keyExtractor = (item, index) => String(item.key);

  const handleCountrySelect = key => {
    props.navigation.navigate('Main');
    props.setCountry(key);
  };

  const renderListItem = ({item}) => {
    return <ListItem handleCountrySelect={handleCountrySelect} item={item} />;
  };
  const getItemLayout = ({data, index}) => {
    return {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    };
  };
  const getSearchResults = () => {
    const countries = [...props.countries];
    const regex = new RegExp(query, 'gi');
    const filteredCountries_ = countries.reduce((acc, country) => {
      if (country.value && country.value.match(regex)) {
        acc.push(country);
      }
      return acc;
    }, []);
    setCountries(filteredCountries_);
  };
  let debouncedSearch = debounce(getSearchResults, 500);
  const onTextChange = text => {
    setQuery(text);
    debouncedSearch();
  };
  const handleSearchData = () => {
    if (query.length) {
      if (filteredCountries.length) {
        return filteredCountries;
      } else {
        return [];
      }
    }
    return props.countries;
  };

  return (
    <SafeAreaView>
      <LinearGradient colors={['#a1c4fd', '#c2e9fb']}>
        <SearchBar onTextChange={onTextChange} />
        <View style={{marginTop: 16}}>
          <FlatList
            keyboardShouldPersistTaps="always"
            data={handleSearchData()}
            keyExtractor={keyExtractor}
            renderItem={renderListItem}
            removeClippedSubviews={true}
            // getItemLayout={getItemLayout}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemStyle: {padding: 16, borderBottomWidth: 0.3},
  textStyle: {fontFamily: 'Rubik-Regular'},
});

const mapStateToProps = state => ({
  countries: state.data.countries,
});

export default connect(mapStateToProps, {setCountry})(
  React.memo(SelectCountry),
);
