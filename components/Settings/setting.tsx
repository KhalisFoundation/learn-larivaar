import React, {useContext} from 'react';
import {View, Text, Switch, Button} from 'react-native';
import {layoutStyles} from '../../styles/layout';
import {LarivaarContext} from '../../context';

interface navigationProps {
  navigation: {
    closeDrawer: () => void;
  };
}

const Settings = ({navigation}: navigationProps): JSX.Element => {
  const {larivaarAssist, setLarivaarAssist} = useContext(LarivaarContext);
  return (
    <>
      <View style={layoutStyles.sidebar}>
        <Text>Larivaar Assist</Text>
        <Switch
          value={larivaarAssist}
          onChange={() => setLarivaarAssist(!larivaarAssist)}
        />
      </View>
      <Button title="Go Back" onPress={() => navigation.closeDrawer()} />
    </>
  );
};

export default Settings;
