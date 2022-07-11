import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Game from './Game';
import { Stack } from '@mui/material';
import Timer from './components/Timer';
import ActionButtons from './components/ActionButtons';
import Modal from '@mui/material/Modal';
import SplashContainer from './components/SplashContainer';
import usePlayerStore from './store/usePlayerStore';

export default function App() {  
  const [chessboardSize, setChessboardSize] = useState(undefined);
  const [splashModal, setSplashModal] = useState(true);
  const {
    startGame,
  } = usePlayerStore(state => state);
  
  useEffect(() => {
    function handleResize() {
      if (!document.getElementsByClassName('container').length) return;
      const display = document.getElementsByClassName('container')[0];
      setChessboardSize(display.offsetWidth - 20);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Grid container spacing={2}>
      <Modal
        open={splashModal}
        onClose={() => {}}
      >
        <SplashContainer onGameStart={() => {
          setSplashModal(false);
          startGame();
        }}/>
      </Modal>
      <Grid className="container" item xs={8}>
        <Game boardWidth={chessboardSize}/>
      </Grid>
      <Grid item xs={2}>
        <Stack>
          <Timer/>
          <ActionButtons/>
        </Stack>
      </Grid>
    </Grid>
  );
}
