import React from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  Button,
} from 'react-native';
import {elementStyles, layoutStyles} from '../../styles';
import {useTheme} from '@react-navigation/native';

const About = ({navigation}: any): JSX.Element => {
  const currentTheme = useTheme().colors;
  const themeStyles = elementStyles(currentTheme);
  const handlePressKhalis = () => {
    Linking.openURL('https://khalisfoundation.org/');
  };
  const handlePressBaniDB = () => {
    Linking.openURL('http://www.banidb.com/');
  };
  return (
    <View style={layoutStyles.aboutContainer}>
      <Text style={themeStyles.aboutText}>Created by</Text>
      <Image
        style={themeStyles.logo}
        source={require('../../assets/images/khalis-logo.png')}
      />
      <Text style={themeStyles.aboutText}>
        We welcome your comments, suggestions and corrections! For more
        information, visit us at
        <TouchableOpacity onPress={handlePressKhalis}>
          <Text style={themeStyles.linkText}>Khalisfoundation.org</Text>
        </TouchableOpacity>
      </Text>
      <Text style={themeStyles.aboutText}>
        Please respectfully cover your head and remove your shoes when using
        this app.
      </Text>
      <Text style={themeStyles.aboutText}>
        Learn Larivaar utilizes{' '}
        <Text onPress={handlePressBaniDB} style={themeStyles.linkText}>
          BaniDB
        </Text>
        - the open source Gurbani Database and API used in many gurbani
        applications
      </Text>
      <View style={elementStyles(currentTheme).button}>
        <Button
          title="Go back"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

export default About;
