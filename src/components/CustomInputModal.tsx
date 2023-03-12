import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";

import {useApp} from '../contexts/AppContext';

const CustomInputModal = () => {
const ctx = useApp();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ctx.dailyAngModalOpen}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TextInput
              onChangeText={value => ctx.popupType == 'Nav' ? ctx.setCustomAngNo(value): ctx.setDailyAngNo(value)}
              value={ctx.angNumber.toString()}
              style={{
                width: 80,
                marginHorizontal: 15,
                paddingHorizontal: 5,
                textAlign: 'center',
                height: 30,
                backgroundColor: 'white',
                borderColor: '#ccc',
                borderWidth: 1,
              }}>{ctx.popupType == 'Nav' ? ctx.angNumber : ctx.dailyAngValue}</TextInput>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => ctx.openDailyAngModal('Close')}
            >
              <Text style={styles.textStyle}>Enter</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 45,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.55,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    paddingHorizontal: 22,
    paddingVertical:10,
    marginTop:10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default CustomInputModal;