export const NotFound404 = () => {
  const text = '404';
  return (
    <div className="min-h-28 flex items-center justify-center text-black-600 gap-2 text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl ">
      Not Found
      <span>
        {text.split('').map((char, index) => (
          <span
            key={index}
            style={{ color: index % 2 === 0 ? 'green' : 'orange' }}
          >
            {char}
          </span>
        ))}
      </span>
    </div>
  );
};
