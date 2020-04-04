import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
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

function SelectTime() {
    const classes = useStyles();
    const [time, setTime] = React.useState('');

    const handleChange = (event) => {
        setTime(event.target.value);
    };

    return (
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Select a 1 hr interval to schedule this class.</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={time}
              onChange={handleChange}
            >
              <MenuItem value={"8:00"}>8 AM</MenuItem>
              <MenuItem value={"9:00"}>9 AM</MenuItem>
              <MenuItem value={"10:00"}>10 AM</MenuItem>
              <MenuItem value={"11:00"}>11 AM</MenuItem>
              <MenuItem value={"12:00"}>12 PM</MenuItem>   
              <MenuItem value={"13:00"}>1 PM</MenuItem>            
              <MenuItem value={"14:00"}>2 PM</MenuItem>            
              <MenuItem value={"15:00"}>3 PM</MenuItem>            
            </Select>
          </FormControl> 
        </div>
      );

}

export default SelectTime;