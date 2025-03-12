import React from 'react';
import { useFormContext } from 'react-hook-form';

const GeneralInfo = () => {
  const { register, watch, formState: { errors }, setValue, getValues } = useFormContext();
  
  const organizationTypes = [
    { value: 'healthcare-provider', label: 'Healthcare Provider (Hospital, Clinic, Diagnostic Center)' },
    { value: 'pharmaceutical', label: 'Pharmaceutical Company' },
    { value: 'insurance', label: 'Health Insurance Provider (HMO)' },
    { value: 'tech-firm', label: 'Health Technology Firm' },
    { value: 'association', label: 'Professional Association/Society' },
    { value: 'government', label: 'Government/Regulatory Body' },
    { value: 'ngo', label: 'Non-Governmental Organization (NGO)' },
    { value: 'academic', label: 'Academic/Research Institution' },
    { value: 'other', label: 'Others' }
  ];

  const watchedOrganizationType = watch('organizationType');
  const currentYear = new Date().getFullYear();

  const handleOrganizationTypeChange = (typeValue) => {
    const currentTypes = getValues('organizationType') || [];
    const isSelected = currentTypes.includes(typeValue);
    
    let updatedTypes;
    if (isSelected) {
      updatedTypes = currentTypes.filter(type => type !== typeValue);
    } else {
      updatedTypes = [...currentTypes, typeValue];
    }
    
    setValue('organizationType', updatedTypes, { shouldValidate: true });
  };

  return (
    <div className="space-y-10">
      <div>

        <div className="space-y-6">
          <div>
            <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name of Organization/Individual <span className="text-red-500">*</span>
            </label>
            <input
              id="organizationName"
              className={`w-full px-4 py-2 border ${errors.organizationName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
              {...register('organizationName', { 
                required: 'Organization name is required' 
              })}
            />
            {errors.organizationName && (
              <p className="mt-1 text-sm text-red-600">{errors.organizationName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Type of Organization (Select one or more as applicable) <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {organizationTypes.map((type) => (
                <div key={type.value} className="flex items-center">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id={`organizationType-${type.value}`}
                      className="sr-only"
                      {...register('organizationType', {
                        validate: value => (value && value.length > 0) || 'Please select at least one organization type'
                      })}
                      value={type.value}
                      onChange={() => handleOrganizationTypeChange(type.value)}
                      checked={watchedOrganizationType && watchedOrganizationType.includes(type.value)}
                    />
                    <div 
                      className={`w-5 h-5 rounded border ${
                        watchedOrganizationType && watchedOrganizationType.includes(type.value) 
                          ? 'border-[#5fb775]' 
                          : errors.organizationType ? 'border-red-500' : 'border-gray-300'
                      } flex items-center justify-center cursor-pointer`}
                      onClick={() => handleOrganizationTypeChange(type.value)}
                    >
                      {watchedOrganizationType && watchedOrganizationType.includes(type.value) && (
                        <div className="w-3 h-3 rounded bg-[#5fb775]"></div>
                      )}
                    </div>
                  </div>
                  <label 
                    htmlFor={`organizationType-${type.value}`} 
                    className="ml-2 block text-sm text-gray-700 cursor-pointer"
                    onClick={() => handleOrganizationTypeChange(type.value)}
                  >
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
            {errors.organizationType && (
              <p className="mt-1 text-sm text-red-600">{errors.organizationType.message}</p>
            )}
            
            {watchedOrganizationType && watchedOrganizationType.includes('other') && (
              <div className="border-l-4 border-[#fb8c01] pl-4 py-2 mt-4 transition-all duration-300 ease-in">
                <label htmlFor="organizationTypeOther" className="block text-sm font-medium text-gray-700 mb-2">
                  Please specify other type <span className="text-red-500">*</span>
                </label>
                <input
                  id="organizationTypeOther"
                  className={`w-full px-4 py-2 border ${errors.organizationTypeOther ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
                  {...register('organizationTypeOther', { 
                    required: watchedOrganizationType && watchedOrganizationType.includes('other') ? 
                      'Please specify the other organization type' : false
                  })}
                />
                {errors.organizationTypeOther && (
                  <p className="mt-1 text-sm text-red-600">{errors.organizationTypeOther.message}</p>
                )}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="yearEstablished" className="block text-sm font-medium text-gray-700 mb-2">
              Year of Establishment
            </label>
            <input
              type="number"
              placeholder="2025"
              id="yearEstablished"
              className={`w-full px-4 py-2 border ${errors.yearEstablished ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
              {...register('yearEstablished', { 
                min: { value: 1800, message: 'Year must be 1800 or later' },
                max: { value: currentYear, message: `Year cannot be later than ${currentYear}` },
                validate: {
                  isInteger: value => !value || Number.isInteger(Number(value)) || 'Year must be a whole number'
                }
              })}
            />
            {errors.yearEstablished && (
              <p className="mt-1 text-sm text-red-600">{errors.yearEstablished.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Corporate Address
            </label>
            <textarea
              id="address"
              rows="3"
              className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
              {...register('address')}
            />
          </div>

          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
              State/Region of Operation
            </label>
            <input
              type="text"
              id="region"
              className={`w-full px-4 py-2 border ${errors.region ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
              {...register('region')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                Website (if available)
              </label>
              <input
                type="url"
                id="website"
                placeholder="https://example.com"
                className={`w-full px-4 py-2 border ${errors.website ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
                {...register('website', {
                  pattern: {
                    value: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
                    message: 'Please enter a valid URL'
                  }
                })}
              />
              {errors.website && (
                <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number(s)
            </label>
            <input
              type="tel"
              id="phone"
              className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
              {...register('phone', {
                pattern: {
                  value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                  message: 'Please enter a valid phone number'
                }
              })}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;