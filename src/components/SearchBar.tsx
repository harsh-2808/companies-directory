interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
}: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full sm:w-64 px-3 py-2 border border-gray-600 rounded-lg 
                 bg-gray-800 text-white placeholder-gray-400 
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
