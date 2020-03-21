import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Linking,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const About = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient style={styles.container} colors={['#a3bded', '#6991c7']}>
        <View style={styles.aboutContainer}>
          <Text style={{fontFamily: 'Rubik-MediumItalic', fontSize: 24}}>
            About this project:
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.aboutContainer}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>Who am I?</Text>
          </View>
          <View style={styles.answerContainer}>
            <Text
              onPress={() => Linking.openURL('https://github.com/rohitpotato')}
              style={{...styles.link, fontSize: 16}}>
              Follow me on Github
            </Text>
          </View>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              Why another COVID-19 project?
            </Text>
          </View>
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>
              This app is coded by me during the coronavirus pandemic so I can
              play with a few libraries I never had time to toy with. I
              basically wanted a chart (and maybe plotting tools) that shows how
              the curve is getting flatten, and that's about it.
            </Text>
          </View>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>How did I build it?</Text>
          </View>
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>
              The current stack uses: React-Native, redux, redux-thunk,
              react-navigation-v5, react-native-svg-charts to glue this all
              together.
            </Text>
          </View>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>How does it work?</Text>
          </View>
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>
              Nothing fancy, the data is loaded directly from the same GitHub
              repo we all have access and the CSV files are loaded directly on
              your application using the excellent D3.js library.
            </Text>
          </View>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              What are the sources of the data?
            </Text>
          </View>
          <View style={{...styles.answerContainer, paddingTop: 12}}>
            <Text
              onPress={() => Linking.openURL('https://www.who.int/')}
              under
              style={styles.link}>
              WHO
            </Text>
          </View>
          <View style={{...styles.answerContainer, paddingTop: 12}}>
            <Text
              onPress={() =>
                Linking.openURL(
                  'https://www.cdc.gov/coronavirus/2019-ncov/index.html',
                )
              }
              under
              style={styles.link}>
              CDC
            </Text>
          </View>
          <View style={{...styles.answerContainer, paddingTop: 12}}>
            <Text
              onPress={() =>
                Linking.openURL(
                  'https://bnonews.com/index.php/2020/02/the-latest-coronavirus-cases/',
                )
              }
              under
              style={styles.link}>
              BNO
            </Text>
          </View>
          <View style={{...styles.answerContainer, paddingTop: 12}}>
            <Text
              onPress={() =>
                Linking.openURL('https://github.com/CSSEGISandData/COVID-19')
              }
              under
              style={styles.link}>
              GitHub
            </Text>
          </View>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>Want to Contribute?</Text>
          </View>
          <View style={styles.answerContainer}>
            <Text style={styles.answerContainer}>
              Open an issue or a pull request.
            </Text>
            <Text
              onPress={() =>
                Linking.openURL(
                  'https://github.com/rohitpotato/react-native-covid19-dashboard',
                )
              }
              style={{...styles.link, fontSize: 16}}>
              Repo Link
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    // padding: 16,
  },
  aboutContainer: {
    // flex: 1,
    padding: 16,
  },
  questionContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  link: {
    fontFamily: 'Rubik-Regular',
    color: 'black',
    textDecorationLine: 'underline',
  },
  questionText: {fontFamily: 'Rubik-Medium'},
  answerContainer: {alignItems: 'center', marginTop: 10, paddingHorizontal: 8},
  answerText: {fontFamily: 'Rubik-Regular', color: '#f3f3f3'},
});

export default About;
