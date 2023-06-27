import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-blue-400 rounded-md px-6 py-2 text-white"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;