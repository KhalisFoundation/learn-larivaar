import React, { useEffect} from 'react';
import {Text, ScrollView} from 'react-native';
import { Loading } from '../components/Loading';
import { DatePicker } from '../components/DatePicker'
import { useFonts } from 'expo-font';
import {styles} from './styles';
import {useApp} from '../contexts/AppContext';

export const HomeScreen = () => {
  const dta = useApp();
  const {loading, nightMode, larivaar}= useApp();
  const [fontsLoaded] = useFonts({
    'Muli': require('../../assets/fonts/Muli.ttf')
  });
  const getData = () => {
    dta.getData();
  };

  useEffect(() => {
    getData();
  }, []);

  const generateData = () => {
    const data = dta.resData;
    const res = <Text style={{fontSize: dta.fontSize, fontFamily: 'Muli', color: (larivaar && nightMode ? "white" : "black") }}>
        {larivaar ? (dta.larivaarAssist ? 
          data.map((ele, idx) => {
            if (idx % 2 != 0) {
              return (<Text style={{color: "orange"}} key={`${idx}-${ele}`}>{ele}</Text>);
            } else {
              return (<Text style={{color: nightMode ? 'white' : 'black'}} key={`${idx}-${ele}`}>{ele}</Text>);
            }
          })
        : data.join(""))
        : data.join(" ")}
      </Text>;
    return res;
  };
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={[styles.container,{backgroundColor: nightMode ? 'black' : 'white'}]}>
      {loading && <Loading />}
      {dta.resData && generateData()}
    <DatePicker />
    </ScrollView>
  );
};