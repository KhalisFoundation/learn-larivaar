import React, {useState} from 'react';

import {useTheme} from '@react-navigation/native';
import {
  Modal,
  Text,
  View,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import {elementStyles, layoutStyles} from '../../../styles';
import {useStoreActions, useStoreState} from '../../../store/hooks';
import {calculateDailyAngs, formatDate} from '../utils';

const twoDaysFromNow = new Date();
twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

interface Props {
  visible: boolean;
  onClose: () => void;
}

const DateModal: React.FC<Props> = ({visible, onClose}) => {
  const currentTheme = useTheme().colors;
  const themeStyles = elementStyles(currentTheme);

  const {angsPerDay, completionDate} = useStoreState(state => state);
  const {setCompletitionDate, setAngsPerDay} = useStoreActions(
    actions => actions,
  );

  const [dateDialog, setDateDialog] = useState(false);

  const closeModal = () => {
    onClose();
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={closeModal}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={layoutStyles.centeredView}>
          <View style={themeStyles.modalView}>
            <TouchableOpacity
              style={layoutStyles.closeButton}
              onPress={closeModal}>
              <FontAwesome5 name="times" size={24} color={currentTheme.text} />
            </TouchableOpacity>
            <Text style={themeStyles.heading}>Samaaptee Date</Text>
            <Text style={{color: currentTheme.text}}>
              When you set your desired finish date, you will be suggested
              number of Angs to read per day to finish on time
            </Text>
            <View style={layoutStyles.modalInput}>
              <TouchableOpacity onPress={() => setDateDialog(true)}>
                {Platform.OS === 'android' && (
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: currentTheme.text,
                        marginRight: 10,
                      }}>{`${formatDate(completionDate)}`}</Text>
                    <FontAwesome5
                      name="calendar"
                      size={18}
                      color={currentTheme.text}
                    />
                  </View>
                )}
              </TouchableOpacity>
              {dateDialog && (
                <DateTimePicker
                  testID="dateTimePicker"
                  mode="date"
                  is24Hour={true}
                  value={completionDate}
                  minimumDate={twoDaysFromNow}
                  onChange={(
                    event: DateTimePickerEvent,
                    selectedDate: Date | undefined,
                  ) => {
                    setDateDialog(false);
                    const currentDate = selectedDate;
                    if (currentDate && completionDate !== currentDate) {
                      const dailyAngs = calculateDailyAngs(currentDate);
                      setAngsPerDay(dailyAngs);
                      setCompletitionDate(currentDate);
                    }
                  }}
                />
              )}
            </View>
            <Text style={themeStyles.smallText}>
              {`Daily Angs to complete: ${angsPerDay}`}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DateModal;
