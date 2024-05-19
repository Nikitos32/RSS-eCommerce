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
  Country: InputDataValueType;
  PostalCode: InputDataValueType;
  City: InputDataValueType;
  Street: InputDataValueType;
};
