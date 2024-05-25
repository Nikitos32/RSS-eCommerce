import {
  CountryCode,
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';
type UserInputType =
  | 'name'
  | 'email'
  | 'password'
  | 'date'
  | 'general'
  | 'postcode';

type InputStringRule = {
  [key in UserInputType]?: { regex: RegExp; clue: string };
};

const stringRules: InputStringRule = {
  name: { regex: /[a-zA-Z]+$/, clue: 'Latin letters only' },
  email: {
    regex: /^([a-zA-Z0-9_\s.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    clue: 'Valid email address',
  },
  password: {
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
    clue: `8 to 24 characters.
      <br />
      Must include uppercase and lowercase letters, a number and a special
      character.
      <br />
      Allowed special characters: <span aria-label="exclamation mark">
        !
      </span>
      <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
      <span aria-label="dollar sign">$</span>
      <span aria-label="percent">%</span>`,
  },
  postcode: {
    regex: /$/,
    clue: 'Must be a valid postal code',
  },
};

const dateRules = {
  minAge: 18,
};

const clueRequired = 'Required';
/**
 *
 * @description UserInput validator class
 *
 * @method checkNameValid
 * @method checkNameRequiredValid
 * @method checkPasswordRequiredValid
 * @method checkEmailRequiredValid
 * @method checkBirthdayValid
 * @method getBirthdayClue
 * @method getNameClue
 * @method getPasswordClue
 * @method getEmailClue
 */
export class UserInput {
  private static checkStringValid(
    inputType: UserInputType,
    input: string
  ): boolean {
    const regex = stringRules[inputType]?.regex;
    if (regex) {
      return regex.test(input);
    }
    return true; // no rules found
  }

  private static checkStringEmpty(input: string): boolean {
    return !input;
  }

  private static getStringClue(inputType: UserInputType): string {
    const clue = stringRules[inputType]?.clue;
    if (clue) {
      return clue;
    }
    return ''; // no clue found
  }

  private static addRequiredClueBefore(clue: string): string {
    return `${clueRequired} <br /> ${clue}`;
  }
  /**
   *
   * @description name validation method
   *
   * @param input  string
   *
   * @return { true | false }  boolean
   */
  static checkNameValid(input: string): boolean {
    return (
      UserInput.checkStringEmpty(input) ||
      UserInput.checkStringValid('name', input)
    );
  }

  /**
   *
   * @description required name validation method
   *
   * @param input  string
   *
   * @return { true | false }  boolean
   */
  static checkNameRequiredValid(input: string): boolean {
    return (
      !UserInput.checkStringEmpty(input) &&
      UserInput.checkStringValid('name', input)
    );
  }
  /**
   *
   * @description password validation method
   *
   * @param input  string
   *
   * @return { true | false }  boolean
   */
  static checkPasswordRequiredValid(input: string): boolean {
    return (
      !UserInput.checkStringEmpty(input) &&
      UserInput.checkStringValid('password', input)
    );
  }
  /**
   *
   * @description email validation method
   *
   * @param input  string
   *
   * @return { true | false }  boolean
   */
  static checkEmailRequiredValid(input: string): boolean {
    return (
      !UserInput.checkStringEmpty(input) &&
      UserInput.checkStringValid('email', input)
    );
  }
  /**
   *
   * @description birthday validation method
   *
   * @param input  string
   *
   * @return { true | false }  boolean
   */
  static checkBirthdayValid(input: string): boolean {
    if (!input) {
      return true;
    }

    const birthDate = new Date(input);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const birthDateThisYear = new Date(
      currentDate.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );
    if (birthDateThisYear > currentDate) {
      age -= 1;
    }
    return age >= dateRules.minAge;
  }
  /**
   *
   * @description required birthday validation method
   *
   * @param input  string
   *
   * @return { true | false }  boolean
   */
  static checkBirthdayRequiredValid(input: string): boolean {
    return (
      !UserInput.checkStringEmpty(input) && UserInput.checkBirthdayValid(input)
    );
  }

  /**
   *
   * @description postcode validation method
   *  @param countryCode string
   * @param input  string
   *
   * @return { true | false }  boolean
   */
  static checkPostcodeValid(countryCode: string, input: string): boolean {
    if (!input) return true;
    if (!postcodeValidatorExistsForCountry(countryCode as CountryCode))
      return true; // we can't check let's believe
    return postcodeValidator(input, countryCode as CountryCode);
  }
  /**
   *
   * @description required postcode validation method
   *  @param countryCode string
   * @param input  string
   *
   * @return { true | false }  boolean
   */
  static checkPostcodeRequiredValid(
    countryCode: string,
    input: string
  ): boolean {
    return (
      !UserInput.checkStringEmpty(input) &&
      UserInput.checkPostcodeValid(countryCode, input)
    );
  }
  /**
   *
   * @description method return hint for name validation
   *
   * @return string to be parsed into a JSX.ELement
   * Use <p dangerouslySetInnerHTML={{ __html: UserInput.get*Clue() }} />
   */
  static getNameClue(): string {
    return UserInput.getStringClue('name');
  }
  /**
   *
   * @description method return hint for required name validation
   *
   * @return string to be parsed into a JSX.ELement
   * Use <p dangerouslySetInnerHTML={{ __html: UserInput.get*Clue() }} />
   */
  static getNameRequiredClue(): string {
    return UserInput.addRequiredClueBefore(UserInput.getNameClue());
  }
  /**
   *
   * @description method return hint for password validation
   *
   * @return string to be parsed into a JSX.ELement
   * Use <p dangerouslySetInnerHTML={{ __html: UserInput.get*Clue() }} />
   */
  static getPasswordClue(): string {
    return UserInput.addRequiredClueBefore(UserInput.getStringClue('password'));
  }
  /**
   *
   * @description method return hint for email validation
   *
   * @return string to be parsed into a JSX.ELement
   * Use <p dangerouslySetInnerHTML={{ __html: UserInput.get*Clue() }} />
   */
  static getEmailClue(): string {
    return UserInput.addRequiredClueBefore(UserInput.getStringClue('email'));
  }
  /**
   *
   * @description method return hint for birthday validation
   *
   * @return string to be parsed into a JSX.ELement
   * Use <p dangerouslySetInnerHTML={{ __html: UserInput.get*Clue() }} />
   */
  static getBirthdayClue(): string {
    return `Must be ${dateRules.minAge} years old`;
  }

  /**
   *
   * @description method return hint for required birthday validation
   *
   * @return string to be parsed into a JSX.ELement
   * Use <p dangerouslySetInnerHTML={{ __html: UserInput.get*Clue() }} />
   */
  static getBirthdayRequiredClue(): string {
    return UserInput.addRequiredClueBefore(UserInput.getBirthdayClue());
  }

  /**
   *
   * @description method return hint for postcode validation
   *
   * @return string to be parsed into a JSX.ELement
   * Use <p dangerouslySetInnerHTML={{ __html: UserInput.get*Clue() }} />
   */
  static getPostcodeClue(countryCode?: CountryCode): string {
    const countryPart = countryCode ? `for ${countryCode}` : '';
    return `${UserInput.getStringClue('postcode')}${countryPart}.`;
  }

  /**
   *
   * @description method return hint for required postcode validation
   *
   * @return string to be parsed into a JSX.ELement
   * Use <p dangerouslySetInnerHTML={{ __html: UserInput.get*Clue() }} />
   */
  static getPostcodeRequiredClue(countryCode?: CountryCode): string {
    return UserInput.addRequiredClueBefore(
      UserInput.getPostcodeClue(countryCode)
    );
  }
}
