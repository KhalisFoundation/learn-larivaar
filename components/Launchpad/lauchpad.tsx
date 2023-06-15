import React, {useRef, useState} from 'react';
import 'react-native-gesture-handler';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {Ang} from '../../components';
import {layoutStyles, elementStyles} from '../../styles';

const Launchpad = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const textInputRef = useRef<TextInput>(null);

  const [inputAng, setInputAng] = useState(1);
  return (
    <SafeAreaView>
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

          <Ang page={inputAng} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Launchpad;
