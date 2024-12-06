import { InputHTMLAttributes, forwardRef } from 'react';
import { nanoid } from 'nanoid';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
  extClassName?: string;
  error?: boolean;
  errorText?: string;
  onIconClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  extClassNameInput?: string;
  handleEmailChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
      ...props
    },
    ref
  ) => {
    const id = nanoid();

    const inputClass = error
      ? ' outline-accent_orange outline outline-1 py-1 px-2 focus:outline-accent_orange active:outline-accent_orange w-full rounded-[8px] text-base lg:text-lg 2xl:text-xl'
      : 'outline-black-700 outline outline-1 py-1 px-2 rounded-[8px] text-base lg:text-lg 2xl:text-xl focus:outline-accent_green focus:outline-2 active:outline-accent_green';

    return (
      <div className={extClassName} data-testid={'div'}>
        {label && (
          <label
            className={'text-base lg:text-lg 2xl:text-xl text-black-700'}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <div className={''}>
          <input
            data-testid={'input'}
            ref={ref}
            type={type}
            name={name}
            className={
              className +
              '  outline-black-700 outline outline-1 py-1 px-2 rounded-[8px] text-base lg:text-lg 2xl:text-xl focus:outline-accent_green focus:outline-2 active:outline-accent_green'
            }
            onChange={onChange}
            placeholder={placeholder}
            id={id}
            {...props}
          />
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
