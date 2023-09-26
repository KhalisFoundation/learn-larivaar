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

import KeepAwake from 'react-native-keep-awake';
import {useTheme} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import {Ang} from '..';
import {layoutStyles, elementStyles} from '../../styles';
import {useStoreActions, useStoreState} from 'easy-peasy';

const Launchpad = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const currentTheme = useTheme().colors;
  const textInputRef = useRef<TextInput>(null);
  const themeStyles = elementStyles(currentTheme);

  const {larivaar, larivaarAssist, keepAwake, fontSize} = useStoreState(
    (state: any) => state.settings,
  );
  const {setLarivaar, setLarivaarAssist, setKeepScreenAwake, setFontSize} =
    useStoreActions((actions: any) => actions.settings);

  const [inputAng, setInputAng] = useState(1);
  const {getItem, setItem} = useAsyncStorage('@larivaar');
  const {getItem: getAng, setItem: setAng} = useAsyncStorage('@currentAng');

  const readAngFromStorage = async () => {
    const item = await getAng();
    if (item) {
      setInputAng(parseInt(item, 10));
    }
  };

  const readItemFromStorage = async () => {
    console.log('reading item from storage');
    const item = await getItem();
    if (item) {
      const savedSettings = JSON.parse(item);
      const savedKeys = Object.keys(savedSettings);
      savedKeys.includes('enabled') && setLarivaar(savedSettings.enabled);
      savedKeys.includes('fontSize') && setFontSize(savedSettings.fontSize);
      savedKeys.includes('assist') && setLarivaarAssist(savedSettings.assist);
      savedKeys.includes('keepAwake') &&
        setKeepScreenAwake(savedSettings.keepAwake);
    }
  };

  const saveCurrentAng = async (newValue: number) => {
    if (newValue < 1) {
      newValue = 1;
    }
    if (newValue > 1430) {
      newValue = 1430;
    }
    await setAng(newValue.toString());
    setInputAng(newValue);
  };

  useEffect(() => {
    readAngFromStorage();
    readItemFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save the app settings in AsyncStorage on change
  useEffect(() => {
    setItem(
      JSON.stringify({
        enabled: larivaar,
        assist: larivaarAssist,
        keepAwake,
        fontSize,
      }),
    );
  }, [larivaar, larivaarAssist, fontSize, keepAwake, setItem]);

  return (
    <SafeAreaView>
      {keepAwake && <KeepAwake />}
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={layoutStyles.mainContainer}>
          <View style={layoutStyles.header}>
            {inputAng > 1 && (
              <FontAwesome5
                name="arrow-left"
                style={themeStyles.iconButton}
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
              style={themeStyles.input}
              defaultValue={inputAng.toString()}
              onSubmitEditing={event => {
                saveCurrentAng(parseInt(event.nativeEvent.text, 10));
              }}
            />
            {inputAng < 1430 && (
              <FontAwesome5
                name="arrow-right"
                style={themeStyles.iconButton}
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
