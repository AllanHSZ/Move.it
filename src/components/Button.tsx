export function Button({ children, ...props }) {

  const { type, color, size, className, ...rest } = props;

  return (
    <button type="button" className={`${type ?? ''} ${color ?? ''} ${size ?? ''} ${className ?? ''}`} {...rest}>
      {children}
    </button>
  );
}