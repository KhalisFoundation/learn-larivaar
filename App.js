import React from 'react';
import {useState, useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Modal,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable
} from 'react-native';

import CustModal from './components/custmodal'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SideMenu from 'react-native-side-menu';
import GestureRecognizer from 'react-native-swipe-gestures';
import AsyncStorage from '@react-native-async-storage/async-storage';
import KeepAwake from 'react-native-keep-awake';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const nmodestyle = {
    backgroundColor: nMode ? 'black' : 'white',
  };

  const getsData = async(key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      return null
    }
  };

  const [isOpen, setisOpen] = useState(false);
  const [resData, setresData] = useState([]);
  const [ang, setAng] = useState(1);
  const [nMode, setnMode] = useState(false);
  const [canSwipe, setcanSwipe] = useState(false);
  const [fSize, setfSize] = useState(21);
  const [kAwake, setkAwake] = useState(false);
  const [sahajPaath, setsahajPaath] = useState(false);
  const [isLarivaar, setisLarivaar] = useState(false);
  const [datePicker, setdatePicker] = useState(false);
  const [dateSelected, setdateSelected] = useState(new Date(1598051730000));
  const [AngPop, setAngPop] = useState(false);
  const [AngModal, setAngModal] = useState(false);

  const [today_date, settoday_date ] = useState(getsData("today_date"));
  const [today_start, settoday_start ] = useState(getsData("today_start"));
  const [today_read, settoday_read ] = useState(ang - today_start);
  const [daily_total, setdaily_total] = useState(0);


  var now = moment().format('MM-DD-YYYY');
  console.log(now);
  //{list.map(item => <li key={item.item}>{item.item}</li>)}

  const menu = (
    <View
      style={{
        flex:1,
        paddingTop: 100,
        fjustifyContent: 'center',
        backgroundColor: nMode ? 'black' : 'white',
      }}>
      <View style={styles.hdr}>
        <View
          style={{
            width: '50%',
            borderWidth: 1,
            borderColor: '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
          }}>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => setfSize(fSize + 1)}>
            <Image
              source={require('./icons/plus.png')}
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
            padding: 5,
          }}>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => setfSize(fSize - 1)}>
            <Image
              source={require('./icons/minus.png')}
              style={{width: 25, height: 25, tintColor: 'gray'}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{paddingLeft: 20}}>
        <View style={styles.menuitem}>
          <TouchableOpacity style={{flex:1}}
            onPress={() => (nMode ? setnMode(false) : setnMode(true))}>
            <Text style={{color: nMode ? 'white' : 'black', fontSize: 21, alignSelf: 'flex-start', alignItems: 'center'}}>
              Night Mode {nMode && <View style={{paddingLeft: 95}}><Image
                source={require('./icons/tick.png')}
                style={{width: 20, height: 20, alignSelf: 'flex-end', tintColor: 'gray'}}
              /></View>
          }
            </Text>
            
          </TouchableOpacity>
        </View>
        <View style={styles.menuitem}>
          <TouchableOpacity onPress={() => canSwipe ? setcanSwipe(false) : setcanSwipe(true) } style={{flex:1}}>
            <Text style={{color: nMode ? 'white' : 'black', fontSize: 21}}>
              Swipe Navigation 
              {canSwipe && <View style={{paddingLeft: 50}}><Image
                source={require('./icons/tick.png')}
                style={{width: 20, height: 20, alignSelf: 'flex-end', tintColor: 'gray'}}
              /></View>
          }
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuitem}>
          <Text
            style={{color: nMode ? 'white' : 'black', fontSize: 21}}
            onPress={() => kAwake ? setkAwake(false) : setkAwake(true)}>
            Keep Awake {kAwake && <View style={{paddingLeft: 95}}><Image
                source={require('./icons/tick.png')}
                style={{width: 20, height: 20, alignSelf: 'flex-end', tintColor: 'gray'}}
              /></View>
          }
          </Text>
        </View>
        <View style={styles.menuitem}>
          <Text
            style={{color: nMode ? 'white' : 'black', fontSize: 21}}
            onPress={() => isLarivaar ? setisLarivaar(false) : setisLarivaar(true)}>
            Larivaar {isLarivaar && <View style={{paddingLeft: 132}}><Image
                source={require('./icons/tick.png')}
                style={{width: 20, height: 20, alignSelf: 'flex-end', tintColor: 'gray'}}
              /></View>
          }
          </Text>
        </View>
        <View style={styles.menuitem}>
          <Text
            style={{color: nMode ? 'white' : 'black', fontSize: 21}}
            onPress={() => sahajPaath ? setsahajPaath(false) : setsahajPaath(true)}>
            Sehaj Paath
          </Text>
        </View>
          { sahajPaath && <View>
            <View style={styles.menuitem}>
            <Text
              style={{color: nMode ? 'white' : 'black', fontSize: 19, paddingLeft: 15}}
              onPress={() => setAngPop(true)}>
              Set Desired Daily Ang
            </Text>
            </View>
         
        <View style={styles.menuitem}>
          <Text
            style={{color: nMode ? 'white' : 'black', fontSize: 19, paddingLeft:15}}
            onPress={() => datePicker ? setdatePicker(false) : setdatePicker(true)}>
            Edit Samaaptee Date 
          </Text>
          
          
        </View>
        </View> }
        <Text>{dateSelected.toString()}</Text>
        <View style={styles.menuitem}>
        <CustModal />
        </View>
      </View>
    </View>
  );

  const doSomething = () => {
    isOpen ? setisOpen(false) : setisOpen(true);
  };

  const storeData = async(key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };

  

  const getstoreData = async () => {
    try {
      const value = await AsyncStorage.getItem('ang');
      if (value !== null) {
        setAng(value);
        getData(value);
      } else {
        storeData('ang', '1');
        setAng('1');
        getData(ang);
      }
    } catch (e) {
      // error reading value
    }
  };

  var shabads_new = [];

  useEffect(ang => {
    getstoreData();
  }, []);

  function setDaily(angnew){
    console.log("set daily called", angnew);
    setAngPop(false)
  }

  function setSamaptee(){
    
  }

  function updateProgress(){
    if (daily_total > 0) {
      today_read = ang - today_start;
      var percent = Math.round((today_read/daily_total*100),1);
      if (percent > 100) {
        percent = 100;
      } else if (percent < 0) {
        percent = 0;
      }
      //$("#sehaj_paatth_progress").show().parent("a").addClass("hide-arrow");
      //$("#sehaj_paatth_today_read").text(today_read);
      //$("#sehaj_paatth_daily_total").text(daily_total);
      //$("#sehaj_paatth_setting_progress_bar").css("width", percent+"%");
    } else {
      //$("#sehaj_paatth_progress").hide().parent("a").removeClass("hide-arow");
      //$("#sehaj_paatth_setting_progress_bar").css("width", 0);
    }
    console.log("function called", moment(dateSelected).format("MM-DD-YYYY"));
    setdatePicker(false)
  }

  function getData(arg) {
    setAng(arg);
    shabads_new = [];
    var shabads;
    var lines = [];
    var allLines = '';
    fetch('https://api.banidb.com/v2/angs/' + arg + '/G')
      .then(response => response.json())
      .then(json => {
        for (var i = 0; i < json.page.length; i++) {
          lines.push(json.page[i].verse.unicode);
        }
        allLines = lines.join(' ');
        shabads = allLines.split(' ');

        for (let i = 0; i < shabads.length; i++) {
          shabads_new.push(
            shabads[i],
            /*<View key={i}>
              <Text>{shabads[i]}</Text>
            </View>*/
          );
        }
        setresData(shabads_new);
        storeData('ang', arg.toString())
      })
      .catch(error => console.error(error));
  }

  function fun(){
    console.log("fun loaded");
  }

  return (
    <SideMenu
      menu={menu}
      isOpen={isOpen}
      onChange={() => doSomething(isOpen)}
      menuPosition={'left'}
      scrollsToTop={false}>
      <SafeAreaView
        style={(backgroundStyle, {backgroundColor: nMode ? 'black' : 'white'})}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
{kAwake && <KeepAwake />}
        <View style={styles.hdr}>
          <View style={{width: '33%'}}>
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => doSomething()}>
              <Image
                source={require('./icons/menuicon.png')}
                style={{width: 40, height: 40}}
              />
            </TouchableOpacity>
          </View>
          <View style={({width: '33%'}, styles.hdr)}>
            <TouchableOpacity onPress={() => ang > 0 && getData(+ang - 1)}>
              <Image
                source={require('./icons/left_arw.png')}
                style={{width: 30, height: 25}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAngModal(true)}>
              <Text style={{padding:5, paddingHorizontal:10, borderColor:'#ccc', borderWidth:1, marginHorizontal:5}}>{ang}</Text>
            </TouchableOpacity>
            {/*<TextInput
              onChangeText={setAng}
              value={ang}
              style={{
                width: 40,
                marginHorizontal: 10,
                paddingHorizontal: 5,
                textAlign: 'center',
                height: 30,
                backgroundColor: 'white',
                borderColor: '#cccccc',
                borderWidth: 1,
              }}></TextInput>*/}
            <TouchableOpacity onPress={() => getData(+ang + 1)}>
              <Image
                source={require('./icons/right_arw.png')}
                style={{width: 30, height: 25}}
              />
            </TouchableOpacity>
          </View>
          <View style={{width: '33%', alignItems: 'flex-end'}}>
            <Image
              source={require('./icons/toggle.jpg')}
              style={{width: 35, height: 35}}
            />
          </View>
        </View>

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <GestureRecognizer
            //onSwipe={(direction, state) => doSomething(direction, state)}
            onSwipeLeft={() => canSwipe && getData(+ang + 1)}
            onSwipeRight={() => canSwipe && ang > 0 && getData(+ang - 1)}
            //config={config}
            style={{
              flex: 1,
              //backgroundColor: 'black'
            }}>
            <View
              style={{
                backgroundColor: nMode ? 'black' : 'white',
              }}>
               
              <Section>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    backgroundColor: nMode ? 'black' : 'white',
                  }}>
                  <Text
                    style={{color: nMode ? 'white' : 'black', fontSize: fSize}}>
                    {resData}
                  </Text>
                </View>
              </Section>
            </View>
          </GestureRecognizer>
          
        </ScrollView>
        
        <Modal animationType="slide"
        transparent={true}
        visible={datePicker}>
          <View style={styles.centeredView}>
            <View style={{backgroundColor: 'white', justifyContent: 'center'}}>
              <DateTimePicker
                testID="dateTimePicker"
                value={dateSelected}
                mode={'date'}
                is24Hour={true}
                display="spinner"
                onChange={(event, date) => { setdateSelected(new Date(date))}}
              />
              <Pressable style={{alignItems: 'center', marginHorizontal: 60, backgroundColor: '#ccc', paddingVertical:10}} 
              onPress={() => updateProgress()}>
            <Text style={{fontSize:18}}>Select</Text>
          </Pressable>
          </View>
          
       </View>
        </Modal>

    
      
            <Modal animationType="slide"
            transparent={true}
            visible={AngPop}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
              
              <View style={styles.modalView}>
              <TextInput
              //onChangeText={setAng}
              value={ang}
              style={{
                width: 80,
                marginHorizontal: 10,
                paddingHorizontal: 5,
                textAlign: 'center',
                height: 30,
                backgroundColor: 'white',
                borderColor: '#cccccc',
                borderWidth: 1,
              }}></TextInput>
                  <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#ccc', marginTop: 10, paddingVertical:5, paddingHorizontal:30}} 
                  onPress={() => setDaily(ang)}>
                <Text style={{fontSize:18}}>OK</Text>
              </TouchableOpacity>
              </View>
          
            </Modal>

            <Modal animationType="slide"
            transparent={true}
            visible={AngModal}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
              
              <View style={styles.modalView}>
              <TextInput
              onChangeText={setAng}
              value={ang}
              style={{
                width: 80,
                marginHorizontal: 10,
                paddingHorizontal: 5,
                textAlign: 'center',
                height: 30,
                backgroundColor: 'white',
                borderColor: '#cccccc',
                borderWidth: 1,
              }}></TextInput>
                  <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#ccc', marginTop: 10, paddingVertical:5, paddingHorizontal:30}} 
                  onPress={() => setAngModal(false)}>
                <Text style={{fontSize:18}}>OK</Text>
              </TouchableOpacity>
              </View>
          
            </Modal>
           
      </SafeAreaView>
    </SideMenu>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    //marginTop: 32,
    paddingHorizontal: 24,
    //backgroundColor: 'black'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
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
    justifyContent: 'flex-end'
  },
  modalView: {
    marginTop: '50%',
    marginHorizontal: 20,
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default App;
