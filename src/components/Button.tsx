import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode,
  type?: 'icon' | 'outline' | 'solid' | 'default',
  color?: 'danger' | 'success' | 'primary',
  size?: 'small' | 'normal' | 'huge'
  htmlType?: 'submit' | 'reset' | 'button',
  [key: string]: any
}

export function Button({ children, type, color, size, className, htmlType, ...rest }: ButtonProps) {

  return (
    <button 
      type={htmlType ?? 'button'} 
      className={`button ${type ?? 'default'} ${color ?? ''} ${size ?? ''} ${className ?? ''}` } 
      {...rest}
    >
      {children}
    </button>
  );
}