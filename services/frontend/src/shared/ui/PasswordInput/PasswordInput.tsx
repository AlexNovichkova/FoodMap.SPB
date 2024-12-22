import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';

import { Input } from '../Input/Input';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  extClassName?: string;
  error?: boolean;
  errorText?: string;
  handlePasswordChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tooltip?: string;
}

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
      tooltip,
      ...props
    },
    ref
  ) => {
    return (
      <Input
        ref={ref}
        {...props}
        label={label}
        name={name as string}
        onChange={onChange}
        placeholder={placeholder}
        extClassName={extClassName}
        error={error}
        errorText={errorText}
        tooltip={tooltip}
      />
    );
  }
);
