import React from 'react';
import { useFormContext } from 'react-hook-form';

const ServicesSpecialization = () => {
  const { register, watch, formState: { errors }, setValue, getValues } = useFormContext();
  
  const specializationTypes = [
    { value: 'primary-healthcare', label: 'Primary Healthcare' },
    { value: 'secondary-healthcare', label: 'Secondary Healthcare' },
    { value: 'tertiary-healthcare', label: 'Tertiary Healthcare' },
    { value: 'pharmaceuticals', label: 'Pharmaceuticals Manufacturing & Distribution' },
    { value: 'medical-equipment', label: 'Medical Equipment & Devices' },
    { value: 'health-insurance', label: 'Health Insurance & Financing' },
    { value: 'digital-health', label: 'Health Technology & Digital Health Solutions' },
    { value: 'staffing-and-hr', label: 'Medical/Nursing Staffing & Human Resources' },
    { value: 'medical-laboratory', label: 'Medical Laboratory & Diagnostics' },
    { value: 'public-health', label: 'Public Health & Advocacy' },
    { value: 'capacity-building', label: 'Capacity Building & Training' },
    { value: 'research', label: 'Research & Development' },
    { value: 'policy-regulation', label: 'Policy & Regulation' },
    { value: 'other', label: 'Others' }
];




  const watchedSpecialization = watch('specialization');

  const handleSpecializationChange = (typeValue) => {
    const currentTypes = getValues('specialization') || [];
    const isSelected = currentTypes.includes(typeValue);
    
    let updatedTypes;
    if (isSelected) {
      updatedTypes = currentTypes.filter(type => type !== typeValue);
    } else {
      updatedTypes = [...currentTypes, typeValue];
    }
    
    setValue('specialization', updatedTypes, { shouldValidate: true });
  };

  const handleCustomsAssistanceChange = (value) => {
    setValue('requiresCustomsAssistance', value, { shouldValidate: true });
  };

  return (
    <div className="space-y-10">
      <div>
        <div className="space-y-6">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Brief Description of Organisation/Services Offered (100 words max) <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows="4"
              className={`w-full px-4 py-2 border ${errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
              maxLength="500"
              {...register('description', { 
                required: 'Description is required',
                maxLength: {
                  value: 500,
                  message: 'Description cannot exceed 500 characters'
                }
              })}
            />
            <p className="text-sm text-gray-500 mt-1">
              {watch('description')?.length || 0}/500 characters
            </p>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Areas of Specialization (Select all that apply) <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {specializationTypes.map((type) => (
                <div key={type.value} className="flex items-center">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id={`specialization-${type.value}`}
                      className="sr-only"
                      {...register('specialization', {
                        validate: (value) => (value && value.length > 0) || 'Please select at least one specialization'
                      })}
                      value={type.value}
                      onChange={() => handleSpecializationChange(type.value)}
                      checked={watchedSpecialization && watchedSpecialization.includes(type.value)}
                    />
                    <div 
                      className={`w-5 h-5 rounded border ${
                        watchedSpecialization && watchedSpecialization.includes(type.value) 
                          ? 'border-[#5fb775]' 
                          : errors.specialization ? 'border-red-500' : 'border-gray-300'
                      } flex items-center justify-center cursor-pointer`}
                      onClick={() => handleSpecializationChange(type.value)}
                    >
                      {watchedSpecialization && watchedSpecialization.includes(type.value) && (
                        <div className="w-3 h-3 rounded bg-[#5fb775]"></div>
                      )}
                    </div>
                  </div>
                  <label 
                    htmlFor={`specialization-${type.value}`} 
                    className="ml-2 block text-sm text-gray-700 cursor-pointer"
                    onClick={() => handleSpecializationChange(type.value)}
                  >
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
            {errors.specialization && (
              <p className="mt-1 text-sm text-red-600">{errors.specialization.message}</p>
            )}
            
            {/* Medical Equipment & Supplies - Customs Assistance Question */}
            {watchedSpecialization && watchedSpecialization.includes('medical-equipment') && (
              <div className="border-l-4 border-[#fb8c01] pl-4 py-2 mt-4 transition-all duration-300 ease-in">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you require assistance with customs to clear your equipment and supplies? <span className="text-red-500">*</span>
                </label>
                <div className="flex items-start space-x-6">
                  <div className="flex items-center">
                    <div className="relative">
                      <input
                        type="radio"
                        id="customs-assistance-yes"
                        value="yes"
                        className="sr-only"
                        {...register('requiresCustomsAssistance', {
                          required: watchedSpecialization && watchedSpecialization.includes('medical-equipment') ?
                            'Please select yes or no' : false
                        })}
                      />
                      <div 
                        className={`w-5 h-5 rounded-full border ${
                          watch('requiresCustomsAssistance') === 'yes' 
                            ? 'border-[#5fb775]' 
                            : errors.requiresCustomsAssistance ? 'border-red-500' : 'border-gray-300'
                        } flex items-center justify-center cursor-pointer`}
                        onClick={() => handleCustomsAssistanceChange('yes')}
                      >
                        {watch('requiresCustomsAssistance') === 'yes' && (
                          <div className="w-3 h-3 rounded-full bg-[#5fb775]"></div>
                        )}
                      </div>
                    </div>
                    <label 
                      htmlFor="customs-assistance-yes" 
                      className="ml-2 block text-sm text-gray-700 cursor-pointer"
                      onClick={() => handleCustomsAssistanceChange('yes')}
                    >
                      Yes
                    </label>
                  </div>

                  <div className="flex items-center">
                    <div className="relative">
                      <input
                        type="radio"
                        id="customs-assistance-no"
                        value="no"
                        className="sr-only"
                        {...register('requiresCustomsAssistance', {
                          required: watchedSpecialization && watchedSpecialization.includes('medical-equipment') ?
                            'Please select yes or no' : false
                        })}
                      />
                      <div 
                        className={`w-5 h-5 rounded-full border ${
                          watch('requiresCustomsAssistance') === 'no' 
                            ? 'border-[#5fb775]' 
                            : errors.requiresCustomsAssistance ? 'border-red-500' : 'border-gray-300'
                        } flex items-center justify-center cursor-pointer`}
                        onClick={() => handleCustomsAssistanceChange('no')}
                      >
                        {watch('requiresCustomsAssistance') === 'no' && (
                          <div className="w-3 h-3 rounded-full bg-[#5fb775]"></div>
                        )}
                      </div>
                    </div>
                    <label 
                      htmlFor="customs-assistance-no" 
                      className="ml-2 block text-sm text-gray-700 cursor-pointer"
                      onClick={() => handleCustomsAssistanceChange('no')}
                    >
                      No
                    </label>
                  </div>
                </div>
                {errors.requiresCustomsAssistance && (
                  <p className="mt-1 text-sm text-red-600">{errors.requiresCustomsAssistance.message}</p>
                )}
              </div>
            )}
            
            {/* Other Specialization Field */}
            {watchedSpecialization && watchedSpecialization.includes('other') && (
              <div className="border-l-4 border-[#fb8c01] pl-4 py-2 mt-4 transition-all duration-300 ease-in">
                <label htmlFor="specializationOther" className="block text-sm font-medium text-gray-700 mb-2">
                  Please specify other specialization <span className="text-red-500">*</span>
                </label>
                <input
                  id="specializationOther"
                  className={`w-full px-4 py-2 border ${errors.specializationOther ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
                  {...register('specializationOther', { 
                    required: watchedSpecialization && watchedSpecialization.includes('other') ? 
                      'Please specify the other specialization' : false
                  })}
                />
                {errors.specializationOther && (
                  <p className="mt-1 text-sm text-red-600">{errors.specializationOther.message}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSpecialization;