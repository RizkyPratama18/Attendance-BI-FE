import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { Container, IconButton, Paper } from '@mui/material';
import { useState } from 'react';


export interface Node {
  instance: string;
  node_name: string;
}

export interface NodeFieldData{
  table_field: string[];
  graph_field: string[];
  nodes: Node[];
}


export default function FormCreateReport() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
  
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://0.0.0.0:8080/attendance/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Assuming the server responds with the appropriate headers for a file download
      const blob = await response.blob();
      // Create a temporary URL for the Blob
      const url = URL.createObjectURL(blob);
      // Create a link element and trigger a download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Report.pdf'; // Set the desired filename
      document.body.appendChild(link);
      link.click();
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      // Continue with further actions after the download
      console.log('File downloaded successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <Container
      maxWidth="xl" // Adjust the maxWidth based on your design
      style={{
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      <Paper elevation={3} style={{ width:'600px', padding: '16px', margin: 'auto' }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="contained-button-file"
          type="file"
          onChange={handleFileChange}
        />

        <Typography variant="h5" style={{ textAlign: 'center' }}>
          Syncronize Upload
        </Typography>
        <label htmlFor="contained-button-file">
          <IconButton sx={{display: "flex", justifyContent: "center", alignItems: "center"}} color="primary" component="span">
            <CloudUploadIcon fontSize='large' />
          </IconButton>
        </label>
        {selectedFile && (
          <Typography variant="body2" style={{ textAlign: 'center', margin: '8px 0' }}>
            Selected File: {selectedFile.name}
          </Typography>
        )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!selectedFile}
        fullWidth
      >
        Upload
      </Button>
      </Paper>
    </Container>
    )  
}