const StyledButton = ({
  onClick,
  name,
  className,
  variant = "primary",
  type,
  disabled,
}) => {
  const variants = {
    primary: "bg-green-600 hover:bg-green-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    delete: "bg-red-600 hover:bg-red-700 text-white",
    tertiary: "bg-transparent text-black hover:bg-gray-100",
    download:"text-gray-600 hover:text-gray-800 border border-gray-300 hover:bg-gray-50"
  };

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`px-4 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
        variants[variant] || variants.primary
      } ${className}`}
    >
      {name}
    </button>
  );
};

export default StyledButton;
