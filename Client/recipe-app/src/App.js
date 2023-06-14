import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/auth';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';

function App() {
  return (
    <div className="app-main">
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Router>
        <Routes>
          <Route path="/authentication" element={<Auth />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
