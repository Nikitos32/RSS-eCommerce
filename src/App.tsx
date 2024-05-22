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
import { createContext, useState } from 'react';

import { ToastContainer } from 'react-toastify';
import { NotifyType } from './type/enums/NotifyTypes';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import './App.css';

export const IsLoginedContext = createContext([
  false,
  (logined: boolean) => {
    console.log(logined);
  },
]);

export const IsLoadindContext = createContext([
  (loading: boolean) => {
    console.log(loading);
  },
]);

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isLogined, setIsLogined] = useState<boolean>(false);

  const handleIsLogined = (logined: boolean) => {
    setIsLogined(logined);
  };

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/RSS-eCommerce"
        element={
          <IsLoginedContext.Provider value={[isLogined, handleIsLogined]}>
            <IsLoadindContext.Provider value={[handleLoading]}>
              <MainLayout />
            </IsLoadindContext.Provider>
          </IsLoginedContext.Provider>
        }
      >
        <Route index element={<MainPage />} />
        <Route path="/RSS-eCommerce/signin" element={<LoginPage />} />
        <Route path="/RSS-eCommerce/signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
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
      <div className="loader-container">
        <Oval
          visible={isLoading}
          height="40"
          width="40"
          color="black"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
}

export default App;

export const createNotify = (message?: string, type?: NotifyType) => {
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

export const notifyError = (message: string) => {
  createNotify(message, NotifyType.ERROR);
};

export const notifySuccess = (message: string) => {
  createNotify(message, NotifyType.SUCCESS);
};
