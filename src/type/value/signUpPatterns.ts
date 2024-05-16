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
        'after first letter must be lowercase or hyphen',
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
patternPostalCode.set('United States', [
  {
    pattern: '^\\d{5}(-\\d{4})?$',
    errorMessage:
      'must be NNNNN, NNNNN-NNNN',
  },
]);
