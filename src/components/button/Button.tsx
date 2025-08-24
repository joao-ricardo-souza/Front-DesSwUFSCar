import React from 'react';

import './Button.css';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...remainingProps
}) => {
  return <button className={`${className} button`} {...remainingProps}>{children}</button>
};