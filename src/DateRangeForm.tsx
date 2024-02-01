import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button } from '@mui/material';


interface DateRangeFormProps{
  selectedStartDate:Date | null
  selectedEndDate:Date | null
  setSelectedStartDate:React.Dispatch<React.SetStateAction<any>>
  setSelectedEndDate:React.Dispatch<React.SetStateAction<any>>
}

export const DateRangeForm: React.FC<DateRangeFormProps> = ({selectedStartDate,selectedEndDate,setSelectedStartDate,setSelectedEndDate}) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
<Button
  variant="contained"
  component="label"
>
  Upload File
  <input
    type="file"
    hidden
  />
</Button>
    </LocalizationProvider>
  );
}