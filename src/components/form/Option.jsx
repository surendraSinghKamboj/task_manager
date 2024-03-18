import React from "react";

const Option = ({ name, options, onChange }) => {
  return (
    <select
      onChange={onChange}
      name={name}
      className="w-96 mb-2 border-2 border-gray-300 rounded-md h-9 px-2 focus:outline-none"
    >
      {options &&
        options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
    </select>
  );
};

export default Option;
