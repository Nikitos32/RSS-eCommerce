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
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from 'react-loader-spinner';
import './App.css';
import { CatalogPage } from './components/CatalogPage/CatalogPage';
import ProfileChangePassword from './pages/ProfileChangePassword';
import Profile from './pages/Profile';
import { ProductPage } from './components/ProductPage/ProductPage';
import { AuthProvider } from './context/AuthProvider';
import RequireAuth from './components/RequireAuth';
import NotRequireAuth from './components/NotRequireAuth';

export const IsLoadindContext = createContext([
  (loading: boolean) => {
    console.log(loading);
  },
]);

function App() {
  const [isLoading] = useState<boolean>(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        {/* public routes */}
        <Route index element={<MainPage />} />
        <Route path="/product/:key" element={<ProductPage />} />
        <Route path="/catalog" element={<CatalogPage />} />

        {/*Only Not Authorized */}
        <Route element={<NotRequireAuth />}>
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        {/* Only Authorized */}
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/profile/changepwd"
            element={<ProfileChangePassword />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
