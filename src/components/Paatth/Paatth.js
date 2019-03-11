import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Actions
import { fetchAngAction } from '../../actions/ang';

// Styles
import styles from './Paatth.css';

const Paatth = ({
  angCache,
  currentAng: { ang, source },
  fetchAng,
}) => {
  useEffect(() => {
    if (!angCache[source][ang]) {
      fetchAng(ang, source);
    }
  });
  const verses = angCache[source][ang] || false;
  return (
    <div id="paatth" className={styles.paatth}>
      {verses && verses.map(verse => (
        verse.verse.split(' ').map((val, index) => {
          if (val.indexOf('॥') !== -1) {
            return (
              <React.Fragment key={`sbd-${verse.ID}-${index}`}>
                <i>{val}</i>
                {' '}
              </React.Fragment>
            );
          }
          return (
            <React.Fragment key={`sbd-${verse.ID}-${index}`}>
              <span>{val}</span>
              {' '}
            </React.Fragment>
          );
        })
      ))}
    </div>
  );
};
Paatth.propTypes = {
  angCache: PropTypes.shape({}).isRequired,
  currentAng: PropTypes.shape({}).isRequired,
  fetchAng: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentAng: state.currentAng,
  angCache: state.angCache,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAng: fetchAngAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Paatth);
