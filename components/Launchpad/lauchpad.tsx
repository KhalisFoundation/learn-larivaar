import React, {useEffect, useRef, useState} from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';

import {Ang} from '../../components';
import {layoutStyles, elementStyles} from '../../styles';

const Launchpad = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const textInputRef = useRef<TextInput>(null);
  const currentTheme = useTheme().colors;

  const [inputAng, setInputAng] = useState(1);
  const {getItem, setItem} = useAsyncStorage('@currentAng');

  const readItemFromStorage = async () => {
    const item = await getItem();
    if (item) {
      setInputAng(parseInt(item, 10));
    }
  };

  const saveCurrentAng = async (newValue: number) => {
    if (newValue < 1) {
      newValue = 1;
    }
    if (newValue > 1430) {
      newValue = 1430;
    }
    await setItem(newValue.toString());
    setInputAng(newValue);
  };

  useEffect(() => {
    readItemFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={layoutStyles.mainContainer}>
          <View style={layoutStyles.header}>
            {inputAng > 1 && (
              <FontAwesome5
                name="arrow-left"
                style={elementStyles(currentTheme).iconButton}
                onPress={() => {
                  saveCurrentAng(inputAng - 1);
                  textInputRef.current?.setNativeProps({
                    text: (inputAng - 1).toString(),
                  });
                }}
              />
            )}
            <TextInput
              placeholder="Enter Ang Number"
              inputMode="numeric"
              ref={textInputRef}
              style={elementStyles(currentTheme).input}
              defaultValue={inputAng.toString()}
              onSubmitEditing={event => {
                saveCurrentAng(parseInt(event.nativeEvent.text, 10));
              }}
            />
            {inputAng < 1430 && (
              <FontAwesome5
                name="arrow-right"
                style={elementStyles(currentTheme).iconButton}
                onPress={() => {
                  saveCurrentAng(inputAng + 1);
                  textInputRef.current?.setNativeProps({
                    text: (inputAng + 1).toString(),
                  });
                }}
              />
            )}
          </View>

          <Ang page={inputAng} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Launchpad;
