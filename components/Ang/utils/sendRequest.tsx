import AsyncStorage from '@react-native-async-storage/async-storage';
import {Cache} from 'react-native-cache';

const apiURL = 'https://api.banidb.com/v2/angs';

const cache = new Cache({
  namespace: 'learn-larivaar-gurbani',
  policy: {
    maxEntries: 50000,
    stdTTL: 0,
  },
  backend: AsyncStorage,
});

export const sendRequest = (
  page: number,
  setCurrentAngData: Function,
  setIsLoading: Function,
) => {
  setIsLoading(true);
  cache.get(`ang-${page}`).then(data => {
    if (data) {
      setIsLoading(false);
      setCurrentAngData(data);
    } else {
      getFromAPI(page).then(newData => {
        setCurrentAngData(newData);
        setIsLoading(false);
      });
      getFromAPI(page + 1);
    }
  });
};

const getFromAPI = async (page: number) => {
  const dataRequest = await fetch(`${apiURL}/${page}`);
  const data = await dataRequest.json();
  cache.set(`ang-${page}`, data);
  return data;
};
