import React from 'react';
import { Box, Button, Container, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import { Worker,Viewer } from '@react-pdf-viewer/core';
import CircularProgress from '@mui/material/CircularProgress';

import CloseIcon from '@mui/icons-material/Close';
import { pdfjs } from 'react-pdf';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import MultipleEmailsComponent from './MultipleEmail';
import { DropdownTypeJob } from './DropdownTypeJob';

interface PdfDialogProps {
  open: boolean;
  selectedType:string;
  onClose: () => void;
  reportId: string | null;
  setSelectedListEmail : React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedType : React.Dispatch<React.SetStateAction<string>>
  handleSubmitJob : (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const PdfDialog: React.FC<PdfDialogProps> = ({ open,selectedType, onClose, reportId,setSelectedListEmail,setSelectedType,handleSubmitJob }) => {
const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogTitle sx={{paddingLeft : '72px',paddingTop:'36px'}}>
        View Report
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
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
    <Grid item maxWidth='xs'>
      <Container component="main" maxWidth="xs">
          <Box  component="form" onSubmit={handleSubmitJob}sx={{ mt: 1 }}>
          <Typography component="h1" variant="h4" fontWeight={'bold'}>
                Create Scheduled Reporting
              </Typography>            
              <MultipleEmailsComponent setSelectedListEmail={setSelectedListEmail}/>
            <DropdownTypeJob setSelectedType={setSelectedType} selectedType={selectedType}/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ marginTop : '16px' }}
            >   
              Create
            </Button>
          </Box>
      </Container>
      </Grid>
      <Grid item sm={8}>

    <div>
      {reportId ? 
    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
        <Viewer fileUrl={`http://0.0.0.0:8080/export/getReportFile/${reportId}`} plugins={[defaultLayoutPluginInstance]}/>
      </Worker> : <CircularProgress/>}

    </div>
      </Grid>
    </Grid>
    </Container>

    </DialogContent>
    </Dialog>
  );
};

export default PdfDialog;