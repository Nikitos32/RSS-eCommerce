import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { LoginPage } from './components/LoginPage/LoginPage';
import './App.css';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/MainLayout';
import './App.css';
import { SignUpPage } from './components/SignUpPage/SignUpPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CatalogPage } from './components/CatalogPage/CatalogPage';
import ProfileChangePassword from './pages/ProfileChangePassword';
import Profile from './pages/Profile';
import { ProductPage } from './components/ProductPage/ProductPage';
import { AuthProvider } from './context/AuthProvider';
import RequireAuth from './components/RequireAuth';
import NotRequireAuth from './components/NotRequireAuth';
import Cart from './pages/Cart';
import About from './pages/About';
import { ShoppingCartProvider } from './context/ShoppingCartProvider';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        {/* public routes */}
        <Route index element={<MainPage />} />
        <Route path="/product/:key" element={<ProductPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />

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
      <ShoppingCartProvider>
        <RouterProvider router={router} />
      </ShoppingCartProvider>
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
    </AuthProvider>
  );
}

export default App;
