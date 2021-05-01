import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode,
  type?: 'icon' | 'outline' | 'solid' | 'default',
  color?: 'danger' | 'success' | 'primary',
  size: 'small' | 'normal' | 'huge'
  [key: string]: any
}

export function Button({ children, ...props }: ButtonProps) {

  const { type, color, size, className, ...rest } = props;

  return (
    <button 
      type="button" 
      className={`button ${type ?? 'default'} ${color ?? ''} ${size ?? ''} ${className ?? ''}` } 
      {...rest}
    >
      {children}
    </button>
  );
}