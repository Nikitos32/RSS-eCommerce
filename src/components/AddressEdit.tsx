import { FormEventHandler, useState } from 'react';
import UserInputString from './UserInputString';
import { BaseAddress } from '@commercetools/platform-sdk';

const inputStringInitState = {
  value: '',
  valid: true,
  visibleClue: false,
  focus: false,
  readonly: false,
};

export interface AddressEditData extends BaseAddress {
  isShipping: boolean;
  isShippingDefault: boolean;
  isBilling: boolean;
  isBillingDefault: boolean;
}

type AddressEditProps = {
  data: AddressEditData;
  onReset: FormEventHandler<HTMLFormElement>;
};

function AddressEdit(props: AddressEditProps) {
  const validCountry = true;
  const [firstName, setFirstName] = useState(inputStringInitState);

  const [lastName, setLastName] = useState(inputStringInitState);
  return (
    <form
      onReset={props.onReset}
      className="flex items-center justify-start gap-3"
    >
      <div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-moonNeutral-800 hover:peer-checked:bg-moonNeutral-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-600 ">
            Shipping
          </span>
        </label>
        <div className="flex items-center mb-5">
          <span className="mr-3 text-sm font-medium text-gray-600 ">
            Default
          </span>
          <label className="relative flex items-center  cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-moonNeutral-800 hover:peer-checked:bg-moonNeutral-600"></div>
          </label>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-moonNeutral-800 hover:peer-checked:bg-moonNeutral-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-600 ">
            Billing
          </span>
        </label>
        <div className="flex items-center mb-5">
          <span className="mr-3 text-sm font-medium text-gray-600 ">
            Default
          </span>
          <label className="relative flex items-center  cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-moonNeutral-800 hover:peer-checked:bg-moonNeutral-600"></div>
          </label>{' '}
          CiDeliveryTruck,
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-1">
        <div className="mb-1">
          <UserInputString
            type="text"
            label="Contact First Name"
            placeHolder="Name"
            autocomplete="off"
            state={firstName}
            setState={setFirstName}
          />
        </div>
        <div className="mb-1">
          <UserInputString
            type="text"
            label="Contact Last Name"
            placeHolder="Surname"
            autocomplete="off"
            state={lastName}
            setState={setLastName}
          />
        </div>
        <div className="mb-1">
          <UserInputString
            type="text"
            label="Apartment/Suite"
            placeHolder=""
            autocomplete="off"
            state={lastName}
            setState={setLastName}
          />
        </div>
        <div className="mb-1">
          <UserInputString
            type="text"
            label="Building"
            placeHolder=""
            autocomplete="off"
            state={lastName}
            setState={setLastName}
          />
        </div>
        <div className="mb-1">
          <UserInputString
            type="text"
            label="Street Name"
            placeHolder=""
            autocomplete="off"
            state={lastName}
            setState={setLastName}
          />
        </div>
        <div className="mb-1">
          <UserInputString
            type="text"
            label="City"
            placeHolder=""
            autocomplete="off"
            state={lastName}
            setState={setLastName}
          />
        </div>
        <div className="mb-1">
          <UserInputString
            type="text"
            label="Region"
            placeHolder=""
            autocomplete="off"
            state={lastName}
            setState={setLastName}
          />
        </div>
        <div className="mb-1">
          <UserInputString
            type="text"
            label="Postal Code"
            placeHolder=""
            autocomplete="off"
            state={lastName}
            setState={setLastName}
          />
        </div>
        <div className="block mb-1">
          <label
            htmlFor="countries"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Country
          </label>
          <select
            id="countries"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              validCountry ? '' : ' border-red-500'
            }`}
          >
            <option selected>Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="DE">Germany</option>
            <option value="GB">Great Britain</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button
          className="bg-moonBlack text-moonNeutral-100 rounded-lg px-4 py-2 hover:bg-moonNeutral-600 focus:outline-none focus:shadow-outline disabled:bg-moonNeutral-500"
          type="submit"
          disabled={!firstName.valid || !lastName.valid}
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
    </form>
  );
}

export default AddressEdit;
