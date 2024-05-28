import { useContext, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { IoIosLogIn, IoIosLogOut } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { IsLoginedContext, notifySuccess } from '../App';

function Links() {
  const [isLogined, setIsLogined] = useContext(IsLoginedContext);

  const handleSignOut = () => {
    if (typeof setIsLogined !== 'boolean') {
      setIsLogined(false);
    }
  };

  return (
    <>
      <Link to="../RSS-eCommerce" className="hover:text-moonNeutral-600">
        Home
      </Link>
      <Link to="./about" className="hover:text-moonNeutral-600">
        About
      </Link>
      <Link to="./contact" className="hover:text-moonNeutral-600">
        Contact
      </Link>
      {!isLogined && (
        <Link to="./signup" title="Registration">
          {' '}
          <HiOutlineUserAdd className="text-2xl hover:text-moonNeutral-600" />{' '}
        </Link>
      )}
      {!isLogined && (
        <Link to="./signin" title="Login">
          {' '}
          <IoIosLogIn className="text-2xl hover:text-moonNeutral-600" />{' '}
        </Link>
      )}
      {isLogined && (
        <Link to="./profile" title="My Profile">
          {' '}
          <CgProfile className="text-2xl hover:text-moonNeutral-600" />{' '}
        </Link>
      )}
      {isLogined && (
        <Link
          to="./signin"
          title="Logout"
          onClick={() => {
            handleSignOut();
            notifySuccess('Success Logout!');
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
      to="../RSS-eCommerce"
      className="flex items-center h-10 px-10 font-bold uppercase italic text-white hover:opacity-90"
    >
      <img
        className="h-8 w-auto"
        src="../RSS-eCommerce/png/Random20Logo.png"
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
