export type InputDataValueType = {
  value: string;
  correct: boolean;
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
