import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import {EXT_URL, DB_URL, MAIN_LOGO, DB_LOGO, BTN_CLOSE } from '../constants';

const About = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={null}
              onPress={() => setModalVisible(!modalVisible)}>
              <Image
                style={styles.imgStyle}
                source={BTN_CLOSE}
              />
            </Pressable>

            <Text>
              Created By: {'\n'}
              <Image source={MAIN_LOGO} />
            </Text>
            <Text>We welcome your comments, suggestions and corrections!</Text>
            <Text>For information, suggestions, or help visit us at </Text>
            <Text
              style={{color: 'blue'}}
              onPress={() => Linking.openURL(EXT_URL)}>
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
                onPress={() => Linking.openURL(DB_URL)}>
                BaniDB {'\n'}
              </Text>
              <Text>
                {'\n'}- the open source Gurbani database and API used in many
                Gurbani applications, such as SikhiToTheMax.{'\n'}
              </Text>
              <Image
                style={{width: 150, height: 35}}
                source={DB_LOGO}
              />
            </Text>
            <Text>Bhul Chuk Maaf!</Text>
            <Text>
              <Text
                style={{color: 'blue'}}
                onPress={() => Linking.openURL(EXT_URL + '/projects/apps')}>
                More Apps by Khalis
              </Text>
            </Text>
            <Text>
              <Text
                style={{color: 'blue'}}
                onPress={() => Linking.openURL(EXT_URL + '/donate')}>
                DONATE
              </Text>
            </Text>
            <Text>&copy; 2020 Khalis Foundation</Text>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.btnAbout}
        onPress={() => setModalVisible(true)}>
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
    alignItems: 'flex-start',
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
  imgStyle: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 0,
    left: 260,
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
  btnAbout:{
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  }
});

export default About;
