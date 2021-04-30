export function Button({ children, ...props }) {

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