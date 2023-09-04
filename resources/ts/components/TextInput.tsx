import { InputHTMLAttributes, useEffect, useRef } from 'react';
import InputError from './InputError';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  id?: string;
  isFocused?: boolean;
  errorMessage?: string;
}
function TextInput({
  label,
  className = '',
  id,
  isFocused,
  errorMessage,
  ...props
}: TextInputProps) {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused && input.current) {
      input.current.focus();
    }
  }, []);

  return (
    <div className="mb-4.5">
      {label && (
        <label htmlFor={id} className="mb-2.5 block text-black dark:text-white">
          {label}
        </label>
      )}
      <input
        ref={input}
        className={`w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${className}`}
        autoComplete="on"
        {...props}
      />
      <InputError message={errorMessage} className="mt-2" />
    </div>
  );
}

export default TextInput;
