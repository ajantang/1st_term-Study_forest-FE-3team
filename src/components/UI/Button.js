export function Button({ onClick, children, className }) {
  const onButtonClick = () => onClick();

  return (
    <button onClick={onButtonClick} className={className}>
      {children}
    </button>
  );
}

export default Button;
<<<<<<< HEAD
=======

>>>>>>> develop
