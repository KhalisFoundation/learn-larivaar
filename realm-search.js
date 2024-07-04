/* eslint-disable prettier/prettier */
import Realm from 'realm';
import RNFS from 'react-native-fs';

const realmFile = 'sttmdesktop-evergreen-v2.realm';
const schemaFile = 'realm-schema-evergreen.json';
const realmPath = RNFS.DocumentDirectoryPath + `/${realmFile}`;
const realmSchema = RNFS.DocumentDirectoryPath + `/${schemaFile}`;

const realmConfig = {
  path: realmPath,
  schema: realmSchema.schemas,
  schemaVersion: realmSchema.schemaVersion,
};

let initialized = false;

const init = () => {
  try {
    initialized = true;
  } catch (e) {
    initialized = false;
  }
};


const loadAng = (PageNo, SourceID = 'G') =>
  new Promise((resolve, reject) => {
    if (!initialized) {
      init();
    }

    Realm.open(realmConfig)
      .then(realm => {
        const rows = realm.objects('Verse').filtered('PageNo = $0 AND Source.SourceID = $1', PageNo, SourceID);
        if (rows.length > 0) {
          resolve(rows);
        } else {
          reject();
        }
      })
      .catch(reject);
});

export {
  loadAng,
};
