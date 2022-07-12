import * as React from 'react';
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
