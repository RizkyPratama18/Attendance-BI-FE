import React, { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel, Typography } from '@mui/material';
import Dropdown from './Dropdown';

interface DropdownSelectWithCheckboxesProjectProps{
  labelId:string;
  selectedDomain:string;
  selectedProjects:string[];
  setSelectedRegion:React.Dispatch<React.SetStateAction<string>>
  setSelectedDomain:React.Dispatch<React.SetStateAction<string>>
  setSelectdeProjects:React.Dispatch<React.SetStateAction<string[]>>
}

const DropdownSelectWithCheckboxesProject: React.FC<DropdownSelectWithCheckboxesProjectProps> = ({labelId,selectedProjects,selectedDomain,setSelectedRegion,setSelectedDomain,setSelectdeProjects}) => {

  const [regionDatas, setRegionDatas] = useState<string[]>([]);
  const [domainDatas, setDomainDatas] = useState<string[]>([]);
  const [projectDatas, setProjectDatas] = useState<string[]>([]);

  const token = localStorage.getItem('token')

  const handleProjectChange = (event: SelectChangeEvent<string[]>) => {
    const selectedEvent = event.target.value as string[]
    const temp: string[] = [];
    projectDatas.forEach((data) => {
      if (selectedEvent.includes(data)) {
        temp.push(data);
      }
    });
    setSelectdeProjects(temp);
  };

  const handleSelectRegion = (selectedOption: string) => {
    setSelectedRegion(selectedOption);
  };
  const handleSelectDomain = (selectedOption: string) => {
    setSelectedDomain(selectedOption);
  };

  useEffect(() => {

    const fetchDataRegions = async () => {
      try {
        const response = await fetch ('http://103.147.159.225:443/export/getRegion', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setRegionDatas(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
      }
    };
    
    const fetchDataDomains = async () => {
      try {
        const response = await fetch ('http://103.147.159.225:443/export/getDomain', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setDomainDatas(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
      }
    };

    const fetchDataProject = async () => {
      try {
        const data  = {'domain' : selectedDomain}
        const response = await fetch ('http://103.147.159.225:443/export/getProject', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({data}),

        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setProjectDatas(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
      }
    };
    fetchDataRegions();
    fetchDataDomains();
    fetchDataProject();
  }, [selectedDomain, token]);

  return (
    <>  
      <Typography fontWeight='bold' align='left' style={{marginTop:'8px',marginBottom:'8px'}}>Select Organisations</Typography>
      <FormControl fullWidth style={{maxWidth: '400px'}}>
        <Dropdown options={regionDatas} onSelect={handleSelectRegion} label={"Region"}/>
        <Dropdown options={domainDatas} onSelect={handleSelectDomain} label={"Domain"}/>
        <FormControl fullWidth sx={{marginTop:'8px',marginBottom:'8px'}}>
        <InputLabel id="dropdown-label">{'Project'}</InputLabel>
        <Select
          labelId={"project-id"}
          id={"project-id"}
          label={"Project"}
          multiple
          value={selectedProjects}
          onChange={handleProjectChange}
          renderValue={(selected) => (selected as String[]).map((instance) => projectDatas.find((data) => data === instance))}
        >
          {projectDatas.map((data) => (
            <MenuItem key={data} value={data}>
              <Checkbox checked={selectedProjects.includes(data)} />  
              {data}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
      </FormControl>
    </>
  );
};

export default DropdownSelectWithCheckboxesProject;