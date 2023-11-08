import React from 'react';
import 'react-native-gesture-handler';
import {StoreProvider} from 'easy-peasy';

import {store} from './store';
import AppWrapper from './components/AppWrapper';

const App = (): JSX.Element => {
  return (
    <StoreProvider store={store}>
      <AppWrapper />
    </StoreProvider>
  );
};

export default App;
