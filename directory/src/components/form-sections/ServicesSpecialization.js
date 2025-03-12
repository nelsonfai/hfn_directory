import React from 'react';
import { useFormContext } from 'react-hook-form';

const ServicesSpecialization = () => {
  const { register, watch, formState: { errors }, setValue, getValues } = useFormContext();
  
  const specializationTypes = [
    { value: 'primary-healthcare', label: 'Primary Healthcare' },
    { value: 'secondary-healthcare', label: 'Secondary Healthcare' },
    { value: 'tertiary-healthcare', label: 'Tertiary Healthcare' },
    { value: 'pharmaceuticals', label: 'Pharmaceuticals & Drug Manufacturing' },
    { value: 'medical-equipment', label: 'Medical Equipment & Supplies' },
    { value: 'health-insurance', label: 'Health Insurance & Financing' },
    { value: 'public-health', label: 'Public Health & Advocacy' },
    { value: 'health-technology', label: 'Health Technology & Innovation' },
    { value: 'capacity-building', label: 'Capacity Building & Training' },
    { value: 'research', label: 'Research & Development' },
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

  return (
    <div className="space-y-10">
      <div>

        <div className="space-y-6">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Brief Description of Organization/Services Offered (100 words max) <span className="text-red-500">*</span>
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