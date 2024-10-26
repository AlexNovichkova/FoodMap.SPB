import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from 'src/pages/HomePage';
import { Layout } from './Layout';
import { Modal } from 'src/widgets/Modal/Modal';
import { useLocation, useNavigate } from 'react-router-dom';
import { Login } from 'src/widgets/Auth/Login';
function getBasename() {
  const path = window.location.pathname;

  if (path.startsWith('/foodmap')) {
    return '/foodmap/';
  }

  return '/';
}

const AppRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;

  return (
    <>
      {backgroundLocation && (
        <Modal title={'Войти'} onClose={() => navigate(-1)}>
          <Login />
        </Modal>
      )}
    </>
  );
};

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppRouter />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: '/:login',
          element: <Login />,
          // Устанавливаем состояние для модального окна
          action: ({ request }) => {
            const url = new URL(request.url);
            return {
              state: { background: url.pathname }
            };
          }
        }
      ]
    }
  ],
  { basename: getBasename() }
);
