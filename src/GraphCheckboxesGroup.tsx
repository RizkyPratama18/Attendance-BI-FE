import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import { useEffect } from 'react';

interface GraphCheckboxesGroupProps{
  setSelectedGraph:React.Dispatch<React.SetStateAction<string[]>>

}

export const GraphCheckboxesGroup: React.FC<GraphCheckboxesGroupProps> = ({setSelectedGraph}) => {
  const [state, setState] = React.useState({
    CPU: true,
    AVA: false,
    STR: false,
    IO : false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });

    }

    useEffect(() => {
      const temp:string[] = []
      Object.entries(state).forEach(([key, value]) => {
        if (value) {
          temp.push(key);
        }
      }); 
      setSelectedGraph(temp);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);
    
  const { CPU, AVA, STR,IO } = state;
  const error = [CPU, AVA, STR,IO].filter((v) => v).length !== 1;

  return (
    <>  
    <Typography fontWeight='bold' align='left' sx={{marginTop:'16px'}} component="legend">Graph to extract</Typography>
    <Box sx={{ display: 'flex' }}>
      <FormControl component="fieldset" variant="standard">
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={CPU} onChange={handleChange} name="CPU" />}
            label="CPU" />
          <FormControlLabel
            control={<Checkbox checked={AVA} onChange={handleChange} name="AVA" />}
            label="Avalability" />
          <FormControlLabel
            control={<Checkbox checked={STR} onChange={handleChange} name="STR" />}
            label="Storage" />
        </FormGroup>
      </FormControl>
      <FormControl
        required
        error={error}
        component="fieldset"
        variant="standard"
      >
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={IO} onChange={handleChange} name="IO" />}
            label="Input Output" />
        </FormGroup>
      </FormControl>
    </Box></>
  );
}