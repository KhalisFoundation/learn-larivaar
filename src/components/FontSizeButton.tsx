import React from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import {styles} from '../screens/styles';
import {useApp} from '../contexts/AppContext';

export function FontSizeButton() {
const app = useApp();

  return (
    <View style={styles.FontBtnHdr}>
      <View
        style={{
          width: '50%',
          borderWidth: 1,
          borderColor: '#ccc',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}>
        <TouchableOpacity style={{marginLeft: 10}} onPress={() => app.changeFontSize('plus')}>
          <Image
            source={require('../img/plus.png')}
            style={{width: 25, height: 25, tintColor: 'gray'}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '50%',
          borderWidth: 1,
          borderColor: '#ccc',
          alignItems: 'center',
          padding: 10,
        }}>
        <TouchableOpacity style={{marginLeft: 10}} onPress={() => app.changeFontSize('minus')}>
          <Image
            source={require('../img/minus.png')}
            style={{width: 25, height: 25, tintColor: 'gray'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
