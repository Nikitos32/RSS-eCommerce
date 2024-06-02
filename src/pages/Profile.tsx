import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import UserInputString from '../components/UserInputString';
import { FormEvent, useEffect, useRef, useState } from 'react';
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
import { useApiGetCustomer, useApiUpdateProfile } from '../hooks';
import { Customer } from '@commercetools/platform-sdk';
import { toast } from 'react-toastify';
import AddressEdit from '../components/AddressEdit';

type AddressProps = { address: AddressForProfile };
function Address({ address }: AddressProps) {
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
  const [customer, setCustomer] = useState<Customer>();

  const {
    loading: isLoading,
    ok: okLoad,
    customer: customerAfterLoad,
  } = useApiGetCustomer();

  const [showAddressForm] = useState(true);

  const isUpdateAddress = false;

  const [editProfile, setEditProfile] = useState(false);
  const {
    ok: okUpdate,
    loading: isUpdatingProfile,
    errorMsg: errorMsgUpdate,
    setProfileUpdates,
    customerAfterUpdate,
  } = useApiUpdateProfile();

  const inputStringInitState = {
    value: '',
    valid: false,
    visibleClue: false,
    focus: false,
    readonly: false,
  };

  const firstNameRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState(inputStringInitState);
  const [firstName, setFirstName] = useState(inputStringInitState);

  const [lastName, setLastName] = useState(inputStringInitState);

  const [dob, setDob] = useState('');
  const [validDob, setValidDob] = useState(false);
  const [cluesVisibleDob, setCluesVisibleDob] = useState(false);
  const [dobFocus, setDobFocus] = useState(false);

  const [addresses, setAddresses] = useState<AddressForProfile[]>();

  const emailClue = (
    <p dangerouslySetInnerHTML={{ __html: UserInput.getEmailClue() }} />
  );
  const nameClue = (
    <p dangerouslySetInnerHTML={{ __html: UserInput.getRequiredClue() }} />
  );
  const dateClue = (
    <p
      dangerouslySetInnerHTML={{ __html: UserInput.getBirthdayRequiredClue() }}
    />
  );
  const fillProfile = (customer: Customer | undefined) => {
    if (!customer) return;

    const { email, firstName, lastName, dateOfBirth } = customer;

    setEmail((prevState) => ({ ...prevState, value: email as string }));
    setFirstName((prevState) => ({
      ...prevState,
      value: firstName as string,
    }));
    setLastName((prevState) => ({
      ...prevState,
      value: lastName as string,
    }));
    setDob(dateOfBirth as string);
  };

  const prepareProfileUpdates = (customer: Customer | undefined) => {
    if (!customer) return;
    setProfileUpdates(() => ({
      id: customer.id,
      version: customer.version,
      email: customer.email !== email.value ? email.value : '',
      firstName: customer.firstName !== firstName.value ? firstName.value : '',
      lastName: customer.lastName !== lastName.value ? lastName.value : '',
      dateOfBirth: customer.dateOfBirth !== dob ? dob : '',
    }));
  };

  useEffect(() => {
    fillProfile(customer);
    setAddresses([...makeAddressesForProfile(customer as Customer)]);
  }, [customer]);

  useEffect(() => {
    if (okLoad) {
      setCustomer(customerAfterLoad);
    }
  }, [okLoad, customerAfterLoad]);

  useEffect(() => {
    if (okUpdate) {
      toast.success('Profile Updated');
      setCustomer(customerAfterUpdate);
      setEditProfile(false);
    }
    if (!okUpdate && errorMsgUpdate) {
      firstNameRef.current?.focus();
      toast.error(errorMsgUpdate);
    }
  }, [okUpdate, customerAfterUpdate, errorMsgUpdate]);

  useEffect(() => {
    const valid =
      UserInput.checkEmailRequiredValid(email.value) || !editProfile;
    setEmail((prevState) => ({
      ...prevState,
      valid,
      visibleClue: email.focus && !valid,
      readonly: !editProfile,
    }));
  }, [email.value, email.focus, editProfile]);
  useEffect(() => {
    const valid = !UserInput.checkInputEmpty(firstName.value) || !editProfile;
    setFirstName((prevState) => ({
      ...prevState,
      valid,
      visibleClue: firstName.focus && !valid,
      readonly: !editProfile,
    }));
  }, [firstName.value, firstName.focus, editProfile]);

  useEffect(() => {
    const valid = !UserInput.checkInputEmpty(lastName.value) || !editProfile;
    setLastName((prevState) => ({
      ...prevState,
      valid,
      visibleClue: lastName.focus && !valid,
      readonly: !editProfile,
    }));
  }, [lastName.value, lastName.focus, editProfile]);

  useEffect(() => {
    setValidDob(UserInput.checkBirthdayRequiredValid(dob) || !editProfile);
    setCluesVisibleDob(dobFocus && !validDob);
  }, [dob, dobFocus, validDob, editProfile]);

  useEffect(() => {
    if (editProfile) {
      firstNameRef.current?.focus();
    }
  }, [editProfile]);

  useEffect(() => {
    setEditProfile(false);
  }, [customerAfterUpdate]);
  const handleClickEditProfile = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setEditProfile(!editProfile);
  };

  const handleSubmitProfile = async (e: FormEvent) => {
    e.preventDefault();
    prepareProfileUpdates(customer);
  };

  const handleResetProfile = (e: FormEvent) => {
    e.preventDefault();
    fillProfile(customer);
    setEditProfile(false);
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
              {!editProfile && (
                <a
                  href=""
                  onClick={handleClickEditProfile}
                  title="Click to Edit"
                  className="text-2xl hover:text-moonNeutral-600"
                >
                  <CiEdit />
                </a>
              )}
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
          <form
            onSubmit={handleSubmitProfile}
            onReset={handleResetProfile}
            className="relative mt-4 space-y-4 lg:mt-5 md:space-y-5"
          >
            <div className="mb-4">
              <UserInputString
                type="text"
                label="Email"
                placeHolder="Email address"
                autocomplete="off"
                state={email}
                setState={setEmail}
                clues={emailClue}
              />
            </div>
            <div className="mb-4">
              <UserInputString
                type="text"
                label="First Name"
                placeHolder="Name"
                autocomplete="off"
                state={firstName}
                setState={setFirstName}
                clues={nameClue}
                elementUseRef={firstNameRef}
              />
            </div>
            <div className="mb-4">
              <UserInputString
                type="text"
                label="Last Name"
                placeHolder="Surname"
                autocomplete="off"
                state={lastName}
                setState={setLastName}
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
                disabled={!firstName.valid || !lastName.valid || !validDob}
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
            <Spinner isLoading={isUpdatingProfile} />
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
          {showAddressForm && <AddressEdit />}
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
