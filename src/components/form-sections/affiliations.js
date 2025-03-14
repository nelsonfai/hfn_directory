import React from 'react';
import { useFormContext } from 'react-hook-form';

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


const Affiliations = () => {
  const { register, watch, formState: { errors }, setValue } = useFormContext();
  
  const memberOfAssociations = watch('memberOfAssociations');
  const collaboratesWithGovOrg = watch('collaboratesWithGovOrg');

  return (
    <div className="space-y-10">
      <div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Are you a member of any other healthcare associations or professional bodies? <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-8 mt-2">
            <CustomRadio
              id="memberYes"
              name="memberOfAssociations"
              value="true"
              register={register}
              watch={watch}
              errors={errors}
              label="Yes"
            />
            <CustomRadio
              id="memberNo"
              name="memberOfAssociations"
              value="false"
              register={register}
              watch={watch}
              errors={errors}
              label="No"
            />
          </div>
          {errors.memberOfAssociations && (
            <p className="mt-1 text-sm text-red-600">{errors.memberOfAssociations.message}</p>
          )}
        </div>

        {memberOfAssociations === "true" && (
          <div className="border-l-4 border-[#fb8c01] pl-4 py-2 mb-8 transition-all duration-300 ease-in space-y-6">
            <div>
              <label htmlFor="associations" className="block text-sm font-medium text-gray-700 mb-2">
                Name of Association(s) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="associations"
                placeholder="e.g., American Medical Association"
                className={`w-full px-4 py-2 border ${errors.associations ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
                {...register('associations', { 
                  required: memberOfAssociations === "true" ? 'Please specify the associations' : false
                })}
              />
              {errors.associations && (
                <p className="mt-1 text-sm text-red-600">{errors.associations.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="membershipNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Membership Number (if applicable)
              </label>
              <input
                type="text"
                id="membershipNumber"
                placeholder="e.g., AMA-12345"
                className={`w-full px-4 py-2 border ${errors.membershipNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
                {...register('membershipNumber')}
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 pb-3 border-b border-gray-200 mb-6">
          Partnerships & Collaborations
        </h3>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Do you collaborate with government or international health organizations? <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-8 mt-2">
            <CustomRadio
              id="collaborateYes"
              name="collaboratesWithGovOrg"
              value="true"
              register={register}
              watch={watch}
              errors={errors}
              label="Yes"
            />
            <CustomRadio
              id="collaborateNo"
              name="collaboratesWithGovOrg"
              value="false"
              register={register}
              watch={watch}
              errors={errors}
              label="No"
            />
          </div>
          {errors.collaboratesWithGovOrg && (
            <p className="mt-1 text-sm text-red-600">{errors.collaboratesWithGovOrg.message}</p>
          )}
        </div>

        {collaboratesWithGovOrg === "true" && (
          <div className="border-l-4 border-[#fb8c01] pl-4 py-2 transition-all duration-300 ease-in">
            <label htmlFor="governmentCollaborations" className="block text-sm font-medium text-gray-700 mb-2">
              Please specify your collaborations <span className="text-red-500">*</span>
            </label>
            <textarea
              id="governmentCollaborations"
              placeholder="e.g., World Health Organisation, Ministry of Health"
              rows="3"
              className={`w-full px-4 py-2 border ${errors.governmentCollaborations ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
              {...register('governmentCollaborations', { 
                required: collaboratesWithGovOrg === "true" ? 'Please specify your collaborations' : false
              })}
            />
            {errors.governmentCollaborations && (
              <p className="mt-1 text-sm text-red-600">{errors.governmentCollaborations.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Affiliations;