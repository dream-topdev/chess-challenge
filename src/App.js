import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Game from './Game';
import { Stack } from '@mui/material';
import Timer from './components/Timer';
import ActionButtons from './components/ActionButtons';

export default function App() {  
  const [chessboardSize, setChessboardSize] = useState(undefined);
  
  useEffect(() => {
    function handleResize() {
      const display = document.getElementsByClassName('container')[0];
      setChessboardSize(display.offsetWidth - 20);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Grid container spacing={2}>      
      <Grid className="container" item xs={8}>
        <Game boardWidth={chessboardSize}/>
      </Grid>
      <Grid item xs={4}>
        <Stack>
          <Timer/>
          <ActionButtons/>
        </Stack>
      </Grid>
    </Grid>
  );
}
