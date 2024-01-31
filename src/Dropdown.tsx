import React, { useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';

interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (selectedOption: string) => void;

}

const Dropdown: React.FC<DropdownProps> = ({ label,options,onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string>(''); // Initially, no option is selected

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <FormControl fullWidth sx={{marginTop:'8px',marginBottom:'8px'}}>
      <InputLabel id="dropdown-label">{label}</InputLabel>
      <Select
        labelId="dropdown-label"
        id="dropdown"
        value={selectedOption}
        onChange={handleSelectChange}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
