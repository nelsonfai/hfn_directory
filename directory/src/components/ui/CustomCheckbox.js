import React from 'react';

const CustomCheckbox = ({ id, name, value, register, watch, errors, label, onChange }) => {
  const watchedValue = watch(name);
  
  // Check if the watched value is an array (for multiple checkboxes)
  // or a boolean (for single checkbox)
  const isChecked = Array.isArray(watchedValue) 
    ? watchedValue.includes(value)
    : watchedValue === true;

  return (
    <div className="flex items-center">
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          className="sr-only"
          {...register(name, {
            validate: value => {
              // Skip validation for boolean values (single checkboxes)
              if (typeof watchedValue === 'boolean') return true;
              // Apply validation for arrays (multiple checkboxes)
              return (value && value.length > 0) || 'Please select at least one option';
            }
          })}
          value={value}
          onChange={onChange}
          checked={isChecked}
        />
        <div
          className={`w-5 h-5 rounded border ${
            isChecked
              ? 'border-[#5fb775]'
              : errors[name] ? 'border-red-500' : 'border-gray-300'
          } flex items-center justify-center cursor-pointer`}
          onClick={onChange}
        >
          {isChecked && (
            <div className="w-3 h-3 rounded bg-[#5fb775]"></div>
          )}
        </div>
      </div>
      <label
        htmlFor={id}
        className="ml-2 block text-sm text-gray-700 cursor-pointer"
        onClick={onChange}
      >
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;