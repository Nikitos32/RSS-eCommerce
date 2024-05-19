export enum InputType {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
  CHECKBOX = 'checkbox',
}

export enum BtnType {
  SUBMIT = 'submit',
  BUTTON = 'button',
}

export enum Links {
  HOME = 'Home',
  ABOUT = 'About',
  SHOP = 'Shop',
  ACCOUNT = 'Account',
  CART = 'Cart',
}

export const MIN_PASSWORD_LENGTH: number = 8;

export const REGEX_FOR_EMAIL_INPUT: string =
  '[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\\.)+[A-Za-z]{2,4}';
export const REGEX_FOR_PASSWORD_INPUT: string =
  '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$';

export const STYLE_FOR_PASSWORD_INPUT: string =
  'resetAllStyle';

export const EMAIL_INVALID_INPUT_MESSAGE =
  'Email должен быть в данном формате example@example.com';

export const PASSWORD_INVALID_INPUT_MESSAGE =
  'Пароль должен содержать хотя бы одну заглавную букву, одну цифру и один специальный символ !@#$%^&*';
