import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import AddPage from './pages/add/AddPage';
import EditPage from './pages/edit/EditPage';
import LoginPage from './pages/login/LoginPage';
import NotFoundPage from './pages/not-found/NotFoundPage';
import ProtectedRoutes from './utils/ProtectedRoutes';

function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/edit" element={<EditPage />} />
      </Route>
    </Routes>
  );
}

export default App;
