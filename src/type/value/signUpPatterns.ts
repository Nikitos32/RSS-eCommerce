import { PatternSignUp } from '../../components/SignUpPage/InputContainerSignUp/InputConatinerSignUp';
import { REGEX_FOR_EMAIL_INPUT } from '../../constants';

export const namePattern: PatternSignUp[] =
  [
    {
      pattern: '[A-Z].*',
      errorMessage:
        'first english letter must be capitalised',
    },
    {
      pattern: '^.{1}[a-z]*$',
      errorMessage:
        'after first letter must be English lowercase',
    },
    {
      pattern: '.{2,}.*',
      errorMessage:
        'minimum characters 2',
    },
  ];

export const patternPostalCode =
  new Map<string, PatternSignUp[]>();
patternPostalCode.set('Canada', [
  {
    pattern: '^[^a-z]*$',
    errorMessage:
      'no lowercase letters',
  },
  {
    pattern: '^[^DFIOQU]*$',
    errorMessage:
      'the letters D, F, I, O, Q, U cannot be used',
  },
  {
    pattern:
      '^[A-CEGHJ-NPR-TV-Z][0-9][A-CEGHJ-NPR-TV-Z] [0-9][A-CEGHJ-NPR-TV-Z][0-9]$',
    errorMessage:
      'comply with standard ANA NAN',
  },
]);
patternPostalCode.set('Germany', [
  {
    pattern: '^\\d{4}$',
    errorMessage:
      'comply with standard NNNN',
  },
]);
patternPostalCode.set(
  'United Kingdom',
  [
    {
      pattern: '^[^a-z]*$',
      errorMessage:
        'no lowercase letters',
    },
    {
      pattern:
        '^((([A-PR-UWYZ][0-9][0-9]?)|([A-PR-UWYZ][A-HK-Y][0-9][0-9]?)|([A-PR-UWYZ][0-9][A-HJKS-UW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\\s[0-9][ABD-HJLNP-UW-Z]{2})$',
      errorMessage:
        'comply with standard A[A]N[A/N] NAA',
    },
  ]
);
patternPostalCode.set('United States', [
  {
    pattern: '^\\d{5}(-\\d{4})?$',
    errorMessage:
      'standard NNNNN, NNNNN-NNNN',
  },
]);

export const patternPassword = [
  {
    pattern: '^\\S*$',
    errorMessage: 'no spaces',
  },
  {
    pattern: '^[^\\u0400-\\u04FF]*$',
    errorMessage: 'only english letter',
  },
  {
    pattern: '^.{0,15}$',
    errorMessage:
      'must be less than 16 character',
  },
  {
    pattern: '[0-9]',
    errorMessage: 'need number',
  },
  {
    pattern: '[a-z]',
    errorMessage:
      'need english lowercase letter',
  },
  {
    pattern: '[A-Z]',
    errorMessage:
      'don`t have uppercase letter',
  },
  {
    pattern: '(?=.*[!@#$%^&*])',
    errorMessage:
      'special character is needed',
  },
  {
    pattern: '.{7,}.*',
    errorMessage:
      'must be longer than 8 characters',
  },
];

export const patternStreet = [
  {
    pattern: '[A-Z].*',
    errorMessage:
      'first english letter must be capitalised',
  },
  {
    pattern: '[^\\s]$',
    errorMessage:
      'must not end in space',
  },
  {
    pattern: '^.{1}[a-zA-Z0-9 ]*$',
    errorMessage:
      'after first letter must be lowercase, number or spase',
  },
  {
    pattern: '.{2,}.*',
    errorMessage:
      'minimum characters 2',
  },
];

export const patternEmail = [
  {
    pattern: '^\\S*$',
    errorMessage: 'no spaces',
  },
  {
    pattern: REGEX_FOR_EMAIL_INPUT,
    errorMessage:
      'Incorrect email format',
  },
];
