import AsyncStorage from '@react-native-async-storage/async-storage';
import {StoreProperties} from './interface';

type StorageValue = number | boolean;

export const customStorage = {
  async getItem(key: string): Promise<StoreProperties | null> {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      console.log('data', JSON.parse(data));
      return JSON.parse(data);
    }
    return null;
  },
  async setItem(key: string, value: StorageValue): Promise<void> {
    AsyncStorage.setItem(key, JSON.stringify(value));
  },
  async removeItem(key: string): Promise<void> {
    AsyncStorage.removeItem(key);
  },
};
