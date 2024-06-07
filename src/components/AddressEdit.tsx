import { FormEvent, useEffect, useState } from 'react';
import UserInputString from './UserInputString';
import { BaseAddress } from '@commercetools/platform-sdk';
import { UserInput } from '../utils';
import { BsInfoCircle } from 'react-icons/bs';
import { CountryCode } from 'postcode-validator';

const inputStringInitState = {
  value: '',
  valid: true,
  visibleClue: false,
  focus: false,
  readonly: false,
};

export interface AddressEditData extends BaseAddress {
  addressId?: string;
  isShipping?: boolean;
  isShippingDefault?: boolean;
  isBilling?: boolean;
  isBillingDefault?: boolean;
}

type AddressEditProps = {
  startingData: AddressEditData;
  sendResetToParent: () => void;
  sendDataToParent: (data: AddressEditData) => void;
};

function AddressEdit(props: AddressEditProps) {
  const [add, setAdd] = useState(false);
  const [firstName, setFirstName] = useState(inputStringInitState);
  const [lastName, setLastName] = useState(inputStringInitState);
  const [apartment, setApartment] = useState(inputStringInitState);
  const [streetNumber, setStreetNumber] = useState(inputStringInitState);
  const [streetName, setStreetName] = useState(inputStringInitState);
  const [city, setCity] = useState(inputStringInitState);
  const [region, setRegion] = useState(inputStringInitState);
  const [postalCode, setPostalCode] = useState(inputStringInitState);
  const [country, setCountry] = useState(inputStringInitState);
  const [shipping, setShipping] = useState(false);
  const [shippingDefault, setShippingDefault] = useState(false);
  const [billing, setBilling] = useState(false);
  const [billingDefault, setBillingDefault] = useState(false);

  const clue = (
    <p dangerouslySetInnerHTML={{ __html: UserInput.getRequiredClue() }} />
  );
  const cluePostalCode = (
    <p
      dangerouslySetInnerHTML={{
        __html: UserInput.getPostcodeRequiredClue(country.value as CountryCode),
      }}
    />
  );

  useEffect(() => {
    if (!props.startingData) {
      return;
    }
    const {
      firstName = '',
      lastName = '',
      apartment = '',
      streetNumber = '',
      streetName = '',
      city = '',
      region = '',
      postalCode = '',
      country = '',
      isShipping = false,
      isShippingDefault = false,
      isBilling = false,
      isBillingDefault = false,
      addressId = '',
    } = props.startingData as AddressEditData;
    setFirstName((prevState) => ({
      ...prevState,
      value: firstName,
    }));
    setLastName((prevState) => ({
      ...prevState,
      value: lastName,
    }));
    setApartment((prevState) => ({
      ...prevState,
      value: apartment,
    }));
    setStreetNumber((prevState) => ({
      ...prevState,
      value: streetNumber,
    }));
    setStreetName((prevState) => ({
      ...prevState,
      value: streetName,
    }));
    setCity((prevState) => ({
      ...prevState,
      value: city,
    }));
    setRegion((prevState) => ({
      ...prevState,
      value: region,
    }));
    setPostalCode((prevState) => ({
      ...prevState,
      value: postalCode,
    }));
    setCountry((prevState) => ({
      ...prevState,
      value: country,
    }));
    setShipping(isShipping);
    setShippingDefault(isShippingDefault);
    setBilling(isBilling);
    setBillingDefault(isBillingDefault);
    setAdd(addressId === '');
  }, [props.startingData]);

  useEffect(() => {
    const valid = !UserInput.checkInputEmpty(firstName.value);
    setFirstName((prevState) => ({
      ...prevState,
      valid,
      visibleClue: firstName.focus && !valid,
    }));
  }, [firstName.value, firstName.focus]);

  useEffect(() => {
    const valid = !UserInput.checkInputEmpty(lastName.value);
    setLastName((prevState) => ({
      ...prevState,
      valid,
      visibleClue: lastName.focus && !valid,
    }));
  }, [lastName.value, lastName.focus]);

  useEffect(() => {
    const valid = !UserInput.checkInputEmpty(streetNumber.value);
    setStreetNumber((prevState) => ({
      ...prevState,
      valid,
      visibleClue: streetNumber.focus && !valid,
    }));
  }, [streetNumber.value, streetNumber.focus]);

  useEffect(() => {
    const valid = !UserInput.checkInputEmpty(streetName.value);
    setStreetName((prevState) => ({
      ...prevState,
      valid,
      visibleClue: streetName.focus && !valid,
    }));
  }, [streetName.value, streetName.focus]);

  useEffect(() => {
    const valid = !UserInput.checkInputEmpty(city.value);
    setCity((prevState) => ({
      ...prevState,
      valid,
      visibleClue: city.focus && !valid,
    }));
  }, [city.value, city.focus]);

  useEffect(() => {
    const valid = UserInput.checkPostcodeRequiredValid(
      country.value,
      postalCode.value
    );
    setPostalCode((prevState) => ({
      ...prevState,
      valid,
      visibleClue: postalCode.focus && !valid,
    }));
  }, [postalCode.value, postalCode.focus, country.value]);

  useEffect(() => {
    const valid = !UserInput.checkInputEmpty(country.value);
    setCountry((prevState) => ({
      ...prevState,
      valid,
      visibleClue: country.focus && !valid,
    }));
  }, [country.value, country.focus]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.sendDataToParent({
      firstName: firstName.value,
      lastName: lastName.value,
      apartment: apartment.value,
      streetNumber: streetNumber.value,
      streetName: streetName.value,
      city: city.value,
      region: region.value,
      postalCode: postalCode.value,
      country: country.value,
      isShipping: shipping,
      isShippingDefault: shippingDefault,
      isBilling: billing,
      isBillingDefault: billingDefault,
      addressId: props.startingData.addressId,
    });
  };
  const handleReset = (e: FormEvent) => {
    e.preventDefault();
    props.sendResetToParent();
  };

  return (
    <form
      onReset={handleReset}
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-start gap-3 md:flex-row"
    >
      <div>
        <label
          className={`relative inline-flex items-center ${add ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <input
            type="checkbox"
            disabled={add}
            value=""
            checked={shipping}
            onChange={(e) => setShipping(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-moonNeutral-800 hover:peer-checked:bg-moonNeutral-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-600 ">
            Shipping
          </span>
        </label>
        <div className="flex items-center mb-5">
          <span className="mr-3 text-sm font-medium text-gray-600 ">
            Default
          </span>
          <label
            className={`relative inline-flex items-center ${add ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <input
              type="checkbox"
              disabled={add}
              value=""
              checked={shippingDefault}
              onChange={(e) => setShippingDefault(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-moonNeutral-800 hover:peer-checked:bg-moonNeutral-600"></div>
          </label>
        </div>
        <label
          className={`relative inline-flex items-center ${add ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <input
            type="checkbox"
            disabled={add}
            value=""
            checked={billing}
            onChange={(e) => setBilling(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-moonNeutral-800 hover:peer-checked:bg-moonNeutral-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-600 ">
            Billing
          </span>
        </label>
        <div className="flex items-center mb-5">
          <span className="mr-3 text-sm font-medium text-gray-600 ">
            Default
          </span>
          <label
            className={`relative inline-flex items-center ${add ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <input
              type="checkbox"
              disabled={add}
              value=""
              checked={billingDefault}
              onChange={(e) => setBillingDefault(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-moonNeutral-800 hover:peer-checked:bg-moonNeutral-600"></div>
          </label>
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
            clues={clue}
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
            clues={clue}
          />
        </div>{' '}
        <div className="mb-1">
          <UserInputString
            type="text"
            label="Apartment/Suite"
            placeHolder=""
            autocomplete="off"
            state={apartment}
            setState={setApartment}
          />
        </div>
        <div className="mb-1">
          <UserInputString
            type="text"
            label="Street Number"
            placeHolder=""
            autocomplete="off"
            state={streetNumber}
            setState={setStreetNumber}
            clues={clue}
          />
        </div>
        <div className="mb-1">
          <UserInputString
            type="text"
            label="Street Name"
            placeHolder=""
            autocomplete="off"
            state={streetName}
            setState={setStreetName}
            clues={clue}
          />
        </div>
        <div className="mb-1">
          <UserInputString
            type="text"
            label="City"
            placeHolder=""
            autocomplete="off"
            state={city}
            setState={setCity}
            clues={clue}
          />
        </div>
        <div className="mb-1">
          <UserInputString
            type="text"
            label="Region"
            placeHolder=""
            autocomplete="off"
            state={region}
            setState={setRegion}
          />
        </div>
        <div className="mb-1">
          <UserInputString
            type="text"
            label="Postal Code"
            placeHolder=""
            autocomplete="off"
            state={postalCode}
            setState={setPostalCode}
            clues={cluePostalCode}
          />
        </div>
        <div className="mb-1">
          <label
            htmlFor="country"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Country
          </label>
          <select
            id="country"
            value={country.value}
            onChange={(e) =>
              setCountry((prevState) => ({
                ...prevState,
                value: e.target.value,
              }))
            }
            onFocus={() =>
              setCountry((prevState) => ({
                ...prevState,
                focus: true,
              }))
            }
            onBlur={() =>
              setCountry((prevState) => ({
                ...prevState,
                focus: false,
              }))
            }
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              country.valid ? '' : ' border-red-500'
            }`}
            aria-invalid={country.valid ? 'false' : 'true'}
            aria-describedby="hint-country"
          >
            <option value="">Choose Country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="DE">Germany</option>
            <option value="GB">Great Britain</option>
          </select>
          <div
            id="hint-country"
            className={`mt-1 py-1 flex flex-row rounded-md bg-moonNeutral-200 md:max-w-2xl md:mx-auto justify-start items-center gap-2 text-sm ${
              country.visibleClue ? ' ' : ' hidden'
            }`}
          >
            <BsInfoCircle className="ml-2 text-xl" />
            {clue}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button
          className="bg-moonBlack text-moonNeutral-100 rounded-lg px-4 py-2 hover:bg-moonNeutral-600 focus:outline-none focus:shadow-outline disabled:bg-moonNeutral-500"
          type="submit"
          disabled={
            !firstName.valid ||
            !lastName.valid ||
            !streetNumber.valid ||
            !streetName.valid ||
            !city.valid ||
            !postalCode.valid ||
            !country.valid
          }
        >
          {add ? 'Add' : 'Update'}
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
