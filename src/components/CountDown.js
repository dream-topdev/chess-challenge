import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HourglassAnim from './HourglassAnim';
import { formatInterval } from '../utils/utils';

export default function CountDown({ isActive, timeTicks}) {
  return (
    <Box sx={{flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 80}}>
      <HourglassAnim isActive={isActive}/>
      <Typography color="text.primary" align="center">
        {formatInterval(timeTicks)}
      </Typography>
    </Box>
  );
}