import React from 'react';
import { Grid } from '@mui/material';
import TextDisplay from './TextDisplay';
import FileUpload from './FileUpload';
import ChatGPTInterface from './ChatGPTInterface';

function Layout() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextDisplay />
      </Grid>
      <Grid item xs={12} md={6}>
        <FileUpload />
        <ChatGPTInterface />
      </Grid>
    </Grid>
  );
}

export default Layout;
