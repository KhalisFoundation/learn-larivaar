import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

export function LeftHeader({navigation}) {
    return (
      <TouchableOpacity
        style={{paddingHorizontal: 10}}
        onPress={() => navigation.toggleDrawer()}>
        <Image
          style={{width: 35, height: 35}}
          source={require('../img/hamb.png')}
        />
      </TouchableOpacity>
    );
  }