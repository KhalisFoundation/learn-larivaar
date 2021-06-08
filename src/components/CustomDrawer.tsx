import React from 'react';

import {Image, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {useApp} from '../contexts/AppContext';
import {FontSizeButton} from '../components/FontSizeButton';
import About from '../components/About';

export function CustomDrawerContent(props, navigation) {
  const ctx = useApp();

  return (
    <View
      style={[
        styles.dWrap,
        {backgroundColor: ctx.nightMode ? 'black' : 'white'},
      ]}>
      <View style={{paddingLeft: 0, flex: 1}}>
        <View
          style={[styles.menuitem, {borderBottomWidth: 0, paddingBottom: 0}]}>
          <FontSizeButton />
        </View>
        <View style={styles.menuitem}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() =>
              ctx.nightMode ? ctx.setNightMode(false) : ctx.setNightMode(true)
            }>
            <Text
              style={{
                color: ctx.nightMode ? 'white' : 'black',
                fontSize: 21,
                paddingLeft: 20,
              }}>
              Night Mode
              {ctx.nightMode && (
                <View style={{paddingLeft: 125}}>
                  <Image
                    source={require('../img/tick.png')}
                    style={styles.imgStyle}
                  />
                </View>
              )}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuitem}>
          <TouchableOpacity onPress={() => null} style={{flex: 1}}>
            <Text
              style={{
                color: ctx.nightMode ? 'white' : 'black',
                fontSize: 21,
                paddingLeft: 20,
              }}>
              Swipe Navigation
              {'canSwipe' && (
                <View style={{paddingLeft: 70}}>
                  <Image
                    source={require('../img/tick.png')}
                    style={styles.imgStyle}
                  />
                </View>
              )}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuitem}>
          <Text
            style={{
              color: ctx.nightMode ? 'white' : 'black',
              fontSize: 21,
              paddingLeft: 20,
            }}
            onPress={() => null}>
            Keep Awake{' '}
            {true && (
              <View style={{paddingLeft: 114}}>
                <Image
                  source={require('../img/tick.png')}
                  style={styles.imgStyle}
                />
              </View>
            )}
          </Text>
        </View>
        <View style={styles.menuitem}>
          <Text
            style={{
              color: ctx.nightMode ? 'white' : 'black',
              fontSize: 21,
              paddingLeft: 20,
            }}
            onPress={() => null}>
            Larivaar{' '}
            {'isLarivaar' && (
              <View style={{paddingLeft: 152}}>
                <Image
                  source={require('../img/tick.png')}
                  style={styles.imgStyle}
                />
              </View>
            )}
          </Text>
        </View>
        <View style={styles.menuitem}>
          <Text
            style={{
              color: ctx.nightMode ? 'white' : 'black',
              fontSize: 21,
              paddingLeft: 20,
            }}
            onPress={() => null}>
            Sehaj Paath{' '}
            <View>
              <Text style={styles.sPath}>{ctx.daysProgress}/{ctx.daysTarget}</Text>
            </View>
          </Text>
        </View>
        {true && (
          <View style={{flex: 1}}>
            <View style={styles.menuitem}>
              <Text
                style={{
                  color: ctx.nightMode ? 'white' : 'black',
                  fontSize: 19,
                  paddingLeft: 35,
                }}
                onPress={() => ctx.openDailyAngModal('Daily')}>
                Set Desired Daily Ang
              </Text>
            </View>

            <View style={styles.menuitem}>
              <Text
                style={{
                  color: ctx.nightMode ? 'white' : 'black',
                  fontSize: 19,
                  paddingLeft: 35,
                }}
                onPress={() => ctx.setDatepickerOpen(true)}>
                Edit Samaaptee Date
              </Text>
            </View>
            <About />
          </View>
        )}
      </View>
    </View>
  );
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
    paddingTop: 100,
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
});
