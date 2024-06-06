import { Link } from 'react-router-dom';
import Card from './Card';
import { useAuth } from '../hooks';

function MainCardsSprint2() {
  const { authenticated: isLoggedIn } = useAuth();
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg">
          <Card>
            <>
              <h2 className="text-2xl font-bold">Catalog</h2>
              <p className="mt-2 mb-4">Browse our Awesome Products</p>
              <Link
                to="./catalog"
                className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
              >
                Products
              </Link>
            </>
          </Card>
          <Card bg="bg-moonNeutral-300">
            <>
              <h2 className="text-2xl font-bold">Profile Page</h2>
              <p className="mt-2 mb-4">Find out more about yourself</p>
              <Link
                to="./profile"
                className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
              >
                My Profile
              </Link>
            </>
          </Card>
          <Card bg="bg-moonNeutral-400">
            <>
              <h2 className="text-2xl font-bold">Registration</h2>
              <p className="mt-2 mb-4">Browse our SignUp form</p>
              <Link
                to="./signup"
                className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
              >
                {isLoggedIn ? 'Logout First' : 'Browse Signup'}
              </Link>
            </>
          </Card>
          <Card bg="bg-moonNeutral-500">
            <>
              <h2 className="text-2xl font-bold">Login</h2>
              <p className="mt-2 mb-4">Try to SignIn</p>
              <Link
                to="./signin"
                className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
              >
                {isLoggedIn ? 'Logout First' : 'Signin Form'}
              </Link>
            </>
          </Card>
          <Card bg="bg-moonNeutral-600">
            <>
              <h2 className="text-2xl font-bold">404 Page</h2>
              <p className="mt-2 mb-4">Visit our Not Found page</p>
              <Link
                to="./404"
                className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
              >
                Go To Nowhere
              </Link>
            </>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default MainCardsSprint2;
