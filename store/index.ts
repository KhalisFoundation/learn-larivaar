import {createStore, persist} from 'easy-peasy';
import {StoreInterface} from './interface';
import {storeModel} from './model';
import {customStorage} from './storage';

export const store = createStore<StoreInterface>(
  persist(storeModel, {
    storage: customStorage,
    allow: ['larivaar', 'larivaarAssist', 'fontSize', 'keepScreenAwake'],
  }),
);
