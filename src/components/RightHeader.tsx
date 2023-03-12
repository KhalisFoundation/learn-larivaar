import React from 'react';
import {useApp} from '../contexts/AppContext';
import { TouchableOpacity, Image, } from 'react-native';


export function RightHeader({navigation}) {
  const ctx = useApp();
    return (
    <TouchableOpacity
      style={{paddingHorizontal: 10}}
      onPress={() => {
        ctx.larivaar ? (ctx.larivaarAssist ? ctx.setLarivaarAssist(false) : ctx.setLarivaarAssist(true)) : null
      }}>
      <Image
        style={{width: 35, height: 35}}
        source={require('../img/toggle.jpg')}
      />
    </TouchableOpacity>
  )
    }