import React from 'react';
import { ClipLoader } from 'react-spinners';

const Button = ({
  label,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
}) => {
  const isPrimary = variant === 'primary';

  const baseStyles = `px-4 h-[40px] ${loading ? "py-3" : "py-1"} min-w-[80px] rounded-md font-light text-md inline-flex items-center justify-center gap-2 transition-all duration-200`;
  const primaryStyles = 'bg-black text-white border border-transparent hover:opacity-90';
  const secondaryStyles = 'bg-white text-black border border-gray-300 hover:bg-gray-100';
  const disabledStyles = 'opacity-50 cursor-not-allowed';
  const activeStyles = isPrimary ? primaryStyles : secondaryStyles;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${activeStyles}
        ${(disabled || loading) ? disabledStyles : 'cursor-pointer'}
      `}
    >
      {loading ? <ClipLoader size={18} color={isPrimary ? '#fff' : '#000'} /> : label}
    </button>
  );
};

export default Button;
