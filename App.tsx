/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';

import Tts from 'react-native-tts';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const [text, onChangeText] = React.useState('');
  const weatherForecast = 'Partly cloudy conditions will continue for the rest of the day. Wind gusts up to 13 mph.';
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  Tts.setIgnoreSilentSwitch('ignore');
  Tts.addEventListener('tts-start', (event) => console.log('start:', event));
  Tts.addEventListener('tts-progress', (event) => console.log('in progress:', event));
  Tts.addEventListener('tts-finish', (event) => console.log('finish:', event));
  Tts.addEventListener('tts-cancel', (event) => console.log('cancel:', event));

  const handleOnPress = () => {
    play(text);
  }

  const handlePlayPause = () => {
      play(weatherForecast);
  }

  const play = (txt) => {
    Tts.speak(txt, {
      iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
      rate: 0.5,
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 0.5,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Text to speech">
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder='Enter text to speech'
            />
            <Button
              title='Speak'
              onPress={() => handleOnPress()}
            />
          </Section>
          <Section title='Weather forecast'>
            <Text style={styles.weatherForecast}>
              {weatherForecast}
            </Text>
            <Button
              title='Play | Pause'
              onPress={() => handlePlayPause()}
            />
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  weatherForecast: {
    margin: 10,
    padding: 10,
  },
  input: {
    height: 40,
    width: 300,
    margin: 30,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
