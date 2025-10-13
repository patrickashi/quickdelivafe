export default function Input({ label, type = "text", ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      <input
        type={type}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 
                   focus:outline-none focus:ring-2 focus:ring-quickdeliva 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        {...props}
      />
    </div>
  );
}