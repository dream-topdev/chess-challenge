import { useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Stack } from '@mui/material';
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
    <Stack
      direction={{ xs: 'row', sm: 'column' }}
      spacing={{ xs: 1, sm: 2}}
    >
      <CountDown isActive={currentPlayer == 0} timeTicks={timeTicks1}/>
      <CountDown isActive={currentPlayer == 1} timeTicks={timeTicks2}/>
    </Stack>
  );
}
