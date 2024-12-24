import React from 'react';

interface CheckboxProps {
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  isChecked,
  onChange,
}) => {
  return (
    <label
      className={`group transition-all relative flex cursor-pointer items-center justify-center gap-[6px] lowercase text-base lg:text-lg xl:text-xl 2xl:text-2xl ${
        isChecked
          ? 'text-accent_orange hover:text-black-700'
          : 'text-black-500 hover:text-accent_orange'
      }`}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="peer appearance-none cursor-pointer"
      />
      <span className="absolute left-0 top-1/2  size-[13px] xl:size-[15px] 2xl:size-[17px] -translate-x-full -translate-y-1/2 rounded-[0.25em] border-[2px]  hover:border-accent_orange "></span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={76}
        height={86}
        fill="none"
        viewBox="0 0 76 86"
        className="absolute left-0 top-1/2 size-[13px] xl:size-[15px] 2xl:size-[17px]  -translate-x-full -translate-y-1/2 duration-500 ease-out [stroke-dasharray:100] [stroke-dashoffset:100] peer-checked:[stroke-dashoffset:0]"
      >
        <path
          className={` group-hover:text-black-700 text-accent_orange transition-colors ${
            isChecked
              ? 'text-accent_orange hover:text-black-700'
              : 'text-black-500 hover:text-accent_orange'
          }`}
          stroke="currentColor"
          pathLength={100}
          strokeWidth="4px"
          d="M65.988 12.645c-4.136-3.922-9.554-6.9-15.047-8.398C45.855 2.86 38.462-.12 33.096 1.797 26.002 4.331 20.525 11.961 15.6 17.193 2.02 31.623-6.386 59.79 12.101 74.58c8.711 6.97 18.19 9.184 29.043 9.798 24.117 1.365 28.693-3.588 32.542-27.643.772-4.83 3.15-16.094.7-20.995-4.678-9.354-22.35-11.08-31.143-7.698-9.911 3.812-18.558 14.775-20.295 25.193-1.45 8.707 5.447 10.548 12.947 10.848 6.772.27 10.148 1.421 10.148-5.949 0-5.412.09-7.166-2.1-11.547"
        />
      </svg>
      <span className="text-[1em]  [user-select:none]">{label}</span>
    </label>
  );
};
