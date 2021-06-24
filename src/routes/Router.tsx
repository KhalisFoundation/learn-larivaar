import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AppStack} from './AppStack';

export const Router = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};