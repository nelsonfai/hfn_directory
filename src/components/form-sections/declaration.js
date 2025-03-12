import React from 'react';
import { useFormContext } from 'react-hook-form';
import CustomCheckbox from '../ui/CustomCheckbox'; // Ensure the path is correct

const Declaration = () => {
  const { register, watch, formState: { errors }, setValue } = useFormContext();

  const consentGiven = watch('consentGiven');
  const fullName = watch('fullName');
  const date = watch('date');

  const handleConsentChange = () => {
    setValue("consentGiven", !consentGiven);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-orange-50 border-l-4 border-[#fb8c01] p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-[#fb8c01]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-orange-700">
              Please review all information before submitting. By signing below, you confirm that all provided information is accurate.
            </p>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "Full name is required",
            minLength: {
              value: 3,
              message: "Full name must be at least 3 characters"
            }
          })}
          className={`w-full px-4 py-2 border ${
            errors.fullName? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb8c01] focus:border-[#fb8c01] transition-colors`}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <input
          type="date"
          id="date"
          {...register("date", {
            required: "Date is required"
          })}
          className={`w-full px-4 py-2 border ${
            errors.date ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb8c01] focus:border-[#fb8c01] transition-colors`}
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-600">
            {errors.date.message}
          </p>
        )}
      </div>

      <div className="mt-4">
        <CustomCheckbox
          id="consentGiven"
          name="consentGiven"
          value="consentGiven"
          register={register}
          watch={watch}
          errors={errors}
          label="I confirm that the information provided above is accurate and I consent to the inclusion of my organization in the HFN Directory."
          onChange={handleConsentChange}
        />
        {errors.consentGiven && (
          <p className="mt-1 text-sm text-red-600">
            {errors.consentGiven.message}
          </p>
        )}
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-[#5fb775]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-700">
              By submitting this form, you are completing the final step to join the HFN Directory. Your information will be reviewed by our team before being published.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Declaration;
