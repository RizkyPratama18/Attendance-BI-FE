import React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';


interface DropdownTypeJobProps{
  selectedType:string;
  setSelectedType:React.Dispatch<React.SetStateAction<string>>
}

export const DropdownTypeJob: React.FC<DropdownTypeJobProps> = ({selectedType,setSelectedType}) => {

  const handleNodeChange = (event: SelectChangeEvent<string>) => {
    setSelectedType(event.target.value as string);

  };

  return (
    <>  
      <FormControl fullWidth style={{maxWidth: '400px', marginTop:"16px"}}>
      <Select
          labelId="select-type"
          id="select"
          value={selectedType}
          onChange={handleNodeChange}
        >
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

