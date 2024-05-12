export enum InputType {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
  CHECKBOX = 'checkbox',
}

export const MIN_PASSWORD_LENGTH: number = 8;

export const REGEX_FOR_EMAIL_INPUT: RegExp =
  /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
