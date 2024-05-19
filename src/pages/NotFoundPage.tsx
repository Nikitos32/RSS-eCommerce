import {
  FaArrowLeft,
  FaExclamationTriangle,
} from 'react-icons/fa';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
      <FaExclamationTriangle className="text-moonBlack text-6xl mb-4" />
      <h1 className="text-6xl font-bold mb-4">
        404 Not Found
      </h1>
      <p className="text-xl mb-5">
        This page does not exist
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          to={'..'}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
        >
          <FaArrowLeft className="inline-block" />{' '}
          Go Back
        </Link>
        <Link
          to="/"
          className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
        >
          To Main Page
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
