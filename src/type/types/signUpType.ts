export type InputDataValueType = {
  value: string;
  correct: boolean;
  setError?: (newError: string) => void;
};

export type InputDataType = {
  Name: InputDataValueType;
  Surname: InputDataValueType;
  Email: InputDataValueType;
  Password: InputDataValueType;
  DateOfBirth: InputDataValueType;
  BillingCountry: InputDataValueType;
  BillingPostalCode: InputDataValueType;
  BillingCity: InputDataValueType;
  BillingStreet: InputDataValueType;
  ShippingCountry: InputDataValueType;
  ShippingPostalCode: InputDataValueType;
  ShippingCity: InputDataValueType;
  ShippingStreet: InputDataValueType;
};
