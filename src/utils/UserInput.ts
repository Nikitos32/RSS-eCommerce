type UserInputType = 'name' | 'email' | 'password' | 'date' | 'general';

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
};

const dateRules = {
  minAge: 18,
};
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
  /**
   *
   * @description name validation method
   *
   * @param input  string
   *
   * @return { true | false }  boolean
   */
  static checkNameValid(input: string): boolean {
    return this.checkStringEmpty(input) || this.checkStringValid('name', input);
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
      !this.checkStringEmpty(input) && this.checkStringValid('name', input)
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
      !this.checkStringEmpty(input) && this.checkStringValid('password', input)
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
      !this.checkStringEmpty(input) && this.checkStringValid('email', input)
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
    const birthDate = new Date(input);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    return age >= dateRules.minAge;
  }
  /**
   *
   * @description method return hint for name validation
   *
   * @return string
   */
  static getNameClue(): string {
    return this.getStringClue('name');
  }
  /**
   *
   * @description method return hint for password validation
   *
   * @return string
   */
  static getPasswordClue(): string {
    return this.getStringClue('password');
  }
  /**
   *
   * @description method return hint for email validation
   *
   * @return string
   */
  static getEmailClue(): string {
    return this.getStringClue('email');
  }
  /**
   *
   * @description method return hint for birthday validation
   *
   * @return string
   */
  static getBirthdayClue(): string {
    return `Must be ${dateRules.minAge} years old`;
  }
}
