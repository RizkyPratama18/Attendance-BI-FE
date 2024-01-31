import React, { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel, Typography } from '@mui/material';
import { Node } from './FormCreateReport';


interface DropdownSelectWithCheckboxesProps{
  labelId:string;
  setSelected:React.Dispatch<React.SetStateAction<Node[]>>
}

const DropdownSelectWithCheckboxes: React.FC<DropdownSelectWithCheckboxesProps> = ({labelId,setSelected}) => {
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [datas, setData] = useState<Node[]>([]);
  const token = localStorage.getItem('token')

  const handleNodeChange = (event: SelectChangeEvent<string[]>) => {
    const selectedEvent = event.target.value as string[]
    setSelectedNodes(selectedEvent);
    const temp: Node[] = [];
    datas.forEach((data) => {
      if (selectedEvent.includes(data.instance)) {
        temp.push(data);
      }
    });
    setSelected(temp)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch ('http://103.147.159.225:443/export/getNode', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          // Additional options like body, credentials, etc. can be added here
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
      }
    };

    fetchData();
  }, [token]);

  return (
    <>  
      <Typography fontWeight='bold' align='left' style={{marginTop:'8px',marginBottom:'8px'}}>Select Nodes</Typography>
      <FormControl fullWidth style={{maxWidth: '400px'}}>
      <InputLabel id="dropdown-label">{'Instance'}</InputLabel>

        <Select
          labelId={labelId}
          id={labelId}
          multiple
          value={selectedNodes}
          onChange={handleNodeChange}
          label={'Instance'}
          renderValue={(selected) => (selected as String[]).map((instance) => datas.find((data) => data.instance === instance)?.node_name).join(', ')}
        >
          {datas.map((data) => (
            <MenuItem key={data.instance} value={data.instance}>
              <Checkbox checked={selectedNodes.includes(data.instance)} />  
              {data.node_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default DropdownSelectWithCheckboxes;