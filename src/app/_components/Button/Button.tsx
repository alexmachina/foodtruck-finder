/**
 * Since the button is a wrapper over the native html button element,
 * It's ready to properly receive native button attributes as props.
 * This is just a good practice that I decided to follow,
 * given the scope of the application, we could have skipped it.
 */

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <button {...props} className={`btn btn-primary ${className}`}>
      {children}
    </button>
  );
};

export default Button;
