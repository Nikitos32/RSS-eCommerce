import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import UserInputString from '../components/UserInputString';
import { UserInput } from '../utils';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useApiChangePassword } from '../hooks';
import { IsLoadindContext } from '../App';

function ChangePassword() {
  const navigate = useNavigate();

  const inputStringInitState = {
    value: '',
    valid: false,
    visibleClue: false,
    focus: false,
    readonly: false,
  };

  const [handleLoading] = useContext(IsLoadindContext);

  const pwdCurrentRef = useRef<HTMLInputElement>(null);

  const [current, setCurrent] = useState(inputStringInitState);

  const [pwd, setPwd] = useState(inputStringInitState);
  const [match, setMatch] = useState(inputStringInitState);

  const { changePassword } = useApiChangePassword(current.value, pwd.value);

  useEffect(() => {
    if (pwdCurrentRef.current) {
      pwdCurrentRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const valid = !UserInput.checkInputEmpty(current.value);
    setCurrent((prevState) => ({
      ...prevState,
      valid,
      visibleClue: current.focus && !valid,
    }));
  }, [current.focus, current.value]);

  useEffect(() => {
    const valid = UserInput.checkPasswordRequiredValid(pwd.value);
    setPwd((prevState) => ({
      ...prevState,
      valid,
      visibleClue: pwd.focus && (!pwd.value || !valid),
    }));
  }, [pwd.value, pwd.focus]);

  useEffect(() => {
    const valid = pwd.value === match.value;
    setMatch((prevState) => ({
      ...prevState,
      valid,
      visibleClue: match.focus && (!match.value || !valid),
    }));
  }, [pwd.value, match.value, match.focus]);

  const pwdCurrentClue = (
    <p dangerouslySetInnerHTML={{ __html: UserInput.getRequiredClue() }} />
  );
  const pwdClues = (
    <p dangerouslySetInnerHTML={{ __html: UserInput.getPasswordClue() }} />
  );
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    handleLoading(true);
    const answer = await changePassword();
    if (answer.ok) {
      toast.success('Password Changed');
      navigate(-1);
    } else {
      toast.error(answer.message);
    }
    handleLoading(false);
  };
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
            onSubmit={handleSubmit}
            onReset={handleReset}
          >
            <div className="mb-10">
              <UserInputString
                type="password"
                label="Current Password"
                placeHolder="********"
                autocomplete="off"
                state={current}
                setState={setCurrent}
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
                state={pwd}
                setState={setPwd}
                clues={pwdClues}
              />
            </div>
            <div className="mb-6">
              <UserInputString
                type="password"
                label="Confirm Password"
                placeHolder="********"
                autocomplete="off"
                state={match}
                setState={setMatch}
                clues={<p>Must match the new password input field.</p>}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-moonBlack text-moonNeutral-100 rounded-lg px-4 py-2 hover:bg-moonNeutral-600 focus:outline-none focus:shadow-outline disabled:bg-moonNeutral-500"
                type="submit"
                disabled={!current.valid || !pwd.valid || !match.valid}
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
