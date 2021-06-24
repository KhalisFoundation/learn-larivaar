import React from 'react';
import {Text, View, Pressable, Modal} from 'react-native';
import {styles} from '../screens/styles';
import DateTimePicker from '@react-native-community/datetimepicker';

import {useApp} from '../contexts/AppContext';

export const DatePicker = () => {
    function updateDate(){

    }
    const dt = new Date();
  const app = useApp();
  return (
    <Modal animationType="slide" transparent={true} visible={app.datePickerPopup}>
      <View style={{ flexDirection: 'column-reverse', paddingTop:300}}>
        <View style={{backgroundColor: 'white', justifyContent: 'center'}}>
          <DateTimePicker
            testID="dateTimePicker"
            value={dt}
            mode={'date'}
            is24Hour={true}
            display="spinner"
            onChange={(event, date) => app.setSelSamapteeDate(date)}
          />
          
          <Pressable
            style={{
              alignItems: 'center',
              marginHorizontal: 60,
              backgroundColor: '#ccc',
              paddingVertical: 10,
            }}
            onPress={() => app.setDatepickerOpen(false)}>
            <Text style={{fontSize: 18}}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
