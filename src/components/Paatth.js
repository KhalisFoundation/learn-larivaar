import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Actions
import { fetchAngAction } from '../actions/ang';

const Paatth = ({
  verses,
}) => (
  <div id="paatth">
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
Paatth.propTypes = {
  verses: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.bool,
  ]),
};
Paatth.defaultProps = {
  verses: false,
};

class PaatthContainer extends React.Component {
  componentDidMount() {
    const { angCache, currentAng: { ang, source }, fetchAng } = this.props;
    if (!angCache[source][ang]) {
      fetchAng(ang, source);
    }
  }

  render() {
    const { angCache, currentAng: { ang, source } } = this.props;
    return (
      <Paatth verses={angCache[source][ang]} />
    );
  }
}
PaatthContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(PaatthContainer);
