import React, { useEffect} from 'react';
import {Text, ScrollView} from 'react-native';
import { Loading } from '../components/Loading';
import { DatePicker } from '../components/DatePicker'

import {styles} from './styles';
import {useApp} from '../contexts/AppContext';

export const HomeScreen = () => {
  const dta = useApp();
  const {loading, nightMode}= useApp();
  const getData = () => {
    dta.getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView style={[styles.container,{backgroundColor: nightMode ? 'black' : 'white'}]}>
      {loading && <Loading />}
      <Text style={{fontSize: dta.fontSize, color: nightMode ? 'white' : 'black'}}>{dta.resData ? dta.resData.toString(): ""}</Text>
    <DatePicker />
    </ScrollView>
  );
};