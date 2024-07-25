import React, {useRef, JSX} from 'react';
import {TextInput, View} from 'react-native';

import 'react-native-gesture-handler';

import {useTheme} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {layoutStyles, elementStyles} from '../../styles';
import {useStoreState, useStoreActions} from '../../store/hooks';

export const AngInput = (): JSX.Element => {
  const currentTheme = useTheme().colors;
  const textInputRef = useRef<TextInput>(null);
  const themeStyles = elementStyles(currentTheme);

  const {
    angsPerDay,
    currentAng,
    currentAngForToday,
    databaseDownloaded,
    larivaar,
  } = useStoreState(state => state);
  const {setCurrentAng, setCurrentAngForToday} = useStoreActions(
    actions => actions,
  );

  const saveCurrentAng = async (newValue: number) => {
    if (newValue < 1) {
      newValue = 1;
    }
    if (newValue > 1430) {
      newValue = 1430;
    }
    if (currentAng !== newValue) {
      await setCurrentAng(newValue);
    }
  };

  const disabledLeftStyle =
    databaseDownloaded && currentAng > 1 ? {} : {opacity: 0.2};
  const disabledRightStyle =
    databaseDownloaded && currentAng < 1430 ? {} : {opacity: 0.2};
  const containerStyle = !larivaar
    ? {marginRight: 40, ...layoutStyles.angInputContainer}
    : {...layoutStyles.angInputContainer};

  return (
    <View style={containerStyle}>
      <FontAwesome5
        name="arrow-left"
        style={{...disabledLeftStyle}}
        size={22}
        color={currentTheme.text}
        onPress={() => {
          if (databaseDownloaded && currentAng > 1) {
            saveCurrentAng(currentAng - 1);
            textInputRef.current?.setNativeProps({
              text: (currentAng - 1).toString(),
            });
            if (currentAngForToday > 0 && angsPerDay > 0) {
              setCurrentAngForToday(currentAngForToday - 1);
            }
          }
        }}
      />
      <TextInput
        placeholder="Enter Ang Number"
        inputMode="numeric"
        keyboardType="numeric"
        ref={textInputRef}
        style={{...themeStyles.input}}
        defaultValue={currentAng.toString()}
        editable={databaseDownloaded}
        returnKeyType="done"
        onSubmitEditing={event => {
          saveCurrentAng(parseInt(event.nativeEvent.text, 10));
        }}
      />

      <FontAwesome5
        name="arrow-right"
        style={{...disabledRightStyle}}
        size={22}
        color={currentTheme.text}
        onPress={() => {
          if (databaseDownloaded && currentAng < 1430) {
            saveCurrentAng(currentAng + 1);
            textInputRef.current?.setNativeProps({
              text: (currentAng + 1).toString(),
            });
            if (angsPerDay > 0) {
              setCurrentAngForToday(currentAngForToday + 1);
            }
          }
        }}
      />
    </View>
  );
};
