import React, {useEffect, useRef, useState} from 'react';
import 'react-native-gesture-handler';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  View,
} from 'react-native';

import KeepAwake from 'react-native-keep-awake';
import {useTheme} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import {Ang} from '..';
import {layoutStyles, elementStyles} from '../../styles';
import {useStoreState} from '../../store/hooks';
import { PanGestureHandler,  PanGestureHandlerGestureEvent, HandlerStateChangeEvent, State } from 'react-native-gesture-handler';

const Launchpad = (): JSX.Element => {
  const {darkTheme} = useStoreState(state => state);

  const isDarkMode = darkTheme === true;
  const currentTheme = useTheme().colors;
  const textInputRef = useRef<TextInput>(null);
  const themeStyles = elementStyles(currentTheme);

  const {keepScreenAwake, swipeNavigation} = useStoreState(state => state);
  const [inputAng, setInputAng] = useState(1);
  const {getItem: getAng, setItem: setAng} = useAsyncStorage('@currentAng');

  const readAngFromStorage = async () => {
    const item = await getAng();
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
    await setAng(newValue.toString());
    setInputAng(newValue);
  };
  const onSwipe = (event: any) => {
    const { translationX } = event.nativeEvent;
    if(swipeNavigation){
      if (translationX < 0) { // Swipe Right
        saveCurrentAng(inputAng + 1);
        textInputRef.current?.setNativeProps({
          text: (inputAng + 1).toString(),
        });
      } else if (translationX > 0) { // Swipe Left
        saveCurrentAng(inputAng - 1);
        textInputRef.current?.setNativeProps({
          text: (inputAng - 1).toString(),
        });
      }
    }
    
  }
  useEffect(() => {
    readAngFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView>
      {keepScreenAwake && <KeepAwake />}
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <PanGestureHandler onEnded={onSwipe}>
      
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
      </PanGestureHandler>
    </SafeAreaView>
  );
};

export default Launchpad;
