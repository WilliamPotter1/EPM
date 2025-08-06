import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
}) => {
  const baseClasses = 'button';
  const variantClasses = {
    primary: 'button--primary',
    secondary: 'button--secondary',
  };
  const sizeClasses = {
    small: 'button--small',
    medium: 'button--medium',
    large: 'button--large',
  };

  const className = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled ? 'button--disabled' : '',
  ].join(' ');

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button; 