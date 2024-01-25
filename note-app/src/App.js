import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import './App.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useState } from 'react';

export default function App() {
  const [themeVal, setThemeVal] = useState(true)

  const theme = createTheme({
    palette:{
      mode: themeVal ? 'dark' : 'light'
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate to={"/notes"} />} />
          
          <Route path="/notes" element={<Home onChangeTheme={setThemeVal} />}>
            <Route path=":currentNoteId" element={<Home onChangeTheme={setThemeVal}  />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

