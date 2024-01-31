import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker, renderTimeViewClock } from '@mui/x-date-pickers';


interface DateRangeFormProps{
  selectedStartDate:Date | null
  selectedEndDate:Date | null
  setSelectedStartDate:React.Dispatch<React.SetStateAction<any>>
  setSelectedEndDate:React.Dispatch<React.SetStateAction<any>>
}

export const DateRangeForm: React.FC<DateRangeFormProps> = ({selectedStartDate,selectedEndDate,setSelectedStartDate,setSelectedEndDate}) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker sx={{marginTop : '16px', width :'100%'}}
          label="Start Date Time" 
          value={selectedStartDate}
          onChange={(newDate) => setSelectedStartDate(newDate)}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          />
        <DateTimePicker sx={{marginTop : '16px', width :'100%'}}
          label="End Date Time"
          value={selectedEndDate}
          onChange={(newDate) => setSelectedEndDate(newDate)}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
        />
    </LocalizationProvider>
  );
}