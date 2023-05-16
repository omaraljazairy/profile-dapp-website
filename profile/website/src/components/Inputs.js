const Input = ({ placeholder, name, type, handleChange, value }) => (
    <input 
      placeholder={placeholder}
      name={name} 
      type={type} 
      onChange={(event) => handleChange(event.target.value, name)}
      step="0.0001"
      value={value}
      className="w-full p-2 my-2 text-sm text-blue-600 bg-transparent rounded-sm outline-none white-glassmorphism"
      />
);

export default Input;