export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-quickdeliva text-white font-clash px-4 py-2 rounded-lg 
                  hover:bg-quickdeliva-dark active:scale-95 transition
                  disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}