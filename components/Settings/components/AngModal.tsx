import React from 'react';

import {useTheme} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {elementStyles, layoutStyles} from '../../../styles';
import {useStoreActions, useStoreState} from '../../../store/hooks';
import {calculateCompletionDate, formatDate} from '../utils/date-utils';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const AngModal: React.FC<Props> = ({visible, onClose}) => {
  const currentTheme = useTheme().colors;
  const themeStyles = elementStyles(currentTheme);

  const {completionDate} = useStoreState(state => state);
  const {setAngsPerDay, setCompletitionDate} = useStoreActions(
    actions => actions,
  );

  const closeModal = () => {
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
      style={themeStyles.popup}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={layoutStyles.centeredView}>
          <View style={themeStyles.modalView}>
            <TouchableOpacity
              style={layoutStyles.closeButton}
              onPress={closeModal}>
              <FontAwesome5 name="times" size={24} color={currentTheme.text} />
            </TouchableOpacity>
            <Text style={themeStyles.heading}>Daily Angs</Text>
            <Text style={{color: currentTheme.text}}>
              When you set a goal for daily reading, you will see approximate
              date of completion
            </Text>
            <View style={layoutStyles.modalInput}>
              <TextInput
                style={{...themeStyles.input, textAlign: 'left'}}
                keyboardType="numeric"
                inputMode="numeric"
                placeholder="Angs"
                placeholderTextColor={currentTheme.text}
                onChangeText={angInput => {
                  setAngsPerDay(Number(angInput));
                  const completion = calculateCompletionDate(Number(angInput));
                  setCompletitionDate(completion);
                }}
              />
            </View>
            <Text style={themeStyles.smallText}>
              {`Estimated Samaaptee date: ${formatDate(completionDate)}`}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AngModal;
