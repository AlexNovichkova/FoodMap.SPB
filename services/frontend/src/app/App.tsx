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
import { ProtectedRoute } from './ProtectedRoute';
import { useEffect } from 'react';
import { getUser } from 'src/features/slices/userSlice';
import { fetchRestaurants } from 'src/features/slices/restaurantsSlice';
import { RestaurantPage } from 'src/pages/RestaurantPage';
import { testCategorys, testRestaurants, testUsers } from './testData';
import { FindRestaurantPage } from 'src/pages/FindReastaurantPage';
import { NotFound404 } from 'src/pages/NotFound404';

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;
  const dispatch = useDispatch();

  useEffect(() => {
    {
      /*dispatch(fetchRestaurants())*/
    }
    dispatch({
      type: 'restaurants/getAllRestaurants/fulfilled',
      payload: testRestaurants,
    });
    dispatch({
      type: 'categories/getAllCategories/fulfilled',
      payload: testCategorys,
    });

    dispatch(getUser());
    /*dispatch(setTestUser(testUsers[0]));*/
    /*dispatch({
      type: 'user/getUser/fulfilled',
      payload: testUsers
    });*/
  }, [dispatch]);

  const onClose = () => {
    navigate(-1);
  };
  return (
    <>
      <Layout>
        <Routes location={backgroundLocation || location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants" element={<FindRestaurantPage />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute onlyUnAuth>
                <Modal title={'Войти'} onClose={onClose}>
                  <Login />
                </Modal>
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute onlyUnAuth>
                <Register />
              </ProtectedRoute>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute onlyUnAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound404 />} />
          <Route path="/profile">
            <Route index element={<Profile />} />
          </Route>
          <Route path="/restaurants/:id" element={<RestaurantPage />} />
        </Routes>
        {backgroundLocation && (
          <Routes>
            <Route
              path="/login"
              element={
                <ProtectedRoute onlyUnAuth>
                  <Modal title={'Войти'} onClose={onClose}>
                    <Login />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </Layout>
    </>
  );
};
