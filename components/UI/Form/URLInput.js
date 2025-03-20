export default function URLInput({
  value,
  onChange,
  isReadOnly,
  placeholder,
  name,
}) {
  return (
    <input
      type="url"
      required
      value={value}
      readOnly={isReadOnly}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      className="w-full p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  );
}
