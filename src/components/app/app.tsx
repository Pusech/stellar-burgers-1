import {
  ConstructorPage,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404,
  Feed
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { AppHeader, IngredientDetails } from '@components';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { Modal } from '../modal/modal';
import { OrderInfo } from '../order-info/order-info';
import { useEffect } from 'react';
import {
  getIngredients,
  getIngredientsSelector
} from '../../services/slices/ingredientsSlice';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { getUser } from '../../services/slices/userSlice';
import { clearCurrentOrder } from '../../services/slices/orderSlice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const backgroundLocation = location.state?.background;

  const ingredients = useSelector(getIngredientsSelector);
  console.log(ingredients);
  function handleClose() {
    navigate(-1);
  }

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
    dispatch(getUser());
  }, []);

  useEffect(() => {
    dispatch(clearCurrentOrder());
  }, [location]);
  // Почему так:
  // при нажатии пользователем кнопочки назад в браузере с открытой модалкой
  // либо при переходе в конструктор из отдельной вкладки заказа
  // модалка всегда оставалась открытой поэтому я чищу стейт при любом изменении локации

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyAuth component={<ResetPassword />} />}
        />

        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route
          path='/profile/orders'
          element={<OnlyAuth component={<ProfileOrders />} />}
        />
        <Route
          path='/profile/orders/:number'
          element={<OnlyAuth component={<OrderInfo />} />}
        />

        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {location.state?.background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='' onClose={handleClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='' onClose={handleClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
