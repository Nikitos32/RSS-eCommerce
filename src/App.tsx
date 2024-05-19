import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import './App.css';
import { LoginPage } from './components/LoginPage/LoginPage';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/MainLayout';
import { SignUpPage } from './components/SignUpPage/SignUpPage';
import {
  createContext,
  useState,
} from 'react';

export const IsLoginedContext =
  createContext([false, () => {}]);

function App() {
  const [isLogined, setIsLogined] =
    useState<boolean>(false);

  const handleIsLogined = () => {
    setIsLogined(!isLogined);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <IsLoginedContext.Provider
            value={[
              isLogined,
              handleIsLogined,
            ]}
          >
            <MainLayout />
          </IsLoginedContext.Provider>
        }
      >
        <Route
          index
          element={<MainPage />}
        />
        <Route
          path="/signin"
          element={
            <IsLoginedContext.Provider
              value={[
                isLogined,
                handleIsLogined,
              ]}
            >
              <LoginPage />
            </IsLoginedContext.Provider>
          }
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
