import { RouterProvider } from 'react-router-dom';
import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'src/features/store';
import { HomePage } from 'src/pages/HomePage';
import { Login } from 'src/widgets/Auth/Login';
import { Modal } from 'src/widgets/Modal/Modal';
import { Layout } from './Layout';
import { Register } from 'src/widgets/Auth/Register';
import { ResetPassword } from 'src/widgets/Auth/ResetPassword';
import { ForgotPassword } from 'src/widgets/Auth/ForgotPassword';
import { Profile } from 'src/pages/Profile';

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;
  const dispatch = useDispatch();

  const onClose = () => {
    navigate(-1);
  };
  return (
    <>
      <Layout>
        <Routes location={backgroundLocation || location}>
          <Route path='/' element={<HomePage />} />
          <Route
            path='/:login'
            element={
              <Modal title={'Войти'} onClose={onClose}>
                <Login />
              </Modal>
            }
          />
          <Route
            path='/:register'
            element={
              <Modal title={'Зарегистрироваться'} onClose={onClose}>
                <Register />
              </Modal>
            }
          />

          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        {backgroundLocation && (
          <Routes>
            <Route
              path='/:login'
              element={
                <Modal title={'Войти'} onClose={onClose}>
                  <Login />
                </Modal>
              }
            />
            <Route
              path='/:register'
              element={
                <Modal title={'Зарегистрироваться'} onClose={onClose}>
                  <Register />
                </Modal>
              }
            />
          </Routes>
        )}
      </Layout>
    </>
  );
};
