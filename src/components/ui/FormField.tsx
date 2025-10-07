import { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';

interface BaseFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
}

interface InputFieldProps extends BaseFieldProps, InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'date' | 'url';
  fieldType?: 'input';
}

interface TextareaFieldProps extends BaseFieldProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  fieldType: 'textarea';
}

interface SelectFieldProps extends BaseFieldProps, SelectHTMLAttributes<HTMLSelectElement> {
  fieldType: 'select';
  children: ReactNode;
}

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

export default function FormField(props: FormFieldProps) {
  const { label, error, helperText, required, className = '', fieldType = 'input', ...fieldProps } = props;

  const baseInputStyles = `
    w-full px-4 py-3 rounded-lg
    bg-white/90 backdrop-blur-sm
    border-2 border-[#2F7E7E]/30
    focus:border-[#C49A6C] focus:ring-2 focus:ring-[#C49A6C]/20 focus:outline-none
    text-[#1C1F3B] placeholder:text-[#2A2A28]/50
    transition-all duration-200
    disabled:bg-white/40 disabled:cursor-not-allowed
    ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : ''}
  `;

  const labelStyles = 'block text-sm font-medium text-white mb-2 font-montserrat';
  const errorStyles = 'mt-1 text-sm text-red-200 font-lora';
  const helperStyles = 'mt-1 text-sm text-white/70 font-lora';

  const renderField = () => {
    if (fieldType === 'textarea') {
      const { children, ...textareaProps } = fieldProps as TextareaFieldProps;
      return (
        <textarea
          {...textareaProps}
          className={`${baseInputStyles} min-h-[120px] resize-y ${className}`}
        />
      );
    }

    if (fieldType === 'select') {
      const { children, ...selectProps } = fieldProps as SelectFieldProps;
      return (
        <select
          {...selectProps}
          className={`${baseInputStyles} cursor-pointer ${className}`}
        >
          {children}
        </select>
      );
    }

    const inputProps = fieldProps as InputFieldProps;
    return (
      <input
        {...inputProps}
        type={inputProps.type || 'text'}
        className={`${baseInputStyles} ${className}`}
      />
    );
  };

  return (
    <div className="mb-4">
      {label && (
        <label className={labelStyles}>
          {label}
          {required && <span className="text-[#C49A6C] ml-1">*</span>}
        </label>
      )}

      {renderField()}

      {error && <p className={errorStyles}>{error}</p>}
      {helperText && !error && <p className={helperStyles}>{helperText}</p>}
    </div>
  );
}
