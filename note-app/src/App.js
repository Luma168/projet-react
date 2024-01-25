import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigate to={"/notes"} />} />
        
        <Route path="/notes" element={<Home />}>
          <Route path=":currentNoteId" element={<Home />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

