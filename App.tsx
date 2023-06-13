import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import Ang from './components/Ang';
import {layoutStyles} from './styles/layout';

const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  const [inputAng, setInputAng] = useState(1);
  const [userInput, setUserInput] = useState('1');
  const [larivaarAssist, setLarivaarAssist] = useState(false);

  const getUserInput = (enteredText: string) => {
    setUserInput(enteredText);
  };

  return (
    <SafeAreaView>
      <NavigationContainer>
        <Switch
          value={larivaarAssist}
          onValueChange={() => setLarivaarAssist(!larivaarAssist)}
        />
      </NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={layoutStyles.mainContainer}>
          <View style={layoutStyles.header}>
            <TextInput
              placeholder="Enter Ang Number"
              onChangeText={getUserInput}
              value={userInput}
            />
            <Button
              title="Go"
              onPress={() => {
                setInputAng(parseInt(userInput, 10));
              }}
            />
          </View>

          <Ang page={inputAng} larivaarAssist={larivaarAssist} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
