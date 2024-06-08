import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { IoIosLogIn, IoIosLogOut } from 'react-icons/io';
import { CgProfile, CgShoppingCart } from 'react-icons/cg';
import { useAuth } from '../hooks';
import { toast } from 'react-toastify';

function Links() {
  const { authenticated: isLoggedIn, setAuthenticated: setIsLoggedIn } =
    useAuth();
  const count = 9;

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <Link to="/" className="hover:text-moonNeutral-600">
        Home
      </Link>
      <Link to="./catalog" className="hover:text-gray-500">
        Catalog
      </Link>
      <Link to="./about" className="hover:text-moonNeutral-600">
        About
      </Link>
      <Link to="./contact" className="hover:text-moonNeutral-600">
        Contact
      </Link>
      <Link to="./cart" title="Shopping Cart" className="relative mx-2">
        <CgShoppingCart className="text-2xl hover:text-moonNeutral-600" />
        {count && (
          <span className="absolute -top-2 left-3 rounded-full bg-moonBrown p-0.5 px-2 text-sm text-moonNeutral-200">
            {count > 9 ? '∞' : count}
          </span>
        )}
      </Link>
      {!isLoggedIn && (
        <Link to="./signup" title="Registration">
          {' '}
          <HiOutlineUserAdd className="text-2xl hover:text-moonNeutral-600" />{' '}
        </Link>
      )}
      {!isLoggedIn && (
        <Link to="./signin" title="Login">
          {' '}
          <IoIosLogIn className="text-2xl hover:text-moonNeutral-600" />{' '}
        </Link>
      )}
      {isLoggedIn && (
        <Link to="./profile" title="My Profile">
          {' '}
          <CgProfile className="text-2xl hover:text-moonNeutral-600" />{' '}
        </Link>
      )}
      {isLoggedIn && (
        <Link
          to="./signin"
          title="Logout"
          onClick={() => {
            handleSignOut();
            toast.success('Success Logout!');
          }}
        >
          {' '}
          <IoIosLogOut className="text-2xl hover:text-moonNeutral-600" />{' '}
        </Link>
      )}
    </>
  );
}

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center h-10 px-10 font-bold uppercase italic text-white hover:opacity-90"
    >
      <img
        className="h-8 w-auto"
        src="/png/Random20Logo.png"
        alt="Random Twenty Logo"
      />
    </Link>
  );
}
function Header2() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="flex flex-row items-center justify-between sm:justify-around p-2 border-b-2 bg-moonNeutral-100 text-moonNeutral-800">
      <Logo />
      <nav className="text-lg hidden sm:flex justify-between items-center gap-4 font-semibold">
        <Links />
      </nav>
      <nav className="sm:hidden flex flex-col items-end gap-1 font-semibold">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="sm:hidden font-bold text-xl hover:text-gray-500"
        >
          {showMenu ? <GrClose /> : <GiHamburgerMenu />}
        </button>
        {showMenu && <Links />}
      </nav>
    </header>
  );
}

export default Header2;
