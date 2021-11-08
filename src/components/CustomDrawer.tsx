import React, { useState } from 'react';

import {Image, View, TouchableOpacity, StyleSheet} from 'react-native';

import {useApp} from '../contexts/AppContext';
import {FontSizeButton} from '../components/FontSizeButton';
import About from '../components/About';
import {LeftHeader} from './LeftHeader';
import {RightHeader} from './RightHeader';
import {activateKeepAwake, deactivateKeepAwake} from 'expo-keep-awake';
import {
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

export function CustomDrawerContent(props, navigation) {
  const ctx = useApp();
  const [lefty, setLefty] = useState(false);
  const [awake, setAwake] = useState(false);
  const toggleTheme = () => {
      ctx.setNightMode(!ctx.nightMode);
  }

  const toggleLarivaar = () => {
    ctx.setLarivaar(!ctx.larivaar);
  }

  const toggleAwake = () => {
    setAwake(!awake);
    if (!awake) {
      activateKeepAwake();
    } else {
      deactivateKeepAwake();
    }
  }
  const toggleLefty = () => {
    setLefty(!lefty);
    if (lefty){
      navigation.setOptions(
        {
          headerLeft: () => <RightHeader navigation={navigation} />,
          headerRight: () => <LeftHeader navigation={navigation} />,
        }
      );
      console.log("Righty");
    } else {
      navigation.setOptions(
        {
          headerLeft: () => <LeftHeader navigation={navigation} />,
          headerRight: () => <RightHeader navigation={navigation} />,
        });
      console.log("Lefty");
    }
  }

  return (
    <View style={[
        styles.dWrap,
        {backgroundColor: ctx.nightMode ? 'black' : 'white'},
    ]}>
        <DrawerContentScrollView {...props} styles={{paddingLeft: 0, flex:1}}>
            {/*Font Size Button*/}
            <View style={[styles.menuitem, {borderBottomWidth:0, paddingBottom:0}]}>
                <FontSizeButton />
            </View>

            {/*Drawer Items */}
            <Drawer.Section>
                {/*Night mode */}
                <TouchableRipple onPress={()=>{toggleTheme()}} style={[styles.centeredView,{borderColor: '#ccc', borderWidth:1,}]}>
                    <View style={[styles.preference, {alignItems:'center'}]}>
                        <Text
                          style={{
                            color: ctx.nightMode ? 'white' : 'black',
                            fontSize: 21,
                            paddingLeft: 20,
                          }} onPressIn={undefined} onPressOut={undefined}>
                          Night Mode
                          </Text>
                        <View pointerEvents="none" style={{transform: [{scaleX: .9}, {scaleY: .9}]}}>
                            <Switch value={ctx.nightMode}/>
                        </View>
                    </View>
                </TouchableRipple>
                {/*Swipe Navigation */}
                <TouchableRipple onPress={()=>{null}} style={[styles.centeredView,{borderColor: '#ccc', borderWidth:1,}]}>
                    <View style={[styles.preference, {alignItems:'center'}]}>
                        <Text
                          style={{
                            color: ctx.nightMode ? 'white' : 'black',
                            fontSize: 21,
                            paddingLeft: 20,
                          }} onPressIn={undefined} onPressOut={undefined}>
                          Swipe Navigation
                          </Text>
                        <View pointerEvents="none" style={{transform: [{scaleX: .9}, {scaleY: .9}]}}>
                            <Switch value={null}/>
                        </View>
                    </View>
                </TouchableRipple>
                {/* Keep Awake */}
                <TouchableRipple onPress={()=>{toggleAwake()}} style={[styles.centeredView,{borderColor: '#ccc', borderWidth:1,}]}>
                    <View style={[styles.preference, {alignItems:'center'}]}>
                        <Text
                          style={{
                            color: ctx.nightMode ? 'white' : 'black',
                            fontSize: 21,
                            paddingLeft: 20,
                          }} onPressIn={undefined} onPressOut={undefined}>
                          Keep Awake
                          </Text>
                        <View pointerEvents="none" style={{transform: [{scaleX: .9}, {scaleY: .9}]}}>
                            <Switch value={awake}/>
                        </View>
                    </View>
                </TouchableRipple>
                {/* Larivaar */}
                <TouchableRipple onPress={()=>{toggleLarivaar()}} style={[styles.centeredView,{borderColor: '#ccc', borderWidth:1,}]}>
                    <View style={[styles.preference, {alignItems:'center'}]}>
                        <Text
                          style={{
                            color: ctx.nightMode ? 'white' : 'black',
                            fontSize: 21,
                            paddingLeft: 20,
                          }} onPressIn={undefined} onPressOut={undefined}>
                          Larivaar
                          </Text>
                        <View pointerEvents="none" style={{transform: [{scaleX: .9}, {scaleY: .9}]}}>
                            <Switch value={ctx.larivaar}/>
                        </View>
                    </View>
                </TouchableRipple>
                {/* Left-Handed Mode */}
                <TouchableRipple onPress={()=>{toggleLefty()}} style={[styles.centeredView,{borderColor: '#ccc', borderWidth:1,}]}>
                    <View style={[styles.preference, {alignItems:'center'}]}>
                        <Text
                          style={{
                            color: ctx.nightMode ? 'white' : 'black',
                            fontSize: 21,
                            paddingLeft: 20,
                          }} onPressIn={undefined} onPressOut={undefined}>
                          Left-Handed Mode
                          </Text>
                        <View pointerEvents="none" style={{transform: [{scaleX: .9}, {scaleY: .9}]}}>
                            <Switch value={lefty}/>
                        </View>
                    </View>
                </TouchableRipple >
                {/* About */}
                <TouchableRipple onPress={()=>{null}} style={[styles.centeredView,{borderColor: '#ccc', borderWidth:1,}]}>
                  <View style={[styles.preference, {alignItems:'center'}]}>
                    <Text
                      style={{
                        color: ctx.nightMode ? 'white' : 'black',
                        fontSize: 21,
                        paddingLeft: 20,
                      }} onPressIn={undefined} onPressOut={undefined}>
                      About
                    </Text>
                  </View>
                </TouchableRipple>
            </Drawer.Section>
        </DrawerContentScrollView>        
    </View>
    )
}

const styles = StyleSheet.create({
    menuitem: {
      paddingVertical: 10,
      fontSize: 21,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    menuitemtxt: {
      fontSize: 21,
      paddingLeft: 15,
    },
    stext: {
      fontSize: 20,
      textAlign: 'left',
    },
    hdr: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      paddingBottom: 5,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    imgStyle: {
      width: 20,
      height: 20,
      alignSelf: 'flex-end',
      tintColor: 'gray',
    },
    dWrap: {
      flex: 1,
      marginTop: 50,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    sPath: {
      width: 110,
      paddingLeft: 30,
      paddingRight: 10,
      textAlign: 'right',
      height: 20,
      alignSelf: 'flex-end',
      fontSize: 21,
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 4,
      paddingVertical: 5,
    },
  });
