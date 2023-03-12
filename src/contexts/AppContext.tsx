import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ResData, appService} from '../services';
import {FONT_SIZE} from '../constants';

type ResContextData = {
  resData?: ResData;
  loading: boolean;
  angNumber: number;
  dailyAngValue: number;
  nightMode: boolean;
  dailyAngModalOpen: boolean;
  fontSize: number;
  datePickerPopup: boolean;
  popupType: string;
  samapteeDate: Date;
  daysTarget: Number;
  daysProgress: Number;
  larivaar: boolean;
  larivaarAssist: boolean;
  getData(): Promise<void>;
  setNightMode(arg: boolean): void;
  setAngNo(arg: string): void;
  setPopup(arg: string): void;
  setCustomAngNo(arg: string): void;
  setDailyAngNo(arg: string): void;
  changeFontSize(arg: string): void;
  openDailyAngModal(arg: string): void;
  setDatepickerOpen(arg: boolean): void;
  setSelSamapteeDate(arg: Date): void;
  setLarivaar(arg: boolean): void;
  setLarivaarAssist(arg: boolean): void;
};

const AppContext = createContext<ResContextData>({} as ResContextData);

const AppProvider: React.FC = ({children}) => {
  const [resData, setResData] = useState<ResData>();
  const [loading, setLoading] = useState(true);
  const [angNumber, setangNumber] = useState(1);
  const [nightMode, setnightMode] = useState(false);
  const [fontSize, setFontSize] = useState(FONT_SIZE);
  const [dailyAngModalOpen, setdailyAngModalOpen] = useState(false);
  const [dailyAngValue, setdailyAngValue] = useState();
  const [popupType, setpopupType] = useState();
  const [datePickerPopup, setdatePickerPopup] = useState(false);
  const [samapteeDate, setSamapteeDate] = useState();
  const [daysProgress, setdaysProgress] = useState(0);
  const [daysTarget, setdaysTarget] = useState();
  const [larivaar, setlarivaar] = useState(true);
  const [larivaarAssist, setlarivaarassist] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  const setAngNo = str => {

    calculateDaysProgress(str);
    if (str == 'next') {
      setangNumber(angNumber + 1);
      setLoading(true);
    } else if (str == 'prev') {
      setangNumber(angNumber > 1 ? angNumber - 1 : 1);
      setLoading(true);
    }
  };

  async function setSelSamapteeDate(arg){
    setSamapteeDate(arg)
    await AsyncStorage.setItem('@SamapteeDate', arg);
  }

  function setDatepickerOpen(arg){
    if(arg){
      setdatePickerPopup(true)
    } else {
      setdatePickerPopup(false)
    }
  }

  async function calculateDayTarget(angno){
    let daysPr = (1430 - Number(angNumber)) / Number(angno)
    setdaysTarget(Math.floor(daysPr));
  }

  async function calculateDaysProgress(arg){
    if (arg == 'next') {
    setdaysProgress(daysProgress + 1);
  } else if (arg == 'prev') {
    setdaysProgress(daysProgress -1);
  }
}

  async function setDailyAngNo(str) {
      setdailyAngValue(Number(str));
      calculateDayTarget(Number(str));
      await AsyncStorage.setItem('@DailyAng', str);
  };

  const setCustomAngNo = str => {
    setangNumber(Number(str));
    setLoading(true);
  };

  const setPopup = str => {
    
  };

  async function changeFontSize(str) {
    if (str == 'plus') {
      setFontSize(fontSize + 1);
    } else if (str == 'minus') {
      setFontSize(fontSize - 1);
    }
    await AsyncStorage.setItem('@FontSize', fontSize.toString());
  }

  async function setNightMode(str) {
    if (str) {
      setnightMode(true);
      await AsyncStorage.setItem('@NightMode', 'true');
    } else {
      setnightMode(false);
      await AsyncStorage.setItem('@NightMode', 'false');
    }
  }

  async function setLarivaar(bool: boolean) {
    if (bool) {
      setlarivaar(true);
      await AsyncStorage.setItem('@Larivaar', 'true');
    } else {
      setlarivaar(false);
      await AsyncStorage.setItem('@Larivaar', 'false');
    }
  }

  async function setLarivaarAssist(bool: boolean) {
    if (bool) {
      setlarivaarassist(true);
      await AsyncStorage.setItem('@LarivaarAssist', 'true');
    } else {
      setlarivaarassist(false);
      await AsyncStorage.setItem('@LarivaarAssist', 'false');
    }
  }

  const openDailyAngModal = str => {
    if (str == 'Daily') {
      setpopupType('Daily');
      setdailyAngModalOpen(true);
    } else if(str == 'Nav'){
      setpopupType('Nav');
      setdailyAngModalOpen(true);
    } else{
      setdailyAngModalOpen(false);
    }
  };

  async function loadStorageData(): Promise<void> {
    try {
      //await AsyncStorage.setItem('@AngNumber', '1');
      const AngNumber = await AsyncStorage.getItem('@AngNumber');
      const NightMode = await AsyncStorage.getItem('@NightMode');
      const Larivaar = await AsyncStorage.getItem('@Larivaar');
      const LarivaarAssist = await AsyncStorage.getItem('@LarivaarAssist');
      const FontSize = await AsyncStorage.getItem('@FontSize');
      const DailyAng = await AsyncStorage.getItem('@DailyAng');

      setdailyAngValue(JSON.parse(DailyAng));
      setnightMode(JSON.parse(NightMode));
      setlarivaar(JSON.parse(Larivaar));
      setlarivaarassist(JSON.parse(LarivaarAssist));
      setFontSize(Number(FontSize));
      if (AngNumber) {
        setangNumber(Number(AngNumber));
        getData();
      } else {
        await AsyncStorage.setItem('@AngNumber', '1');
        setangNumber(1);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const getData = async () => {
    const _resData = await appService.getData(angNumber);
    setResData(_resData);
    setLoading(false);
    AsyncStorage.setItem('@AngNumber', angNumber.toString());
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('@AuthData');
  };

  return (
    <AppContext.Provider
      value={{
        resData,
        angNumber,
        nightMode,
        loading,
        fontSize,
        dailyAngModalOpen,
        dailyAngValue,
        popupType,
        datePickerPopup,
        samapteeDate,
        daysProgress,
        daysTarget,
        larivaar,
        larivaarAssist,
        openDailyAngModal,
        setNightMode,
        getData,
        setAngNo,
        changeFontSize,
        setDailyAngNo,
        setCustomAngNo,
        setPopup,
        setDatepickerOpen,
        setSelSamapteeDate,
        setLarivaar,
        setLarivaarAssist,
      }}>
      {children}
    </AppContext.Provider>
  );
};

function useApp(): ResContextData {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export {AppContext, AppProvider, useApp};
