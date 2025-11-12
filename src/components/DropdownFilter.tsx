interface DropdownFilterProps {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function DropdownFilter({
  label,
  options,
  value,
  onChange,
}: DropdownFilterProps) {
  return (
    <div className="flex flex-col">
      {label && <label className="text-sm text-gray-300 mb-1">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border border-gray-600 rounded-lg 
                   bg-gray-800 text-white 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
