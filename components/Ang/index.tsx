import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import * as Progress from 'react-native-progress';

import {DoubleTap} from '../common';
import {bakePankti} from './utils/bake-pankti';
import {downloadDBFile} from './utils/download-db';
import {AngProps, AngsData} from './interfaces/api-response';
import {elementStyles, layoutStyles} from '../../styles';
import {useStoreActions, useStoreState} from '../../store/hooks';
import {loadAng} from '../../realm-search';

const Ang = (props: AngProps): JSX.Element => {
  const [currentAngData, setCurrentAngData] = useState(Array<AngsData>);
  const [isLoading, setIsLoading] = useState(true);

  const {larivaar, larivaarAssist, fontSize, databaseDownloaded} =
    useStoreState(state => state);
  const {setLarivaarAssist, setDatabaseDownloaded} = useStoreActions(
    actions => actions,
  );

  const [downloadProgress, setDownloadProgress] = useState(0);

  const currentTheme = useTheme().colors;

  const downloadRealmDB = async () => {
    try {
      const documentsPath = RNFS.DocumentDirectoryPath;
      const realmFilePath = `${documentsPath}/sttmdesktop-evergreen-v2.realm`;

      const fileExists = await RNFS.exists(realmFilePath);
      if (fileExists && !databaseDownloaded) {
        setDatabaseDownloaded(true);
        return;
      }
      try {
        await downloadDBFile(setDownloadProgress);
        if (!databaseDownloaded) {
          setDatabaseDownloaded(true);
        }
      } catch (networkError) {
        console.error('Network error occurred during download:', networkError);
        return;
      }
    } catch (error) {
      console.error('An error occurred: ', error);
    }
  };

  useEffect(() => {
    const getAllVerses = async (page: number) => {
      if (databaseDownloaded) {
        const angs = await loadAng(page);
        setCurrentAngData(angs);
        setIsLoading(false);
      }
    };
    getAllVerses(props.page);
  }, [props.page, databaseDownloaded]);

  useEffect(() => {
    if (!databaseDownloaded) {
      downloadRealmDB();
    }
  }, [databaseDownloaded]);

  if (!databaseDownloaded) {
    return (
      <View style={layoutStyles.loader}>
        <Text
          style={{
            ...layoutStyles.modalInput,
            ...elementStyles(currentTheme).aboutText,
          }}>
          Downloading the database. Please wait...
        </Text>
        <Progress.Circle
          showsText={true}
          progress={downloadProgress}
          size={140}
          thickness={5}
          color={currentTheme.primary}
          textStyle={layoutStyles.gurmukhiFont}
        />
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={layoutStyles.loader}>
        <ActivityIndicator size="large" color={currentTheme.text} />
      </View>
    );
  }
  return (
    <DoubleTap
      customTap={() => {
        larivaar && setLarivaarAssist(!larivaarAssist);
      }}>
      <View style={layoutStyles.wordContainer}>
        {currentAngData &&
          currentAngData.map(page =>
            bakePankti({
              verse: page.Gurmukhi,
              larivaar,
              larivaarAssist,
              currentTheme,
              fontSize,
            }),
          )}
      </View>
    </DoubleTap>
  );
};

export default Ang;
