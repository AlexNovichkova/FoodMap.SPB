import { useState } from 'react';

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validate: (name: keyof T, value: T[keyof T]) => string
) => {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string>>(
    {} as Record<keyof T, string>
  );
  const [generalError, setGeneralError] = useState('');

  const file2Base64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString() || '');
      reader.onerror = (error) => reject(error);
    });
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (files?.[0]) {
      try {
        const base64 = await file2Base64(files[0]);
        setFormData((prev) => ({ ...prev, [name]: base64 }));
      } catch (error) {
        console.error('Ошибка при преобразовании файла в Base64:', error);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({
        ...prev,
        [name]: validate(name as keyof T, value as T[keyof T]),
      }));
    }
    setGeneralError('');
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: validate(name as keyof T, value as T[keyof T]),
    }));
  };

  const handleSubmit = (onSubmit: () => void) => {
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      const error = validate(key as keyof T, formData[key as keyof T]);
      return { ...acc, [key]: error };
    }, {} as Record<keyof T, string>);

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
    } else {
      onSubmit();
    }
  };

  return {
    formData,
    errors,
    generalError,
    setGeneralError,
    handleInputChange,
    handleBlur,
    handleSubmit,
    setFormData,
  };
};
