import RNFS from 'react-native-fs';
import {unzip} from 'react-native-zip-archive';

export const downloadDBFile = async (setDownloadProgress: Function) => {
  const documentsPath = RNFS.DocumentDirectoryPath;
  const url = 'https://banidb.com/databases/sttmdesktop-evergreen-v2.zip';

  const localZipPath = `${RNFS.DocumentDirectoryPath}/realm.zip`;
  let path = RNFS.DocumentDirectoryPath + '/realm.zip';

  try {
    const download = RNFS.downloadFile({
      fromUrl: url,
      toFile: path,
      background: true,
      begin: () => {
        console.log('Download has begun');
      },
      progress: res => {
        const progress = (res.bytesWritten / res.contentLength).toFixed(2);
        console.log(progress);
        setDownloadProgress(parseFloat(progress));
      },
    });

    await download.promise;
    await unzip(localZipPath, documentsPath);
    deleteFile(localZipPath);
    return path;
  } catch (error) {
    console.error(error);
  }
};

const deleteFile = (filepath: string) => {
  RNFS.exists(filepath)
    .then(result => {
      if (result) {
        return RNFS.unlink(filepath)
          .then(() => {
            console.log('zip file deleted');
          })
          .catch(err => {
            console.log(err.message);
          });
      }
    })
    .catch(err => {
      console.log(err.message);
    });
};
