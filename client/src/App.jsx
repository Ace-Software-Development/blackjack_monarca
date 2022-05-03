import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Roles from './components/role';

import 'bootstrap/dist/css/bootstrap.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
