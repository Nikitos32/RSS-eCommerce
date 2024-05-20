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

import { ToastContainer } from 'react-toastify';
import { NotifyType } from './type/enums/NotifyTypes';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export const IsLoginedContext =
  createContext([
    false,
    (logined: boolean) => {
      console.log(logined);
    },
  ]);

function App() {
  const [isLogined, setIsLogined] =
    useState<boolean>(false);

  const handleIsLogined = (
    logined: boolean
  ) => {
    setIsLogined(logined);
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
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;

export const createNotify = (
  message?: string,
  type?: NotifyType
) => {
  switch (type) {
    case NotifyType.INFO: {
      toast.info(message);
      break;
    }
    case NotifyType.SUCCESS: {
      toast.success(message);
      break;
    }
    case NotifyType.WARNING: {
      toast.warning(message);
      break;
    }
    case NotifyType.ERROR: {
      toast.error(message);
      break;
    }
    default: {
      toast(message);
    }
  }
};

export const notifyError = (
  message: string
) => {
  createNotify(
    message,
    NotifyType.ERROR
  );
};

export const notifySuccess = (
  message: string
) => {
  createNotify(
    message,
    NotifyType.SUCCESS
  );
};
