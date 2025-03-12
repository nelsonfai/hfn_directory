// components/form-sections/AdditionalInfo.js
import React from 'react';
import { useFormContext } from 'react-hook-form';

const AdditionalInfo = () => {
  const { register, watch, formState: { errors } } = useFormContext();

  const additionalInfo = watch('additionalInfo');

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
          Any additional information you would like to share?
        </label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          {...register("additionalInfo", {
            maxLength: {
              value: 500,
              message: "Additional information cannot exceed 500 characters"
            }
          })}
          rows="6"
          className={`w-full px-4 py-2 border ${errors.additionalInfo ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}

          placeholder="Please share any other relevant information about your organization that would be helpful for the HFN directory."
        />
        {errors.additionalInfo && (
          <p className="mt-1 text-sm text-red-600">
            {errors.additionalInfo.message}
          </p>
        )}
        <p className="mt-2 text-sm text-gray-500">
          {additionalInfo ? additionalInfo.length : 0}/500 characters
        </p>
      </div>


    </div>
  );
};

export default AdditionalInfo;
