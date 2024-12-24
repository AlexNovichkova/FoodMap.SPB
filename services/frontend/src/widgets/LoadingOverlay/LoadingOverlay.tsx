interface LoadingOverlayProps {
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = 'Пожалуйста, подождите',
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white py-4 px-8 rounded-md shadow-lg flex items-center gap-2">
        <p className="text-sm md:text-base lg:text-lg 2xl:text-xl  text-accent_green font-semibold">
          {message}
        </p>
        <div className="flex gap-1 pt-2">
          <span className="block size-1 2xl:size-2  bg-accent_green rounded-full animate-customBounce delay animation-delay-[0ms]"></span>
          <span className="block size-1 2xl:size-2 bg-accent_green rounded-full animate-customBounce animation-delay-[200ms]"></span>
          <span className="block size-1 2xl:size-2 bg-accent_green rounded-full animate-customBounce animation-delay-[400ms]"></span>
        </div>
      </div>
    </div>
  );
};
