import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NEWS_API_URL} from '../config/constants';
import moment from 'moment';

// const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

// const ex = {
//   source: {id: null, name: 'Lifehacker.com'},
//   author: 'David Murphy',
//   title: 'Where to Find Free Entertainment During the Coronavirus Shutdown',
//   description:
//     'Sitting here in not-so-sunny California, I’m bored to tears as a result of the Coronavirus lockdown. And while I have video games to entertain me, and endless work to do (from home, of course), I’ve been looking for a better way to deal with the solitary cond…',
//   url:
//     'https://lifehacker.com/where-to-find-free-entertainment-during-the-coronavirus-1842360955',
//   urlToImage:
//     'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/qekflogpuvtdqvmsrokk.png',
//   publishedAt: '2020-03-17T14:00:00Z',
//   content:
//     'Sitting here in not-so-sunny California, Im bored to tears as a result of the Coronavirus',
// };

const onNewsPress = url => {
  Linking.openURL(url);
};

const ListItem = React.memo(props => {
  const {item, onNewsPress} = props;

  const onItemPress = () => {
    onNewsPress(item.url);
  };

  return (
    <TouchableOpacity
      onPress={onItemPress}
      activeOpacity={0.7}
      style={styles.listItemContainer}>
      <View style={styles.articleContainer}>
        <View style={styles.upperContainer}>
          <View style={styles.textContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{item.title}</Text>
            </View>
            <View>
              <Text style={styles.description}>
                {item.description ? item.description.slice(0, 80) : ''}...
              </Text>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <Image source={{uri: item.urlToImage}} style={styles.imageStyles} />
          </View>
        </View>
        <View style={styles.sourceContainer}>
          <View style={styles.sourceTextContainer}>
            <Text style={styles.detailText}>
              {item.source.name} - {moment(item.publishedAt).fromNow()}
            </Text>
          </View>
          <View style={styles.authorContainer}>
            <Text style={styles.detailText}>By {item.author}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const News = props => {
  const query = 'covid';
  const dateMargin = 4;
  const dateFromMargin = moment()
    .subtract(dateMargin, 'd')
    .format('YYYY-MM-DD');

  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getArticles = async controller => {
    try {
      let data = await fetch(
        `${NEWS_API_URL}&q=${query}&from=${dateFromMargin}&sortBy=latest`,
      );
      data = await data.json();
      setArticles(data.articles);
    } catch (e) {
      throw new Error(`Failed to fetch articles, Code: ${e.message}`);
    }
  };

  useEffect(() => {
    // const abortController = new AbortController()
    (async function() {
      try {
        setLoading(true);
        await getArticles();
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    })();
    // return () => {
    //   abortController.abort();
    // };
  }, []);

  const keyExtractor = (item, index) => String(index);

  const renderListItem = ({item}) => {
    return <ListItem item={item} onNewsPress={onNewsPress} />;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient style={styles.container} colors={['#a3bded', '#6991c7']}>
        <View>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Articles for you: COVID-19</Text>
          </View>
          <View style={styles.listContainer}>
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <View>
                {loading ? (
                  <ActivityIndicator size="small" color="blue" />
                ) : (
                  <FlatList
                    onRefresh={getArticles}
                    refreshing={loading}
                    showsVerticalScrollIndicator={false}
                    data={articles}
                    keyExtractor={keyExtractor}
                    renderItem={renderListItem}
                  />
                )}
              </View>
            )}
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'flex-start',
    flex: 1,
  },
  headingContainer: {
    padding: 16,
    marginLeft: 16,
    // alignItems: 'center',
    // paddingRight: 0,
    borderBottomWidth: 0.3,
    borderBottomColor: 'grey',
    // elevation: 0.5,
  },
  headingText: {
    fontFamily: 'Rubik-Medium',
    fontSize: 12,
  },
  listContainer: {
    alignItems: 'center',
    padding: 20,
  },
  listItemContainer: {
    elevation: 1,
    backgroundColor: 'white',
    // paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 4,
    width: ScreenWidth * 0.89,
  },
  articleContainer: {padding: 12},
  upperContainer: {flexDirection: 'row'},
  textContainer: {flex: 0.7},
  titleContainer: {marginBottom: 8},
  titleText: {fontFamily: 'Rubik-Medium', fontSize: 14},
  description: {
    fontFamily: 'Rubik-Regular',
    fontSize: 11,
    color: 'rgb(116,120,124)',
  },
  sourceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  imageContainer: {flex: 0.3, marginLeft: 8},
  imageStyles: {width: 80, height: 80, borderRadius: 6},
  detailText: {fontFamily: 'Rubik-Regular', fontSize: 10},
  authorContainer: {flex: 0.5, alignItems: 'flex-end'},
  sourceTextContainer: {flex: 0.5},
  errorText: {fontFamily: 'Rubik-Medium', fontSize: 20},
});

export default React.memo(News);
