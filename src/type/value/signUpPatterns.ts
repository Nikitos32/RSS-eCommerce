import { PatternSignUp } from '../../components/SignUpPage/InputContainerSignUp/InputConatinerSignUp';

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
        'after first letter must be lowercase',
    },
    {
      pattern: '.{2,}.*',
      errorMessage:
        'minimum characters 2',
    },
  ];

export const patternPostalCode =
  new Map<string, PatternSignUp[]>();
patternPostalCode.set('Austria', [
  {
    pattern: '\\d{4}',
    errorMessage: 'must be 4 digits',
  },
]);
patternPostalCode.set('Bulgaria', [
  {
    pattern: '\\d{4}$',
    errorMessage: 'must be 4 digits',
  },
]);
patternPostalCode.set('Canada', [
  {
    pattern:
      '^[A-CEGHJ-NPR-TV-Z][0-9][A-CEGHJ-NPR-TV-Z] [0-9][A-CEGHJ-NPR-TV-Z][0-9]$',
    errorMessage:
      'must be standart ANA NAN',
  },
]);
patternPostalCode.set('China', [
  {
    pattern: '\\d{6}$',
    errorMessage: 'must be 6 digits',
  },
]);
patternPostalCode.set('Germany', [
  {
    pattern: '\\d{4}$',
    errorMessage: 'must be 4 digits',
  },
]);
patternPostalCode.set(
  'United Kingdom',
  [
    {
      pattern:
        '^((([A-PR-UWYZ][0-9][0-9]?)|([A-PR-UWYZ][A-HK-Y][0-9][0-9]?)|([A-PR-UWYZ][0-9][A-HJKS-UW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\\s[0-9][ABD-HJLNP-UW-Z]{2})$',
      errorMessage:
        'must be AN, ANN, AAN, AANN, ANA, AANA, AAA, NAA',
    },
  ]
);
patternPostalCode.set('United States', [
  {
    pattern: '^\\d{5}(-\\d{4})?$',
    errorMessage:
      'must be NNNNN, NNNNN-NNNN',
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
