export function Button({ children, className = "", variant = "default", ...props }) {
    const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors"
  
    const variants = {
      default: "bg-black text-white hover:bg-gray-800",
      outline: "border border-gray-200 hover:bg-gray-50",
      ghost: "hover:bg-gray-100",
    }
  
    const classes = `${baseStyles} ${variants[variant]} ${className}`
  
    return (
      <button className={classes} {...props}>
        {children}
      </button>
    )
  }
  
  