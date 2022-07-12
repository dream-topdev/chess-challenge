import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { IconButton, Stack } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import usePlayerStore from '../store/usePlayerStore';

export default function ActionButtons() {
  const {
    isUndoable,
    isRedoable,
    moveForward,
    moveBackward,
  } = usePlayerStore(state => state);
  
  return (
    <Stack
      direction={{ xs: 'row', sm: 'column' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
    >
      <IconButton
        disabled={!isUndoable()}
        color="primary"
        component="span"
        onClick={() => moveBackward()}
      >
        <UndoIcon />
      </IconButton>
      <IconButton
        disabled={!isRedoable()}
        color="primary"
        component="span"
        onClick={() => moveForward()}
      >
        <RedoIcon />
      </IconButton>
    </Stack>
  );
}
