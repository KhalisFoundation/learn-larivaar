import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { styles } from '../screens/styles'

import {useApp} from '../contexts/AppContext';
import CustomInputModal from '../components/CustomInputModal'

export const CustomNav = () => {

  const app = useApp();

  function getDataWithNum(arg){
    if(arg == 'prev'){
      app.setAngNo('prev')
      app.getData()
    } else if(arg == 'next'){
      app.setAngNo('next');
      app.getData();
    }
  }
    return (
      <View style={styles.txtBox}>
        <CustomInputModal />
          <TouchableOpacity onPress={() => getDataWithNum('prev')}>
            <Image
              source={require('../img/left_arw.png')}
              style={{width: 30, height: 25}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => app.openDailyAngModal('Nav')}>
            <Text style={styles.inputBox}>{app.angNumber}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => getDataWithNum('next')}>
            <Image
              source={require('../img/right_arw.png')}
              style={{width: 30, height: 25}}
            />
          </TouchableOpacity>
        </View>
    );
  };