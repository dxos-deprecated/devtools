//
// Copyright 2020 DXOS.org
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

const AutocompleteFilter = ({ label, onChange, value = null, options = [] }) => {
  const classes = useStyles();

  return (
    <Autocomplete
      className={classes.input}
      size='small'
      freeSolo
      autoComplete
      clearOnEscape
      value={value} // Make default to null, see https://github.com/mui-org/material-ui/issues/18173#issuecomment-552420187
      options={options}
      getOptionLabel={option => option.title}
      onChange={(ev, newValue) => {
        if (newValue && newValue.inputValue) {
          onChange(newValue.inputValue);
        } else {
          onChange(newValue);
        }
      }}
      renderInput={params => (
        <TextField {...params} label={label} variant='outlined' fullWidth />
      )}
    />
  );
};

export default AutocompleteFilter;
