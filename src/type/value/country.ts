import { CountryName } from '../enums/SignUpEnums';

export const countryArray: string[] = [
  CountryName.AUSTRIA,
  CountryName.BULGARIA,
  CountryName.CANADA,
  CountryName.CHINA,
  CountryName.GERMANY,
  CountryName.UNITED_KINDOM,
  CountryName.UNITED_STATES,
];

export const countryCode = new Map<
  string,
  string
>();
countryCode.set(
  CountryName.AUSTRIA,
  'AT'
);
countryCode.set(
  CountryName.BULGARIA,
  'BG'
);
countryCode.set(
  CountryName.CANADA,
  'CA'
);
countryCode.set(
  CountryName.CHINA,
  'CN'
);
countryCode.set(
  CountryName.GERMANY,
  'DE'
);
countryCode.set(
  CountryName.UNITED_KINDOM,
  'GB'
);
countryCode.set(
  CountryName.UNITED_STATES,
  'US'
);
