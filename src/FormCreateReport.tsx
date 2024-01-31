import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';

import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {DateRangeForm} from './DateRangeForm';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import {TableCheckboxesGroup} from './TableCheckboxesGroup';
import {GraphCheckboxesGroup} from './GraphCheckboxesGroup';
import { Alert, Grid } from '@mui/material';
import DropdownSelectWithCheckboxes from './DropdownSelectWithCheckboxes';
import { useState } from 'react';
import DropdownSelectWithCheckboxesProject from './DropdownSelectWithCheckboxesProject';
import PdfDialog from './PdfViewerDialog';
import { LoadingCircular } from './LodingCircular';

export interface Node {
  instance: string;
  node_name: string;
}

export interface NodeFieldData{
  table_field: string[];
  graph_field: string[];
  nodes: Node[];
}

export interface OrganisationFieldData{
  region : string;
  domain : string;
  projects : string[];
  table_field: string[];
  graph_field: string[];
}

interface FormData {
  start_date: string;
  end_date: string;
  node_field: NodeFieldData;
  org_field: OrganisationFieldData;
}

interface FormDataJob {
  report_type: string;
  email_list: string[];
  node_field: NodeFieldData;
  org_field: OrganisationFieldData;
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://lintasarta.net/">
        Lintasarta
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function FormCreateReport() {
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);

  const [selectedTable, setSelectedTable] = useState<string[]>([]);
  const [selectedGraph, setSelectedGraph] = useState<string[]>([]);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null >(null);

  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<string>('');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [reportId, setReportID] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedListEmail, setSelectedListEmail] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('daily');
  const [error, setError] = useState<string | undefined>(undefined);

  const token = localStorage.getItem('token')
  const handleSubmitJob = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nodeData : NodeFieldData = {
      nodes:selectedNodes,
      table_field:selectedTable,
      graph_field:selectedGraph,
      
    }
    const organisationData : OrganisationFieldData = {
      table_field:selectedTable,
      graph_field:selectedGraph,
      region:selectedRegion,
      domain:selectedDomain,
      projects:selectedProjects,
      
    }
    const data : FormDataJob = {
      node_field : nodeData,
      org_field : organisationData,
      email_list:selectedListEmail,
      report_type:selectedType,
    }

    try {
      // Make a network request to your server
      const response = await fetch('http://0.0.0.0:8080/job/createJob', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,

        },
        // Include any necessary data in the body of the request
        body: JSON.stringify({data}),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }

    window.location.reload();

  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedStartDate || !selectedEndDate ){
      setError("Need to add Start Date and End Date")
    }
    if (selectedStartDate && selectedEndDate){
      setIsLoading(true);

      console.log(selectedStartDate)
      console.log(selectedEndDate)
      var start_date = '';
      var end_date = '';
      if (selectedStartDate){
        const tempStartDate = new Date(selectedStartDate)
        tempStartDate.setHours(tempStartDate.getHours() + 7);
  
        start_date = tempStartDate.toISOString()
      }
      if (selectedEndDate){
        const tempEndDate = new Date(selectedEndDate)
        tempEndDate.setHours(tempEndDate.getHours() + 7);
  
        end_date = tempEndDate.toISOString()    
      }
      
      const nodeData : NodeFieldData = {
        nodes:selectedNodes,
        table_field:selectedTable,
        graph_field:selectedGraph,
        
      }
      const organisationData : OrganisationFieldData = {
        table_field:selectedTable,
        graph_field:selectedGraph,
        region:selectedRegion,
        domain:selectedDomain,
        projects:selectedProjects,
        
      }
  
      const data : FormData = {
        start_date: start_date,
        end_date: end_date,
        node_field : nodeData,
        org_field : organisationData,
      }
      try {
        // Make a network request to your server
        const response = await fetch('http://0.0.0.0:8080/export/createReport', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
  
          },
          // Include any necessary data in the body of the request
          body: JSON.stringify({data}),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const temp_id =  await response.json();
        setReportID(temp_id)
  
      } catch (error) {
        console.error('Error downloading file:', error);
      }
      setIsLoading(false);
      setOpenDialog(true);
    }
   
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <><Container
      maxWidth="xl" // Adjust the maxWidth based on your design
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Grid container spacing={2}>

        <Grid item maxWidth='xs'>

          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 16,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <ReceiptLongIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create Report
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <DropdownSelectWithCheckboxesProject labelId={'organisation_field'} setSelectedRegion={setSelectedRegion} setSelectedDomain={setSelectedDomain} setSelectdeProjects={setSelectedProjects} selectedDomain={selectedDomain} selectedProjects={selectedProjects} />
                <DropdownSelectWithCheckboxes labelId={'node_field'} setSelected={setSelectedNodes} />
                <DateRangeForm selectedStartDate={selectedStartDate} setSelectedStartDate={setSelectedStartDate} selectedEndDate={selectedEndDate} setSelectedEndDate={setSelectedEndDate} />
                <TableCheckboxesGroup setSelectedTable={setSelectedTable} />
                <GraphCheckboxesGroup setSelectedGraph={setSelectedGraph} />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ marginTop: '16px' }}
                >
                  Create
                </Button>
                { error ?
                <Alert severity="error" onClose={() => {setError(undefined)}}>{error}</Alert> 
                :undefined
                }
                <PdfDialog 
                open={openDialog} 
                onClose={handleCloseDialog} 
                reportId={reportId} 
                setSelectedListEmail={setSelectedListEmail} 
                setSelectedType={setSelectedType}
                handleSubmitJob={handleSubmitJob}
                selectedType={selectedType}/>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </Grid>

        <Grid item sm={8}>
          <Box
            sx={{
              marginTop: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          </Box>
        </Grid>
      </Grid>
    </Container>
    <LoadingCircular open={isLoading} /></>
  );
}