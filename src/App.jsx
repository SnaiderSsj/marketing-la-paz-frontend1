import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Campañas from './pages/Campañas';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campañas" element={<Campañas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;