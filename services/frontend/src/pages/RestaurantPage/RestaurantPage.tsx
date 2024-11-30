import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'src/features/store';
import { LocationIcon } from 'src/widgets/RestaurantCard/ui/LocationIcon';
import { StarIcon } from 'src/widgets/RestaurantCard/ui/StarIcon';
import { FingerIcon } from './ui/FingerIcon';
import { HeartIcon } from './ui/HeartIcon';
import {
  authenticatedSelector,
  checkUserAuth,
} from 'src/features/slices/userSlice';
import { fetchCoordinates, updateUserApi } from 'src/entities/projects/api/api';
import { RestaurantMapComponent } from './ui/RestaurantMapComponent/RestaurantMapComponent';
import { Preloader } from 'src/app/Preloader';
import {
  fetchRestaurants,
  selectIsLoading,
} from 'src/features/slices/restaurantsSlice';
import { testRestaurants } from 'src/app/testData';

export const RestaurantPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const restaurants = useSelector((state) => state.restaurants.restaurants);
  const user = useSelector((state) => state.user);
  const isAuthenticated = useSelector(authenticatedSelector);
  const isLoading = useSelector(selectIsLoading);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  const { id } = useParams();
  const restaurant = restaurants.find(
    (restaurant) => restaurant.id === Number(id)
  );

  // Проверяем, лайкнут ли ресторан, с установкой значения по умолчанию
  const likedRestaurants = user.user.liked || [];
  const [isLiked, setIsLiked] = useState(
    restaurant ? likedRestaurants.some((r) => r.id === restaurant.id) : false
  );

  useEffect(() => {
    dispatch(checkUserAuth());
    /*dispatch({
      type: 'restaurants/getAllRestaurants/fulfilled',
      payload: testRestaurants,
    });*/
    dispatch(fetchRestaurants());
  }, [dispatch]);

  useEffect(() => {
    const getCoordinates = async () => {
      if (restaurant) {
        const coords = await fetchCoordinates(restaurant.address);
        setCoordinates(coords);
      }
    };

    getCoordinates();
  }, [restaurant]);

  if (!restaurant) {
    return (
      <div className="min-h-28 flex items-center justify-center text-black-600 gap-5 text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
        Ресторан не найден <span>&#9785;</span>
      </div>
    );
  }

  const toggleIsLiked = () => {
    if (!isAuthenticated) {
      const { pathname, search } = location;
      navigate('/login', { state: { background: { pathname, search } } });
      return;
    }

    const updatedLiked = isLiked
      ? likedRestaurants.filter((r) => r.id !== restaurant.id)
      : [...likedRestaurants, restaurant];

    setIsLiked(!isLiked);
    updateUserApi({ liked: updatedLiked });
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <section className="bg_restaurant">
        <div className="pt-20 pb-16 mx-5 md:m-auto md:w-[90%]">
          <h2 className=" text-green-600 mb-10 text-left font-bold text-lg md:text-2xl lg:text-3xl xl:text-4xl break-words">
            {restaurant.name}
          </h2>
          <div className="flex flex-col gap-4 md:flex-row md:gap-[5%] lg:gap-16">
            <div className=" w-full h-full md:w-64 md:min-w-56 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
              <img
                className=" object-cover object-center rounded-[16px] h-full w-full shadow"
                src={restaurant.photo_links}
                alt={restaurant.name}
              />
            </div>
            <div className=" flex flex-col gap-3 md:max-w-[50%] xl:max-w-[60%]">
              <div className=" text-black-600 text-left flex flex-row gap-2 items-center">
                <span className=" font-medium text-base md:text-xl lg:text-2xl xl:text-3xl break-words">
                  {restaurant.description}
                </span>
              </div>
              <div className=" text-green-600 text-left flex flex-row gap-2 items-center">
                <span className=" flex gap-1 font-semibold text-base md:text-xl lg:text-2xl xl:text-3xl break-words  items-start">
                  Кухня:
                  <span className="flex flex-wrap gap-1">
                    {restaurant.cuisine_type.map((category, index) => (
                      <span
                        key={index}
                        className="font-medium text-black-600 font-caveat break-words text-xl md:text-2xl lg:text-3xl xl:text-4xl lowercase leading-none md:leading-none"
                      >
                        {category}
                        {index < restaurant.cuisine_type.length - 1 && ','}{' '}
                      </span>
                    ))}
                  </span>
                </span>
              </div>
              <div className=" text-accent_orange text-left flex flex-row gap-2 items-center">
                <span className="flex gap-1 font-semibold text-base md:text-xl lg:text-2xl xl:text-3xl break-words items-center">
                  Ценовой сегмент:
                  <span className="font-medium text-black-600 font-caveat text-xl md:text-2xl lg:text-3xl xl:text-4xl md:leading-none">
                    {restaurant.prices}
                  </span>
                </span>
              </div>
              <div className=" text-green-600 flex flex-row gap-2 items-center ">
                <LocationIcon className="size-6" />
                <span className=" font-bold text-lg text-left md:text-2xl lg:text-3xl xl:text-4xl font-caveat break-words">
                  {restaurant.address}
                </span>
              </div>
              <div className=" ">
                <div className=" text-accent_orange text-left flex flex-row gap-2 items-center">
                  <StarIcon className="size-5 " />
                  <span className=" font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl italic">
                    {restaurant.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" mx-5 pb-20 md:m-auto md:w-[90%] flex gap-2 lg:gap-5 flex-col lg:items-end lg:flex-row">
          <span className="font-medium text-green-600 text-base md:text-lg lg:text-xl xl:text-2xl  break-words">
            Понравилось заведение?<br></br>
            <span className=" italic text-black-600">
              {' '}
              Тогда жми сюда, чтобы мы знали о твоих предпочтениях
            </span>
          </span>
          <div className=" flex flex-row gap-2 lg:items-end">
            <FingerIcon className="rotate-90 size-9 lg:size-10 xl:size-12 fill-green-600 transition-all" />
            <button className="card__icon-button" onClick={toggleIsLiked}>
              <HeartIcon className={isLiked ? 'is-liked' : ''} />
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="bg-orange-400 relative z-10 overflow-hidden pt-32 pb-20">
          <div className="w-[95%] md:w-[90%] max-w-screen-2xl m-auto flex flex-col md:flex-row shadow-xl">
            <div className="md:w-[35%] bg-white rounded-t-[8px] md:rounded-tr-none md:rounded-l-[8px] flex flex-col gap-5 justify-center py-8 px-8 md:py-0 md:px-5 lg:px-14">
              <h2 className="text-xl font-bold text-black-600 md:text-2xl lg:text-3xl 2xl:text-4xl">
                Карта заведений
              </h2>
              <p className="text-lg text-black-500 font-caveat md:text-xl lg:text-2xl 2xl:text-3xl">
                Вы можете посмотреть найденные заведения на карте
              </p>
            </div>
            <div className=" md:w-[65%]">
              {isLoading ? (
                <Preloader />
              ) : (
                coordinates && (
                  <RestaurantMapComponent
                    restaurant={restaurant}
                    coordinates={coordinates}
                  />
                )
              )}
            </div>
          </div>
          <div className="circle-orange-background"></div>
          <div className="circle-green-background"></div>
        </div>
      </section>
    </>
  );
};
