import { FormEvent, useEffect, useRef, useState } from 'react';
import UserInputString from '../components/UserInputString';
import { UserInput } from '../utils';
import { useNavigate } from 'react-router-dom';
function ChangePassword() {
  const navigate = useNavigate();

  const pwdCurrentRef = useRef<HTMLInputElement>(null);

  const [pwdCurrent, setPwdCurrent] = useState('');
  const [validPwdCurrent, setValidPwdCurrent] = useState(false);
  const [cluesVisiblePwdCurrent, setCluesVisiblePwdCurrent] = useState(false);
  const [pwdCurrentFocus, setPwdCurrentFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [cluesVisiblePwd, setCluesVisiblePwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [match, setMatch] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [cluesVisibleMatch, setCluesVisibleMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  useEffect(() => {
    if (pwdCurrentRef.current) {
      pwdCurrentRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setValidPwdCurrent(!UserInput.checkInputEmpty(pwdCurrent));
    setCluesVisiblePwdCurrent(pwdCurrentFocus && !validPwdCurrent);
  }, [pwdCurrent, validPwdCurrent, pwdCurrentFocus]);

  useEffect(() => {
    setValidPwd(UserInput.checkPasswordRequiredValid(pwd));
    setCluesVisiblePwd(pwdFocus && (!pwd || !validPwd));
  }, [pwd, validPwd, pwdFocus]);

  useEffect(() => {
    setValidMatch(pwd === match);
    setCluesVisibleMatch(matchFocus && (!match || !validMatch));
  }, [pwd, match, validPwd, validMatch, matchFocus]);
  const pwdCurrentClue = (
    <p dangerouslySetInnerHTML={{ __html: UserInput.getRequiredClue() }} />
  );
  const pwdClues = (
    <p dangerouslySetInnerHTML={{ __html: UserInput.getPasswordClue() }} />
  );

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();
    navigate(-1);
  };
  return (
    <section className="bg-moonNeutral-300 dark:bg-moonNeutral-700">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-moonBlack md:text-2xl dark:text-moonNeutral-100">
            Change Password
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onReset={handleReset}
          >
            <div className="mb-10">
              <UserInputString
                type="password"
                label="Current Password"
                placeHolder="********"
                autocomplete="off"
                value={pwdCurrent}
                setValueUseState={setPwdCurrent}
                isValidValue={validPwdCurrent}
                isCluesVisible={cluesVisiblePwdCurrent}
                setFocusUseState={setPwdCurrentFocus}
                clues={pwdCurrentClue}
                elementUseRef={pwdCurrentRef}
              />
            </div>
            <div className="mb-4">
              <UserInputString
                type="password"
                label="New Password"
                placeHolder="********"
                autocomplete="off"
                value={pwd}
                setValueUseState={setPwd}
                isValidValue={validPwd}
                isCluesVisible={cluesVisiblePwd}
                setFocusUseState={setPwdFocus}
                clues={pwdClues}
              />
            </div>
            <div className="mb-6">
              <UserInputString
                type="password"
                label="Confirm Password"
                placeHolder="********"
                autocomplete="off"
                value={match}
                setValueUseState={setMatch}
                isValidValue={validMatch}
                isCluesVisible={cluesVisibleMatch}
                setFocusUseState={setMatchFocus}
                clues={<p>Must match the new password input field.</p>}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-moonBlack text-moonNeutral-100 rounded-lg px-4 py-2 hover:bg-moonNeutral-600 focus:outline-none focus:shadow-outline disabled:bg-moonNeutral-500"
                type="submit"
                disabled={!validPwdCurrent || !validPwd || !validMatch}
              >
                Change Password
              </button>
              <button
                className="bg-moonNeutral-700 text-moonNeutral-100 rounded-lg px-4 py-2 hover:bg-moonNeutral-600 focus:outline-none focus:shadow-outline disabled:bg-moonNeutral-500"
                type="reset"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ChangePassword;
