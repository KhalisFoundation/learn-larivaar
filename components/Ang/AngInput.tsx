import React, {useRef} from 'react';
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

  const {currentAng, leftHandedMode} = useStoreState(state => state);
  const {setCurrentAng} = useStoreActions(actions => actions);

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

  const menuAdjustmentStyle = leftHandedMode
    ? {marginLeft: 50}
    : {marginRight: 50};
  const disabledLeftStyle = currentAng > 1 ? {} : {opacity: 0.2};
  const disabledRightStyle = currentAng < 1430 ? {} : {opacity: 0.2};

  return (
    <View style={{...menuAdjustmentStyle, ...layoutStyles.header}}>
      <FontAwesome5
        name="arrow-left"
        style={{...disabledLeftStyle, ...themeStyles.iconButton}}
        onPress={() => {
          if (currentAng > 1) {
            saveCurrentAng(currentAng - 1);
            textInputRef.current?.setNativeProps({
              text: (currentAng - 1).toString(),
            });
          }
        }}
      />
      <TextInput
        placeholder="Enter Ang Number"
        inputMode="numeric"
        ref={textInputRef}
        style={themeStyles.input}
        defaultValue={currentAng.toString()}
        onSubmitEditing={event => {
          saveCurrentAng(parseInt(event.nativeEvent.text, 10));
        }}
      />
      <FontAwesome5
        name="arrow-right"
        style={{...disabledRightStyle, ...themeStyles.iconButton}}
        onPress={() => {
          if (currentAng < 1430) {
            saveCurrentAng(currentAng + 1);
            textInputRef.current?.setNativeProps({
              text: (currentAng + 1).toString(),
            });
          }
        }}
      />
    </View>
  );
};
