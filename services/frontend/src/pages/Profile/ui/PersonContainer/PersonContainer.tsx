import { FC, useState } from 'react';
import { TUser } from 'src/entities/projects/models/types';
import { MainButton } from 'src/shared/ui/MainButton';
import { Modal } from 'src/widgets/Modal/Modal';

export const PersonContainer: FC<TUser> = ({ name, email, image }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleEditDataClick = () => {
    const element = document.getElementById('change-user-info');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleImageClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <div className=" rounded-[8px] shadow self-center flex items-center flex-col gap-5 py-6 px-5 md:py-8 md:px-7">
      <div
        id="user-img"
        className="size-48 md:size-64 lg:size-72 xl:size-80 2xl:size-96 rounded-full flex justify-center items-center overflow-hidden bg_profile_img cursor-pointer"
      >
        <div className="size-[96%] rounded-full flex justify-center overflow-hidden items-center">
          <img
            className="min-h-full object-cover object-center"
            onClick={handleImageClick}
            /*src='https://i.pinimg.com/736x/72/7b/d2/727bd2b7be9569cd4a920fb061579cef.jpg'*/
            src={image}
          />
          {isModalOpen && (
            <Modal onClose={handleCloseModal} title="Аватар">
              <img
                className="max-w-80 xl:max-w-xl w-[90%] min-h-full object-cover object-center pt-4"
                /*src='https://i.pinimg.com/736x/72/7b/d2/727bd2b7be9569cd4a920fb061579cef.jpg'*/
                src={image}
              />
            </Modal>
          )}
        </div>
      </div>
      <div className=" max-w-64 md:max-w-80 lg:max-w-[600px]" id="user-name">
        <span className="text-lg font-medium text-black-600  md:text-xl lg:text-2xl xl:text-3xl break-words">
          {name}
        </span>
      </div>
      <div className="max-w-64 md:max-w-80 lg:max-w-[600px]" id="user-email">
        <span className="text-base font-medium text-black-600  md:text-lg lg:text-xl xl:text-2xl break-words">
          {email}
        </span>
      </div>
      <div className="w-full mt-3">
        <MainButton
          onClick={handleEditDataClick}
          title="Изменить данные"
          className="w-full "
        />
      </div>
    </div>
  );
};
