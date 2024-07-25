import React, {JSX} from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  Button,
} from 'react-native';
import {elementStyles} from '../../styles';
import {useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

const About = ({navigation}: any): JSX.Element => {
  const isDarkMode = useTheme().dark;
  const currentTheme = useTheme().colors;
  const themeStyles = elementStyles(currentTheme);
  const handlePressKhalis = () => {
    Linking.openURL('https://khalisfoundation.org/');
  };
  const handlePressBaniDB = () => {
    Linking.openURL('http://www.banidb.com/');
  };
  return (
    <ScrollView>
      <SafeAreaView>
        <Text style={themeStyles.aboutText}>Created by</Text>
        <Image
          style={themeStyles.logo}
          source={
            isDarkMode
              ? require('../../assets/images/khalis-logo-dark.png')
              : require('../../assets/images/khalis-logo.png')
          }
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
      </SafeAreaView>
    </ScrollView>
  );
};

export default About;
