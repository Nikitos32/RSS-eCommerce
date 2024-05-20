import { ClipLoader } from 'react-spinners';

type SpinnerProps = {
  isLoading: boolean;
};
const override = {
  display: 'block',
  margin: '100px auto',
};
function Spinner({
  isLoading,
}: SpinnerProps) {
  return (
    <ClipLoader
      color="#4338ca"
      loading={isLoading}
      cssOverride={override}
      size={150}
    />
  );
}

export default Spinner;
