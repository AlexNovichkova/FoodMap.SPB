import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { nanoid } from 'nanoid';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
  extClassName?: string;
  error?: boolean;
  errorText?: string;
  extClassNameInput?: string;
  handleEmailChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tooltip?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      name,
      onChange,
      label,
      extClassName,
      extClassNameInput,
      placeholder,
      error,
      errorText,
      className,
      tooltip,
      ...props
    },
    ref
  ) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const id = nanoid();

    const inputClass = error
      ? ' w-full outline-accent_orange outline outline-1 py-1 px-2 focus:outline-accent_orange active:outline-accent_orange w-full rounded-[8px] text-base lg:text-lg 2xl:text-xl 3xl:text-2xl'
      : ' w-full outline-black-700 outline outline-1 py-1 px-2 rounded-[8px] text-base lg:text-lg 2xl:text-xl 3xl:text-2xl focus:outline-accent_green focus:outline-2 active:outline-accent_green';

    return (
      <div className={extClassName} data-testid={'div'}>
        {label && (
          <label
            className={
              'text-base lg:text-lg 2xl:text-xl 3xl:text-2xl text-black-700'
            }
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <div className={` relative`}>
          <input
            data-testid={'input'}
            ref={ref}
            type={type}
            name={name}
            className={className + inputClass}
            onChange={onChange}
            placeholder={placeholder}
            id={id}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            {...props}
          />
          {tooltip && showTooltip && (
            <div className="absolute top-12 left-0 w-auto max-w-sm p-2 bg-black-200 text-accent_orange text-sm rounded shadow-md z-10 lg:max-w-lg lg:text-base 2xl:text-lg 3xl:text-xl">
              {tooltip}
            </div>
          )}
          <span
            className={
              'text-sm lg:text-base xl:text-lg 2xl:text-xl text-orange-400'
            }
          >
            {errorText === ' ' ? <span>&nbsp;</span> : errorText}
          </span>
        </div>
      </div>
    );
  }
);
