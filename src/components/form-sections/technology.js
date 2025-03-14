import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import CustomRadio from '../ui/CustomRadio';
const Technology = () => {
  const { register, control, watch, formState: { errors } } = useFormContext();

  const usesDigitalSolutions = watch('usesDigitalSolutions');
  const interestedInDigitalCollaboration = watch('interestedInDigitalCollaboration');

  return (
    <div className="space-y-6 animate-fadeIn">

        <div>
          <p className="text-sm text-gray-700"><span className="font-bold"> Note:</span>Providing this information is optional and intended solely for the purpose of facilitating potential collaborations and matching within the HFN network</p>
        </div>
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Does your organisation use any digital health solutions? (optional)
        </label>
        <div className="flex space-x-8 mt-2">
          <CustomRadio
            id="usesDigitalSolutionsYes"
            name="usesDigitalSolutions"
            value="true"
            register={register}
            watch={watch}
            errors={errors}
            label="Yes"
          />
          <CustomRadio
            id="usesDigitalSolutionsNo"
            name="usesDigitalSolutions"
            value="false"
            register={register}
            watch={watch}
            errors={errors}
            label="No"
          />
        </div>
        {errors.usesDigitalSolutions && (
          <p className="mt-1 text-sm text-red-600">{errors.usesDigitalSolutions.message}</p>
        )}
      </div>

      {usesDigitalSolutions === "true" && (
        <div className="border-l-4 border-[#fb8c01] pl-4 py-2 mb-8 transition-all duration-300 ease-in">
          <label htmlFor="digitalSolutionsTypes" className="block text-sm font-medium text-gray-700 mb-2">
            Please specify the type (e.g., telemedicine, electronic medical records, AI diagnostics, etc.) <span className="text-red-500">*</span>
          </label>
          <Controller
            name="digitalSolutionsTypes"
            control={control}
            rules={{ required: usesDigitalSolutions === "true" ? "Please specify the digital solutions used" : false }}
            render={({ field }) => (
              <>
                <textarea
                  id="digitalSolutionsTypes"
                  {...field}
                  rows="3"
                  className={`w-full px-4 py-2 border ${errors.digitalSolutionsTypes ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb8c01] focus:border-transparent`}
                />
                {errors.digitalSolutionsTypes && (
                  <p className="mt-1 text-sm text-red-600">{errors.digitalSolutionsTypes.message}</p>
                )}
              </>
            )}
          />
        </div>
      )}

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Would your organisation be interested in digital health collaboration or innovations? (optional)
        </label>
        <div className="flex space-x-8 mt-2">
          <CustomRadio
            id="interestedInDigitalCollaborationYes"
            name="interestedInDigitalCollaboration"
            value="true"
            register={register}
            watch={watch}
            errors={errors}
            label="Yes"
          />
          <CustomRadio
            id="interestedInDigitalCollaborationNo"
            name="interestedInDigitalCollaboration"
            value="false"
            register={register}
            watch={watch}
            errors={errors}
            label="No"
          />
        </div>
        {errors.interestedInDigitalCollaboration && (
          <p className="mt-1 text-sm text-red-600">{errors.interestedInDigitalCollaboration.message}</p>
        )}
      </div>
    </div>
  );
};

export default Technology;