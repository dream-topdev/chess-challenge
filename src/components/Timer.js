import { useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Stack } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CountDown from './CountDown';
import usePlayerStore from '../store/usePlayerStore';
import { formatInterval } from '../utils/utils';

export default function Timer() {
  const {
    timeTicks1,
    timeTicks2,
    currentPlayer,
    isPlaying,
    decreaseTimeticks
  } = usePlayerStore(state => state);
  
  useEffect(() => {
    const interval = setInterval(() => {
      decreaseTimeticks();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Box sx={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
        <CountDown isActive={currentPlayer == 0}/>
        <Typography variant="body2" color="text.primary" align="center">
          {formatInterval(timeTicks1)}
        </Typography>
      </Box>
      <Box sx={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
        <CountDown isActive={currentPlayer == 1}/>
        <Typography variant="body2" color="text.primary" align="center">
          {formatInterval(timeTicks2)}
        </Typography>
      </Box>
    </Container>
  );
}
