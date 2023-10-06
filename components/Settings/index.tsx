import React, {useState} from 'react';
import {useStoreRehydrated} from 'easy-peasy';
import {useTheme} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  Modal,
  Switch,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Collapsible from 'react-native-collapsible';

import {layoutStyles} from '../../styles/layout';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {elementStyles} from '../../styles';

import {useStoreActions, useStoreState} from '../../store/hooks';
import DateTimePicker from '@react-native-community/datetimepicker';

import {TOTAL_ANGS, MIN_FONT_SIZE, MAX_FONT_SIZE} from '../constants';
import {calculateDailyAngs, formatDate} from './utils';

const Settings = ({navigation}: DrawerContentComponentProps): JSX.Element => {
  const {
    larivaar,
    larivaarAssist,
    keepScreenAwake,
    fontSize,
    darkTheme,
    leftHandedMode,
    swipeNavigation,
  } = useStoreState(state => state);

  const {
    setLarivaar,
    setLarivaarAssist,
    setKeepScreenAwake,
    setFontSize,
    setDarkTheme,
    setLeftHandedMode,
    setSwipeNavigation,
  } = useStoreActions(actions => actions);

  const isRehydrated = useStoreRehydrated();

  const currentTheme = useTheme().colors;
  const themeStyles = elementStyles(currentTheme);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [desiredAngModal, setDesiredAngModal] = useState(false);

  const [samaapteeDateModal, setSamaapteeDateModal] = useState(false);

  const [samaapteeDate, setsamaapteeDate] = useState(new Date());
  const [dailyAngs, setDailyAngs] = useState<number | null>(null);
  const [angsCompletionDate, setAngsCompletionDate] = useState<Date | string>(
    new Date(),
  );

  const [showTotalAngs, setShowTotalAngs] = useState(false);
  const [showSamaapteeDate, setShowSamaapteeDate] = useState(false);

  const [todayAngs, setTodayAngs] = useState<number | null>(null);

  const twoDaysFromNow = new Date();
  twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

  const onChangeDate = (event, selectedDate: any) => {
    const currentDate = selectedDate || samaapteeDate;
    setsamaapteeDate(currentDate);
    const AngsPerDay = calculateDailyAngs(currentDate);
    setDailyAngs(AngsPerDay);
    setTodayAngs(AngsPerDay);
    if (!showTotalAngs) {
      setShowTotalAngs(true);
    }
  };

  const onChangeAngs = (selectedAngs: string) => {
    const angs = Number(selectedAngs);
    const totalDays = TOTAL_ANGS / angs;
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + totalDays + 1);
    const formattedDate = formatDate(endDate);
    setAngsCompletionDate(formattedDate);
    setTodayAngs(angs);
    if (!showSamaapteeDate && selectedAngs.trim().length > 0) {
      setShowSamaapteeDate(true);
    }
    if (selectedAngs.trim().length === 0) {
      setShowSamaapteeDate(false);
    }
  };
  return isRehydrated ? (
    <>
      <View style={layoutStyles.settingContainer}>
        <View style={layoutStyles.sidebarWrapper}>
          <View style={layoutStyles.sidebarScreens}>
            <Pressable
              style={layoutStyles.sidebarItem}
              onPress={() => navigation.navigate('Learn Larivaar')}>
              <Text style={themeStyles.sidebarItem}>Home</Text>
            </Pressable>
            <Pressable
              style={layoutStyles.sidebarItem}
              onPress={() => navigation.navigate('About')}>
              <Text style={themeStyles.sidebarItem}>About</Text>
            </Pressable>
          </View>

          <View style={layoutStyles.sidebarSettings}>
            <Text style={themeStyles.heading}>Settings</Text>
            <View style={layoutStyles.sidebarItem}>
              <Text style={themeStyles.sidebarItem}>Font size</Text>
              <View style={layoutStyles.sidebarItem}>
                <FontAwesome5
                  name="plus-circle"
                  style={{paddingLeft: 10, fontSize: 20}}
                  onPress={() => {
                    if (fontSize < MAX_FONT_SIZE) {
                      setFontSize(fontSize + 2);
                    }
                  }}
                />
                <FontAwesome5
                  name="minus-circle"
                  style={{paddingLeft: 10, fontSize: 20}}
                  onPress={() => {
                    if (fontSize > MIN_FONT_SIZE) {
                      setFontSize(fontSize - 2);
                    }
                  }}
                />
              </View>
            </View>
            <View style={layoutStyles.sidebarItem}>
              <Text style={themeStyles.sidebarItem}>Larivaar</Text>
              <Switch
                value={larivaar}
                onChange={() => {
                  setLarivaar(!larivaar);
                }}
              />
            </View>
            <View style={layoutStyles.sidebarItem}>
              <Text style={themeStyles.sidebarItem}>Larivaar Assist</Text>
              <Switch
                value={larivaarAssist}
                onChange={() => {
                  setLarivaarAssist(!larivaarAssist);
                }}
              />
            </View>
            <View style={layoutStyles.sidebarItem}>
              <Text style={themeStyles.sidebarItem}>Keep Screen Awake</Text>
              <Switch
                value={keepScreenAwake}
                onChange={() => {
                  setKeepScreenAwake(!keepScreenAwake);
                }}
              />
            </View>
            <View style={layoutStyles.sidebarItem}>
              <Text style={themeStyles.sidebarItem}>Night Mode</Text>
              <Switch
                value={darkTheme}
                onChange={() => {
                  setDarkTheme(!darkTheme);
                }}
              />
            </View>
            <View style={layoutStyles.sidebarItem}>
              <Text style={themeStyles.sidebarItem}>Left-Handed Mode</Text>
              <Switch
                value={leftHandedMode}
                onChange={() => {
                  setLeftHandedMode(!leftHandedMode);
                }}
              />
            </View>
            <View style={layoutStyles.sidebarItem}>
              <Text style={themeStyles.sidebarItem}>Swipe Navigation</Text>
              <Switch
                value={swipeNavigation}
                onChange={() => {
                  setSwipeNavigation(!swipeNavigation);
                }}
              />
            </View>
            <Modal
              visible={desiredAngModal}
              onRequestClose={() => {
                setDesiredAngModal(!desiredAngModal);
              }}>
              <View style={layoutStyles.centeredView}>
                <View style={layoutStyles.modalView}>
                  <TouchableOpacity
                    style={layoutStyles.closeButton}
                    onPress={() => setDesiredAngModal(false)}>
                    <FontAwesome5 name="times" size={24} color="#000" />
                  </TouchableOpacity>
                  <Text style={themeStyles.heading}>Daily Angs</Text>
                  <Text>
                    When you set a goal for daily reading, you will see
                    approximate date of completion
                  </Text>
                  <View style={layoutStyles.modalInput}>
                    <TextInput
                      style={themeStyles.input}
                      keyboardType="numeric"
                      inputMode="numeric"
                      placeholder="Angs"
                      onChangeText={onChangeAngs}
                    />
                  </View>
                  {showSamaapteeDate && (
                    <Text style={themeStyles.smallText}>
                      Samaaptee: {angsCompletionDate.toString()}{' '}
                    </Text>
                  )}
                </View>
              </View>
            </Modal>

            <Modal
              visible={samaapteeDateModal}
              onRequestClose={() => {
                setSamaapteeDateModal(!samaapteeDateModal);
              }}>
              <View style={layoutStyles.centeredView}>
                <View style={layoutStyles.modalView}>
                  <TouchableOpacity
                    style={layoutStyles.closeButton}
                    onPress={() => setSamaapteeDateModal(false)}>
                    <FontAwesome5 name="times" size={24} color="#000" />
                  </TouchableOpacity>
                  <Text style={themeStyles.heading}>Samaaptee Date</Text>
                  <Text>
                    When you set your desired finish date, you will be suggested
                    a number of Angs to read per day to finish on time
                  </Text>
                  <View style={layoutStyles.modalInput}>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={samaapteeDate}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={onChangeDate}
                      minimumDate={twoDaysFromNow}
                    />
                  </View>
                  {showTotalAngs && (
                    <Text style={themeStyles.smallText}>
                      Daily Angs to Complete: {dailyAngs}{' '}
                    </Text>
                  )}
                </View>
              </View>
            </Modal>
            <View>
              <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
                <View style={layoutStyles.sidebarItem}>
                  <Text style={themeStyles.sidebarItem}>Sehaj Paatth</Text>
                  {todayAngs === null || todayAngs === 0 ? (
                    <FontAwesome5 name="angle-down" size={24} color="#000" />
                  ) : (
                    <Text>0/{todayAngs}</Text>
                  )}
                </View>
              </TouchableOpacity>
              <Collapsible collapsed={isCollapsed}>
                <View>
                  <TouchableOpacity
                    onPress={() => setDesiredAngModal(true)}
                    style={layoutStyles.nestedSidebarSettings}>
                    <Text style={themeStyles.sidebarItem}>
                      Set Desired Daily Ang
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSamaapteeDateModal(true)}
                    style={layoutStyles.nestedSidebarSettings}>
                    <Text style={themeStyles.sidebarItem}>
                      Edit Samaaptee Date
                    </Text>
                  </TouchableOpacity>
                </View>
              </Collapsible>
            </View>
          </View>
        </View>
      </View>
    </>
  ) : (
    <Text>Loading..</Text>
  );
};

export default Settings;
