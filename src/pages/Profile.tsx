import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import UserInputString from '../components/UserInputString';
import { useEffect, useState } from 'react';
import {
  AddressForProfile,
  UserInput,
  makeAddressesForProfile,
} from '../utils';
import { BsInfoCircle } from 'react-icons/bs';
import { PiPasswordBold } from 'react-icons/pi';
import { RiLockPasswordLine } from 'react-icons/ri';
import {
  CiCirclePlus,
  CiDeliveryTruck,
  CiEdit,
  CiFileOn,
  CiTrash,
} from 'react-icons/ci';
import { CiBookmarkCheck } from 'react-icons/ci';
import { useApiGetCustomer } from '../hooks';
import { Customer } from '@commercetools/platform-sdk';

type AddressProps = { address: AddressForProfile };
function Address({ address }: AddressProps) {
  console.log(address);
  return (
    <>
      <div className="flex flex-row justify-end gap-1 text-2xl">
        {address.isDefault && <CiBookmarkCheck title="Default" />}
        {address.isDefault && address.isShipping && (
          <CiDeliveryTruck title="Shipping Address" />
        )}
        {address.isDefault && address.isBilling && (
          <CiFileOn title="Shipping Address" />
        )}
        {!address.isDefault && address.isShipping && (
          <CiDeliveryTruck title="Shipping Address" />
        )}
        {!address.isDefault && address.isBilling && (
          <CiDeliveryTruck title="Shipping Address" />
        )}
      </div>
      <p>{address.strAddress}</p>
      <div className="flex flex-row gap-4 text-2xl">
        <a href="" title="Edit" className=" hover:text-moonNeutral-600">
          <CiEdit />
        </a>
        {!address.isDefault && (
          <a href="" title="Delete" className=" hover:text-moonNeutral-600">
            <CiTrash />
          </a>
        )}
      </div>
    </>
  );
}
function Profile() {
  const { loading: isLoading, ok, customer } = useApiGetCustomer();
  const isUpdateProfile = false;
  const isUpdateAddress = false;

  const [editProfile, setEditProfile] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [validFirstName, setValidFirstName] = useState(false);
  const [cluesVisibleFirstName, setCluesVisibleFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState('');
  const [validLastName, setValidLastName] = useState(false);
  const [cluesVisibleLastName, setCluesVisibleLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [dob, setDob] = useState('');
  const [validDob, setValidDob] = useState(false);
  const [cluesVisibleDob, setCluesVisibleDob] = useState(false);
  const [dobFocus, setDobFocus] = useState(false);

  const [addresses, setAddresses] = useState<AddressForProfile[]>();

  const nameClue = (
    <p dangerouslySetInnerHTML={{ __html: UserInput.getRequiredClue() }} />
  );
  const dateClue = (
    <p
      dangerouslySetInnerHTML={{ __html: UserInput.getBirthdayRequiredClue() }}
    />
  );
  useEffect(() => {
    setValidFirstName(!UserInput.checkInputEmpty(firstName) || !editProfile);
    setCluesVisibleFirstName(firstNameFocus && !validFirstName);
  }, [firstName, validFirstName, firstNameFocus, editProfile]);

  useEffect(() => {
    setValidLastName(!UserInput.checkInputEmpty(lastName) || !editProfile);
    setCluesVisibleLastName(lastNameFocus && !validLastName);
  }, [lastName, validLastName, lastNameFocus, editProfile]);

  useEffect(() => {
    setValidDob(UserInput.checkBirthdayRequiredValid(dob) || !editProfile);
    setCluesVisibleDob(dobFocus && !validDob);
  }, [dob, dobFocus, validDob, editProfile]);

  useEffect(() => {
    if (ok) {
      const { firstName, lastName, dateOfBirth } = customer as Customer;
      setFirstName(firstName as string);
      setLastName(lastName as string);
      setDob(dateOfBirth as string);
      setAddresses([...makeAddressesForProfile(customer as Customer)]);
    }
  }, [ok, customer]);

  const handleClickEditProfile = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setEditProfile(!editProfile);
  };

  return (
    <>
      <section
        className={`${isLoading ? 'animate-pulse ' : ''}flex flex-col items-center px-6 py-8 mx-auto lg:py-0 gap-2`}
      >
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-3">
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-moonBlack md:text-2xl dark:text-moonNeutral-100">
                My Profile
              </h2>
              <a
                href=""
                onClick={handleClickEditProfile}
                title="Click to Edit"
                className="text-2xl hover:text-moonNeutral-600"
              >
                <CiEdit />
              </a>
            </div>
            <Link
              to="./changepwd"
              title="Change Password"
              className="text-xl hover:text-moonNeutral-600"
            >
              <RiLockPasswordLine className="inline" />
              <PiPasswordBold className="inline" />
            </Link>
          </div>
          <form className="relative mt-4 space-y-4 lg:mt-5 md:space-y-5">
            <div className="mb-4">
              <UserInputString
                type="text"
                label="First Name"
                placeHolder="Name"
                autocomplete="off"
                value={firstName}
                setValueUseState={setFirstName}
                isValidValue={validFirstName}
                isCluesVisible={cluesVisibleFirstName}
                setFocusUseState={setFirstNameFocus}
                clues={nameClue}
              />
            </div>
            <div className="mb-4">
              <UserInputString
                type="text"
                label="Last Name"
                placeHolder="Surname"
                autocomplete="off"
                value={lastName}
                setValueUseState={setLastName}
                isValidValue={validLastName}
                isCluesVisible={cluesVisibleLastName}
                setFocusUseState={setLastNameFocus}
                clues={nameClue}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="birthday"
              >
                Date of Birth
              </label>
              <input
                readOnly={!editProfile}
                type="date"
                id="birthday"
                value={dob}
                max={UserInput.getMaxForDateOfBirth()}
                onChange={(e) => setDob(e.target.value)}
                onFocus={() => setDobFocus(true)}
                onBlur={() => setDobFocus(false)}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  validDob ? '' : ' border-red-500'
                }`}
                aria-invalid={validDob ? 'false' : 'true'}
                aria-describedby="hint-birthday"
              />
              <div
                id="hint-birthday"
                className={`mt-1 py-1 flex flex-row rounded-md bg-moonNeutral-200 md:max-w-2xl md:mx-auto justify-start items-center gap-2 text-sm ${
                  cluesVisibleDob ? ' ' : ' hidden'
                }`}
              >
                <BsInfoCircle className="ml-2 text-xl" />
                {dateClue}
              </div>
            </div>
            <div
              className={`flex items-center justify-between ${editProfile ? 'visible' : `hidden`}`}
            >
              <button
                className="bg-moonBlack text-moonNeutral-100 rounded-lg px-4 py-2 hover:bg-moonNeutral-600 focus:outline-none focus:shadow-outline disabled:bg-moonNeutral-500"
                type="submit"
                disabled={!validFirstName || !validLastName || !validDob}
              >
                Update
              </button>
              <button
                className="bg-moonNeutral-700 text-moonNeutral-100 rounded-lg px-4 py-2 hover:bg-moonNeutral-600 focus:outline-none focus:shadow-outline disabled:bg-moonNeutral-500"
                type="reset"
              >
                Cancel
              </button>
            </div>
            <Spinner isLoading={isUpdateProfile} />
          </form>
        </div>
        <div className="relative w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <div className="flex items-center justify-start gap-3">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-moonBlack md:text-2xl dark:text-moonNeutral-100">
              My Addresses
            </h2>
            <a
              href=""
              title="Add New Address"
              className="text-2xl hover:text-moonNeutral-600"
            >
              <CiCirclePlus />
            </a>
          </div>
          <div className="container m-auto grid grid-cols-[min-content_1fr_min-content] gap-3 items-center">
            {addresses?.map((address) => (
              <Address key={address.id} address={address} />
            ))}
          </div>
          <Spinner isLoading={isUpdateAddress} />
        </div>
        <Spinner isLoading={isLoading} />
      </section>
    </>
  );
}

export default Profile;
