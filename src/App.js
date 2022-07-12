import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Game from './components/Game';
import { Stack } from '@mui/material';
import Timer from './components/Timer';
import ActionButtons from './components/ActionButtons';
import Modal from '@mui/material/Modal';
import SplashContainer from './components/SplashContainer';
import usePlayerStore from './store/usePlayerStore';

export default function App() {  
  const {
    isPlaying,
    startGame,
  } = usePlayerStore(state => state);
  const [chessboardSize, setChessboardSize] = useState(undefined);
  const [splashModal, setSplashModal] = useState(!isPlaying);
  
  useEffect(() => {
    function handleResize() {
      if (!document.getElementsByClassName('container').length) return;
      const display = document.getElementsByTagName('body')[0];
      const dHeight = document.body.clientHeight;
      const paneWidth = Math.min(dHeight, display.offsetWidth > 600 ? display.offsetWidth - 150 : display.offsetWidth);
      setChessboardSize(paneWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isPlaying == false)
      setSplashModal(true);
  }, [isPlaying])

  return (
    <Box   
      className="container"  
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      <Modal
        open={splashModal}
        onClose={() => {}}
      >
        <SplashContainer onGameStart={() => {
          setSplashModal(false);
          startGame();
        }}/>
      </Modal>
      <Box 
        sx={{
          flex: 1,
        }}
      >
        <Game boardWidth={chessboardSize}/>
      </Box>
      <Box      
        sx={{
          width: {xs: '100%', sm: 150},
        }}
      >
        <Stack
          direction={{ xs: 'row', sm: 'column' }}
          spacing={{ xs: 1, sm: 2}}
          alignItems="center"
          justifyContent="center"
        >
          <Timer/>
          <ActionButtons/>
        </Stack>
      </Box>
    </Box>
  );
}
