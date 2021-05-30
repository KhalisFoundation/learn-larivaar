import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';

const CustModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={null}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>X</Text>
            </Pressable>

            <Text>
              Created By: {"\n"}
              <Image
                source={require('../icons/khalislogo150.png')}
              />
            </Text>
            <Text>We welcome your comments, suggestions and corrections!</Text>
            <Text>For information, suggestions, or help visit us at </Text>
            <Text
              style={{color: 'blue'}}
              onPress={() => Linking.openURL('https://khalisfoundation.org')}>
              KhalisFoundation.org!
            </Text>
            <Text>
              Please respectfully cover your head and remove your shoes when
              using this app.
            </Text>
            <Text>
              Learn Larivaar utilizes KhalisFoundation.org!
              <Text
                style={{color: 'blue'}}
                onPress={() => Linking.openURL('http://www.banidb.com/')}>
                BaniDB {"\n"}
              </Text>
              <Text>
              {"\n"}
                - the open source Gurbani database and API used in many Gurbani
                applications, such as SikhiToTheMax.{"\n"}
              </Text>
              <Image style={{width: 100, height: 30}}
                source={require('../icons/banidblogo150.png')}
              />
            </Text>
            <Text>Bhul Chuk Maaf!</Text>
            <Text>
              <Text
                style={{color: 'blue'}}
                onPress={() =>
                  Linking.openURL('https://khalisfoundation.org/projects/apps')
                }>
                More Apps by Khalis
              </Text>
            </Text>
            <Text>
              <Text
                style={{color: 'blue'}}
                onPress={() =>
                  Linking.openURL('https://khalisfoundation.org/donate')
                }>
                DONATE
              </Text>
            </Text>
            <Text>&copy; 2021 Khalis Foundation</Text>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>About</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'black',
    textAlign: 'left',
    fontSize: 21,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CustModal;
