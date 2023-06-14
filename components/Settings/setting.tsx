import React from 'react';
import {View, Text, Switch} from 'react-native';
import {layoutStyles} from '../../styles/layout';

const Settings = (props: Object): JSX.Element => {
  console.log('props', props);
  return (
    <>
      <View style={layoutStyles.sidebar}>
        <Text>Larivaar Assist</Text>
        <Switch value={false} />
      </View>
    </>
  );
};

export default Settings;
