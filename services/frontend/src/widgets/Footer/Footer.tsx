import { QuestionIcon } from './ui/QuestionIcon';
import { GitIcon } from './ui/GitIcon';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer
      className={` text-white flex flex-col  items-center bg-black-700 pt-4 pb-8 lg:pb-12 xl:pb-16  lg:h-screen lg:max-h-[65vw] justify-around`}
    >
      <div
        className={` w-[90%] flex flex-col gap-7 justify-center mb-4 sm:mb-6 lg:mb-4 xl:mb-0 border-black-500 border-2 border-r-0 border-l-0 py-6`}
      >
        <div className=" bg-accent_orange px-2 py-2 rounded-[8px] w-fit">
          <h4 className={` font-bold leading-[1.1]`}>Cвязаться:</h4>
        </div>
        <h4 className=" ">Email: lubluguap@gmail.com</h4>
      </div>
      <div className={` flex w-[90%] justify-between items-center lg:text-xl `}>
        <div className=" flex gap-8 font-light">
          <h4>©2024 FoodMap.SPB</h4>
          <h4>Политика обработки данных</h4>
        </div>
        <div className=" flex gap-4">
          <button
            className={
              ' flex justify-center items-center size-4 md:size-6 lg:size-8'
            }
          >
            <QuestionIcon className=" hover:ac" />
          </button>
          <button
            className={
              ' flex justify-center items-center size-4 md:size-6 lg:size-8'
            }
          >
            <Link
              className=" outline-none"
              to={'https://github.com/AlexNovichkova/FoodMap.SPB'}
            >
              <GitIcon className={' hover:text-accent'} />
            </Link>
          </button>
        </div>
      </div>
    </footer>
  );
};
