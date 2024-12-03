import { useSelector } from 'src/features/store';
import { RestaurantsContainer } from 'src/widgets/RestaurantsContainer';

export const HighRateSection = () => {
  const restaurants = useSelector((state) => state.restaurants.restaurants);
  return (
    <section className=" ">
      <div className=" pt-20 mx-5 md:m-auto md:w-[90%]">
        <div className=" flex flex-col gap-6 justify-between md:gap-0 md:flex-row">
          <h2 className=" flex items-start  text-xl font-bold text-black-600 md:text-2xl lg:text-3xl xl:text-4xl">
            Заведения с высоким рейтингом
          </h2>
        </div>
        <RestaurantsContainer
          restaurants={restaurants}
          shouldFilterByRating={true}
        />
      </div>
    </section>
  );
};
