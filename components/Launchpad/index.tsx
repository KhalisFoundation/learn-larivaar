import React from 'react';
import 'react-native-gesture-handler';

import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import KeepAwake from 'react-native-keep-awake';

import {Ang} from '..';
import {layoutStyles} from '../../styles';
import {useStoreState, useStoreActions} from '../../store/hooks';

const Launchpad = (): JSX.Element => {
  const {darkTheme} = useStoreState(state => state);

  const isDarkMode = darkTheme === true;

  const {keepScreenAwake, swipeNavigation, currentAng} = useStoreState(
    state => state,
  );
  const {setCurrentAng} = useStoreActions(action => action);

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
  const onSwipe = (event: any) => {
    const {translationX} = event.nativeEvent;
    if (swipeNavigation) {
      if (translationX < 0) {
        // Swipe Right
        saveCurrentAng(currentAng + 1);
      } else if (translationX > 0) {
        // Swipe Left
        saveCurrentAng(currentAng - 1);
      }
    }
  };

  return (
    <SafeAreaView>
      {keepScreenAwake && <KeepAwake />}
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <PanGestureHandler onEnded={onSwipe}>
        <ScrollView>
          <View style={layoutStyles.mainContainer}>
            <Ang page={currentAng} />
          </View>
        </ScrollView>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

export default Launchpad;
