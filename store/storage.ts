import AsyncStorage from '@react-native-async-storage/async-storage';

export const customStorage = {
  async getItem(key: any) {
    const data = await AsyncStorage.getItem(key);
    return JSON.parse(data);
  },
  async setItem(key: any, value: any) {
    AsyncStorage.setItem(key, JSON.stringify(value));
  },
  async removeItem(key: any) {
    AsyncStorage.removeItem(key);
  },
};
