import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {AngProps, AngData} from './interfaces';
import {layoutStyles} from '../../styles/layout';
import {bake} from './utils/bakePankti';

const Ang = (props: AngProps): JSX.Element => {
  const [currentAngData, setCurrentAngData] = useState({} as AngData);

  useEffect(() => {
    fetch(`https://api.banidb.com/v2/angs/${props.page}`)
      .then(res => res.json())
      .then(data => setCurrentAngData(data));
  }, [props.page]);

  return (
    <View style={layoutStyles.wordContainer}>
      {currentAngData.page &&
        currentAngData.page.map(page =>
          bake(page.verse.unicode, props.larivaarAssist),
        )}
    </View>
  );
};

export default Ang;
