import React from 'react';

import {useTheme} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
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
    <Modal transparent={true} visible={visible} onRequestClose={closeModal}>
      <View style={layoutStyles.centeredView}>
        <View style={layoutStyles.modalView}>
          <TouchableOpacity
            style={layoutStyles.closeButton}
            onPress={closeModal}>
            <FontAwesome5 name="times" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={themeStyles.heading}>Daily Angs</Text>
          <Text>
            When you set a goal for daily reading, you will see approximate date
            of completion
          </Text>
          <View style={layoutStyles.modalInput}>
            <TextInput
              style={{...themeStyles.input, textAlign: 'left'}}
              keyboardType="numeric"
              inputMode="numeric"
              placeholder="Angs"
              onChangeText={angInput => {
                setAngsPerDay(Number(angInput));
                const completionDate = calculateCompletionDate(
                  Number(angInput),
                );
                setCompletitionDate(completionDate);
              }}
            />
          </View>
          <Text style={themeStyles.smallText}>
            {`Estimated Samaaptee date: ${formatDate(completionDate)}`}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default AngModal;
