import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Roles from './components/role';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/role" element={<Roles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
