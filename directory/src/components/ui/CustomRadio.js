import React from 'react';

const CustomRadio = ({ id, name, value, register, watch, errors, label }) => {
  const watchedValue = watch(name);
  const isChecked = watchedValue === value;

  return (
    <div className="flex items-center">
      <div className="relative">
        <input
          type="radio"
          id={id}
          value={value}
          className="sr-only"
          {...register(name)}
        />
        <div
          className={`w-5 h-5 rounded-full border ${
            isChecked
              ? 'border-[#5fb775]'
              : errors[name] ? 'border-red-500' : 'border-gray-300'
          } flex items-center justify-center cursor-pointer`}
        >
          {isChecked && (
            <div className="w-3 h-3 rounded-full bg-[#5fb775]"></div>
          )}
        </div>
      </div>
      <label htmlFor={id} className="ml-2 block text-sm text-gray-700 cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default CustomRadio;
