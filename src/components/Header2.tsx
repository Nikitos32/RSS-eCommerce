import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { HiOutlineUserAdd } from 'react-icons/hi';
import {
  IoIosLogIn,
  IoIosLogOut,
} from 'react-icons/io';

function Links() {
  return (
    <>
      <Link
        to="/"
        className="hover:text-gray-500"
      >
        Home
      </Link>
      <Link
        to="/about"
        className="hover:text-gray-500"
      >
        About
      </Link>
      <Link
        to="/contact"
        className="hover:text-gray-500"
      >
        Contact
      </Link>
      <Link
        to="/signup"
        title="Registration"
      >
        {' '}
        <HiOutlineUserAdd />{' '}
      </Link>
      <Link to="/signin" title="Login">
        {' '}
        <IoIosLogIn />{' '}
      </Link>
      <Link
        to="/signout"
        title="Logout"
      >
        {' '}
        <IoIosLogOut />{' '}
      </Link>
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
  const [showMenu, setShowMenu] =
    useState(false);

  return (
    <header className="flex flex-row items-center justify-between sm:justify-around p-2 border-b-2 bg-moonNeutral-100 text-moonNeutral-800">
      <Logo />
      <nav className="hidden sm:flex justify-between items-center gap-4 font-semibold">
        <Links />
      </nav>
      <nav className="sm:hidden flex flex-col items-end gap-1 font-semibold">
        <button
          onClick={() =>
            setShowMenu(!showMenu)
          }
          className="sm:hidden font-bold text-xl hover:text-gray-500"
        >
          {showMenu ? (
            <GrClose />
          ) : (
            <GiHamburgerMenu />
          )}
        </button>
        {showMenu && <Links />}
      </nav>
    </header>
  );
}

export default Header2;
