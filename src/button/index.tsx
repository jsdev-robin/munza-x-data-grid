import type { ReactNode } from 'react';
import '../index.css';

interface ButtonProps {
  className?: string;
  children?: ReactNode;
}

const Button = ({ className, children }: ButtonProps) => {
  return <button className={className}>{children}</button>;
};

export { Button };
