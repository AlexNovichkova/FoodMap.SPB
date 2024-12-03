import { Link } from 'react-router-dom';
import { Preloader } from 'src/app/Preloader';
import { selectIsLoading } from 'src/features/slices/restaurantsSlice';
import { useSelector } from 'src/features/store';
import { MainButton } from 'src/shared/ui/MainButton';
import { RestaurantCard } from 'src/widgets/RestaurantCard';

export const MoreSection = () => {
  const restaurants =
    useSelector((state) => state.restaurants.restaurants) || [];
  const isLoading = useSelector(selectIsLoading);
  return (
    <section className="mb-14">
      <div className=" pt-20 mx-5 md:m-auto md:w-[90%] flex flex-col gap-3">
        <div className=" flex flex-col gap-6 justify-between md:gap-0 md:flex-row">
          <h2 className=" flex items-start  text-xl font-bold text-black-600 md:text-2xl lg:text-3xl xl:text-4xl">
            Больше заведений
          </h2>
        </div>
        <div className="flex justify-center items-center mt-8 mb-8">
          <div className="flex flex-wrap gap-8 md:gap-6 m-auto justify-center md:justify-normal ">
            {isLoading ? (
              <Preloader />
            ) : restaurants.length > 0 ? (
              restaurants
                .slice(0, 20)
                .map((restaurant) => (
                  <RestaurantCard
                    id={restaurant.id}
                    key={restaurant.id}
                    rating={restaurant.rating}
                    address={restaurant.address}
                    name={restaurant.name}
                    photo_links={restaurant.photo_links}
                    cuisine_type={restaurant.cuisine_type}
                  />
                ))
            ) : (
              <p className="flex items-center justify-center cursor-pointer gap-5 text-black-500 py-8 text-lg lg:text-xl xl:text-2xl xl:py-10">
                Нет доступных ресторанов
              </p> // Сообщение, если ресторанов нет
            )}
          </div>
        </div>
        <Link className="self-center mt-3 outline-none" to={'/restaurants'}>
          <MainButton className=" " title="Посмотреть все" />
        </Link>
      </div>
    </section>
  );
};
