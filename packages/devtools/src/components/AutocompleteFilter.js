//
// Copyright 2019 Wireline, Inc.
//

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(() => ({
  input: {
    display: 'flex',
    flex: 1
  }
}));

const AutocompleteFilter = ({ label, types = [], onChange, value = null }) => {
  const classes = useStyles();
  return (
    <Autocomplete
      className={classes.input}
      size="small"
      freeSolo
      autoComplete
      clearOnEscape
      value={value} // make default to null, see https://github.com/mui-org/material-ui/issues/18173#issuecomment-552420187
      onChange={(e, newValue) => {
        if (newValue && newValue.inputValue) {
          onChange(newValue.inputValue);
        } else {
          onChange(newValue);
        }
      }}
      options={types}
      renderInput={params => (
        <TextField {...params} label={label} variant="outlined" fullWidth />
      )}
    />
  );
};

export default AutocompleteFilter;
