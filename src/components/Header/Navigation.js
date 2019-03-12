import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBackRounded';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardRounded';

const styles = {
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  input: {
    textAlign: 'center',
    width: 50,
  },
};

const Navigation = ({ classes, currentAng: { ang } }) => (
  <div className={classes.root}>
    <IconButton>
      <ArrowBackIcon />
    </IconButton>
    <Input
      classes={{
        input: classes.input,
      }}
      id="standard-number"
      defaultValue={ang}
      // onChange={this.handleChange('age')}
      type="number"
    />
    <IconButton>
      <ArrowForwardIcon />
    </IconButton>
  </div>
);
Navigation.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  currentAng: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  currentAng: state.currentAng,
});

export default withStyles(styles)(connect(mapStateToProps)(Navigation));
