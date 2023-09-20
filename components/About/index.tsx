import React from 'react';
import {View, Text, Image} from 'react-native';
import {elementStyles, layoutStyles} from '../../styles';
import {useTheme} from '@react-navigation/native';

const About = (): JSX.Element => {
  const currentTheme = useTheme().colors;
  const themeStyles = elementStyles(currentTheme);
  return (
    <View style={layoutStyles.aboutContainer}>
      <Text style={themeStyles.heading}>Learn Larivaar</Text>
      <Text style={themeStyles.aboutText}>Created by</Text>
      <Image
        style={themeStyles.logo}
        source={require('../../assets/images/khalis-logo.png')}
      />
      <Text style={themeStyles.aboutText}>
        We welcome your comments, suggestions and corrections! For more
        information, visit us at Khalisfoundation.org
      </Text>
      <Text style={themeStyles.aboutText}>
        Please respectfully cover your head and remove your shoes when using
        this app.
      </Text>
      <Text style={themeStyles.aboutText}>
        Learn Larivaar utilizes BaniDB - the open source Gurbani Database and
        API used in many gurbani applications
      </Text>
    </View>
  );
};

export default About;
