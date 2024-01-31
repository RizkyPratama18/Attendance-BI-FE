import React, { useEffect, useState } from 'react';
import { TextField, Button, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface EmailComponentProps {
    setSelectedListEmail: React.Dispatch<React.SetStateAction<string[]>>
};


const MultipleEmailsComponent: React.FC<EmailComponentProps> = ({ setSelectedListEmail }) => {
  const [emailInput, setEmailInput] = useState('');
  const [emails, setEmails] = useState<string[]>([]);

  const handleAddEmail = () => {
    if (emailInput.trim() !== '' && isValidEmail(emailInput)) {
      setEmails((prevEmails) => [...prevEmails, emailInput.trim()]);
      setEmailInput('');
    }
  };

  const handleRemoveEmail = (index: number) => {
    setEmails((prevEmails) => prevEmails.filter((_, i) => i !== index));

  };

  const handleEmailInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value);

  };
  useEffect(() => {
    setSelectedListEmail(emails)

  }, [emails, setSelectedListEmail]);



  const isValidEmail = (email: string): boolean => {
    // You can implement a more sophisticated email validation if needed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
        <Typography fontWeight='bold' align='left' style={{marginTop:'16px'}}>Email to </Typography>

        <TextField
        style={{width:'400px'}}
        variant="outlined"
        fullWidth
        value={emailInput}
        onChange={handleEmailInputChange} 
        InputProps={{
            endAdornment: (
              <IconButton onClick={handleAddEmail}>
                <AddIcon/>
              </IconButton>
            ),
          }}
        />
        <div style={{ marginTop: '16px' }}>
            {emails.map((email, index) => (
                    <><span>{email}</span><Button onClick={() => handleRemoveEmail(index)} style={{ marginLeft: '8px' }}>
                    Remove
                </Button></>
            ))}
        </div>
        </>
  );
};

export default MultipleEmailsComponent;