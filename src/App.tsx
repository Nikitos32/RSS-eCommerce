import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import { LoginPage } from './components/LoginPage/LoginPage';
import { SignUpPage } from './components/SignUpPage/SignUpPage';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/MainLayout';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<MainLayout />}
      >
        <Route
          index
          element={<MainPage />}
        />
        <Route
          path="/signin"
          element={<LoginPage />}
        />
        <Route
          path="/signup"
          element={<SignUpPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    )
  );
  return (
    <RouterProvider router={router} />
  );
}

export default App;
