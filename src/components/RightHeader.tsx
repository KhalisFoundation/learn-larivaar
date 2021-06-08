import React from 'react';
import { TouchableOpacity, Image, } from 'react-native';


export function RightHeader({navigation}) {
    return (
    <TouchableOpacity
      style={{paddingHorizontal: 10}}
      onPress={() => navigation.navigate('HomeScreen')}>
      <Image
        style={{width: 35, height: 35}}
        source={require('../img/toggle.jpg')}
      />
    </TouchableOpacity>
  )
    }