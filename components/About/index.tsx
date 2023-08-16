import React from 'react';
import {View, Text, Image} from 'react-native';
import {elementStyles, layoutStyles} from '../../styles';

const About = (): JSX.Element => {
  return (
    <View style={layoutStyles.aboutContainer}>
      <Text style={elementStyles.heading}>Learn Larivaar</Text>
      <Text style={elementStyles.aboutText}>Created by</Text>
      <Image
        style={elementStyles.logo}
        source={require('../../assets/images/khalis-logo.png')}
      />
      <Text style={elementStyles.aboutText}>
        We welcome your comments, suggestions and corrections! For more
        information, visit us at Khalisfoundation.org
      </Text>
      <Text style={elementStyles.aboutText}>
        Please respectfully cover your head and remove your shoes when using
        this app.
      </Text>
      <Text style={elementStyles.aboutText}>
        Learn Larivaar utilizes BaniDB - the open source Gurbani Database and
        API used in many gurbani applications
      </Text>
    </View>
  );
};

export default About;
