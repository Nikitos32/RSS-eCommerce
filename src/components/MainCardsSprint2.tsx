import { Link } from 'react-router-dom';
import Card from './Card';
import { IsLoginedContext } from '../App';
import { useContext } from 'react';

function LogoutFirst() {
  return (
    <p className="mt-2 mb-4 text-2xl">
      Logout First
    </p>
  );
}

function MainCardsSprint2() {
  const [isLogined] = useContext(
    IsLoginedContext
  );
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg">
          <Card>
            <>
              <h2 className="text-2xl font-bold">
                Registration
              </h2>
              <p className="mt-2 mb-4">
                Browse our SignUp form
              </p>
              {isLogined ? (
                <LogoutFirst />
              ) : (
                <Link
                  to="/signup"
                  className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
                >
                  Browse Signup
                </Link>
              )}
            </>
          </Card>
          <Card bg="bg-moonNeutral-400">
            <>
              <h2 className="text-2xl font-bold">
                Login
              </h2>
              <p className="mt-2 mb-4">
                Try to SignIn
              </p>
              {isLogined ? (
                <LogoutFirst />
              ) : (
                <Link
                  to="/signin"
                  className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
                >
                  Signin Forms
                </Link>
              )}
            </>
          </Card>
          <Card bg="bg-moonNeutral-500">
            <>
              <h2 className="text-2xl font-bold">
                404 Page
              </h2>
              <p className="mt-2 mb-4">
                Visit our Not Found page
              </p>
              <Link
                to="/404"
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
