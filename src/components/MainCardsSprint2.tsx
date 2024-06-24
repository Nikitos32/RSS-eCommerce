import { Link } from 'react-router-dom';
import Card from './Card';
import { useAuth } from '../hooks';
import { toast } from 'react-toastify';

function MainCardsSprint2() {
  const { authenticated: isLoggedIn } = useAuth();
  const promo = 'Sprint_4';
  const promo2 = 'DUSHNILA';
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg">
          <Card>
            <>
              <h2 className="text-2xl font-bold">Promo Code</h2>
              <div className="bg-gradient-to-br from-moonPeach to-moonGreen text-moonBlack text-center rounded-lg shadow-md relative">
                <div className="flex space-x-2 mb-2 px-1 py-1 flex-wrap justify-center items-center">
                  <span className=" mx-1 border-dashed border border-moonBlack text-moonBlack px-4 py-2 rounded-l">
                    {promo}
                  </span>
                  <p className="">17% flat off on all items in cart</p>
                </div>
              </div>
              <span
                onClick={() => {
                  navigator.clipboard.writeText(promo);
                  toast.success('Code copied to Clipboard');
                }}
                className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700 cursor-pointer"
              >
                Copy Code
              </span>
            </>
          </Card>
          <Card>
            <>
              <h2 className="text-2xl font-bold">Promo Code</h2>
              <div className="bg-gradient-to-br from-moonPeach to-moonGreen text-moonBlack text-center rounded-lg shadow-md relative">
                <div className="flex space-x-2 mb-2 px-1 py-1 flex-wrap justify-center items-center">
                  <span className=" mx-1 border-dashed border border-moonBlack text-moonBlack px-4 py-2 rounded-l">
                    {promo2}
                  </span>
                  <p className="">Save 100EUR on Total 2000EUR or more</p>
                </div>
              </div>
              <span
                onClick={() => {
                  navigator.clipboard.writeText(promo2);
                  toast.success('Code copied to Clipboard');
                }}
                className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700 cursor-pointer"
              >
                Copy Code
              </span>
            </>
          </Card>
          <Card bg="bg-moonNeutral-300">
            <>
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              <p className="mt-2 mb-4">Make the final purchase decision</p>
              <Link
                to="./cart"
                className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
              >
                To Checkout
              </Link>
            </>
          </Card>
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
