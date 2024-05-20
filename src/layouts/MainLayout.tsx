import { Outlet } from 'react-router-dom';
import Header2 from '../components/Header2';

function MainLayout() {
  return (
    <>
      <Header2 />
      <Outlet />
    </>
  );
}

export default MainLayout;
