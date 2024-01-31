import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import {TableCheckboxesGroup} from './TableCheckboxesGroup';
import {GraphCheckboxesGroup} from './GraphCheckboxesGroup';
import TableJobHistory from './TableJobHistory';
import { Grid } from '@mui/material';
import DropdownSelectWithCheckboxes from './DropdownSelectWithCheckboxes';
import { useState } from 'react';
import { Node } from './FormCreateReport';
import { DropdownTypeJob } from './DropdownTypeJob';
import MultipleEmailsComponent from './MultipleEmail';


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

const defaultTheme = createTheme();

interface FormData {
  table_field: string[];
  graph_field: string[];
  node_field: Node[];
  report_type : string;
  email_list : string[];
}

export default function FormCreateJob() {
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);
  const [selectedTable, setSelectedTable] = useState<string[]>([]);
  const [selectedGraph, setSelectedGraph] = useState<string[]>([]);
  const [selectedListEmail, setSelectedListEmail] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('daily');
  const token = localStorage.getItem('token')



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data : FormData = {
      table_field: selectedTable,
      graph_field: selectedGraph,
      node_field: selectedNodes,
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

  return (
    <Container
    maxWidth="xl"
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}
  >
    <Grid container spacing={2}>

    <ThemeProvider theme={defaultTheme}>
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
            Create Job
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <DropdownSelectWithCheckboxes labelId={'node_field'} setSelected={setSelectedNodes} />
            <DropdownTypeJob setSelectedType={setSelectedType} selectedType={selectedType}/>
            <MultipleEmailsComponent setSelectedListEmail={setSelectedListEmail}/>

            <TableCheckboxesGroup setSelectedTable={setSelectedTable}/>
            <GraphCheckboxesGroup setSelectedGraph={setSelectedGraph}/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ marginTop : '16px' }}
            >   
              Create
            </Button>
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
            <TableJobHistory/>
        </Box>
      </Grid>
    </ThemeProvider>
    </Grid>
    </Container>
  );
}