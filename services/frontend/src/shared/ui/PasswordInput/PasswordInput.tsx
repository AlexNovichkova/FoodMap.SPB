import { ChangeEvent, forwardRef, InputHTMLAttributes, useState } from 'react';

import { Input } from '../Input/Input';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  extClassName?: string;
  error?: boolean;
  errorText?: string;
}

// eslint-disable-next-line react/display-name
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      error,
      errorText,
      value,
      label = 'Пароль',
      name,
      onChange,
      extClassName,
      placeholder = 'Введите пароль',
      ...props
    },
    ref
  ) => {
    const [visible, setVisibility] = useState(false);

    const handleIconClick = () => {
      setVisibility((state) => !state);
    };

    return (
      <Input
        ref={ref}
        {...props}
        type={visible ? 'text' : 'password'}
        label={label}
        name={name as string}
        onChange={onChange}
        placeholder={placeholder}
        extClassName={extClassName}
        onIconClick={handleIconClick}
        error={error}
        errorText={errorText}
      />
    );
  }
);
