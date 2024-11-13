import { InputHTMLAttributes, forwardRef } from 'react';
import { nanoid } from 'nanoid';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  extClassName?: string;
  error?: boolean;
  errorText?: string;
  customIcon?: React.ReactNode;
  onIconClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  extClassNameInput?: string;
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
      onIconClick,
      ...props
    },
    ref
  ) => {
    const id = nanoid();

    const inputClass = error
      ? 'input_error'
      : extClassNameInput
        ? extClassNameInput
        : 'input';

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
            className={'text' + inputClass}
            onChange={onChange}
            placeholder={placeholder}
            id={id}
            {...props}
          />
          <span className={'error text'}>
            {errorText === ' ' ? <span>&nbsp;</span> : errorText}
          </span>
        </div>
      </div>
    );
  }
);
