import React from 'react';
import {View, Text, Image} from 'react-native';
import {elementStyles, layoutStyles} from '../../styles';
import {useTheme} from '@react-navigation/native';

const About = (): JSX.Element => {
  const currentTheme = useTheme().colors;
  return (
    <View style={layoutStyles.aboutContainer}>
      <Text style={elementStyles(currentTheme).heading}>Learn Larivaar</Text>
      <Text style={elementStyles(currentTheme).aboutText}>Created by</Text>
      <Image
        style={elementStyles(currentTheme).logo}
        source={require('../../assets/images/khalis-logo.png')}
      />
      <Text style={elementStyles(currentTheme).aboutText}>
        We welcome your comments, suggestions and corrections! For more
        information, visit us at Khalisfoundation.org
      </Text>
      <Text style={elementStyles(currentTheme).aboutText}>
        Please respectfully cover your head and remove your shoes when using
        this app.
      </Text>
      <Text style={elementStyles(currentTheme).aboutText}>
        Learn Larivaar utilizes BaniDB - the open source Gurbani Database and
        API used in many gurbani applications
      </Text>
    </View>
  );
};

export default About;
