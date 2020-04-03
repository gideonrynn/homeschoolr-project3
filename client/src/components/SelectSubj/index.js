import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SelectSubj() {
    const classes = useStyles();
    const [subject, setSubject] = React.useState('');

    const handleChange = (event) => {
        setSubject(event.target.value);
    };

    return (
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Which subject would you like to plan?</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={subject}
              onChange={handleChange}
            >
              <MenuItem value={"Math"}>Math</MenuItem>
              <MenuItem value={"Science"}>Science</MenuItem>
              <MenuItem value={"History"}>History</MenuItem>
              <MenuItem value={"Literature"}>Literature/Language Arts</MenuItem>
              <MenuItem value={"Arts"}>Fine Arts</MenuItem>            
            </Select>
          </FormControl>
          
        </div>
      );

}

export default SelectSubj;