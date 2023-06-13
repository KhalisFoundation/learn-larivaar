import React, {useRef, useState} from 'react';
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
import {elementStyles} from './styles/elements';

const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const textInputRef = useRef<TextInput>(null);

  const [inputAng, setInputAng] = useState(1);
  const [larivaarAssist, setLarivaarAssist] = useState(false);

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
            <Button
              title="Previous"
              onPress={() => {
                setInputAng(inputAng - 1);
                textInputRef.current?.setNativeProps({
                  text: (inputAng - 1).toString(),
                });
              }}
            />
            <TextInput
              placeholder="Enter Ang Number"
              ref={textInputRef}
              style={elementStyles.input}
              defaultValue={inputAng.toString()}
              onSubmitEditing={event => {
                setInputAng(parseInt(event.nativeEvent.text, 10));
              }}
            />
            <Button
              title="Next"
              onPress={() => {
                setInputAng(inputAng + 1);
                textInputRef.current?.setNativeProps({
                  text: (inputAng + 1).toString(),
                });
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
