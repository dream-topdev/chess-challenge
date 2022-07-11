import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { useLottie } from "lottie-react";
import chessLoadingAnimation from "../assets/chess-loading.json";

export default function SplashContainer({ onGameStart }) {  
  const options = {
    animationData: chessLoadingAnimation,
    loop: true,
    autoplay: true,
    rendererSettings: {
      width: 300,
      height: 300
    }
  };
  const { View } = useLottie(options);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <>{View}</>
      <Grid item xs={3}>
        <Button onClick={() => onGameStart()} variant="contained" size="medium">
          Ready? Go!
        </Button>
      </Grid>      
    </Grid> 
  );
}
