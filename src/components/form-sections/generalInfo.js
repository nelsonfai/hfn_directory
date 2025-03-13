import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Upload, X } from 'lucide-react';

const GeneralInfo = () => {
  const { register, watch, formState: { errors }, setValue, getValues } = useFormContext();
  const [logoPreview, setLogoPreview] = useState(null);
  
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

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Store the file in the form data
      setValue('organizationLogo', file);
      
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    }
  };

  // Handle logo removal
  const handleLogoRemove = () => {
    setValue('organizationLogo', null);
    setLogoPreview(null);
    // Reset the file input
    const fileInput = document.getElementById('logo-upload');
    if (fileInput) fileInput.value = '';
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

        {/* Logo Upload Section */}
         {/* Logo Upload Section */}
<div className="mt-6">
  <label className="block text-sm font-medium text-gray-700 mb-3">
    Organization Logo (Optional)
  </label>
  
  <div className="mt-1 flex ">
    {logoPreview ? (
      <div className="relative group">
        <div className="w-48 h-48 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white flex items-center justify-center p-2">
          <img src={logoPreview} alt="Logo preview" className="max-w-full max-h-full object-contain" />
        </div>
        
        {/* Remove button with hover effect */}
        <button
          type="button"
          onClick={handleLogoRemove}
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md hover:bg-red-50 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-400"
          aria-label="Remove logo"
        >
          <X className="h-4 w-4 text-red-500" />
        </button>
        
        {/* Change logo text that appears on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span>Click to change</span>
        </div>
        
        <input
          id="logo-upload-change"
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept="image/*"
          onChange={handleLogoUpload}
        />
      </div>
    ) : (
      <div className="flex flex-col ">
        <label 
          htmlFor="logo-upload" 
          className="cursor-pointer flex flex-col items-center justify-center w-48 h-48 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50/50 hover:bg-gray-50 hover:border-[#fb8c01] transition-all duration-200"
        >
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-3 rounded-full bg-gray-100 p-3">
              <Upload className="h-6 w-6 text-[#fb8c01]" />
            </div>
            <p className="mb-2 text-sm font-medium text-gray-700">
              Upload your logo
            </p>
 
            <p className="mt-3 text-xs text-gray-400 font-medium px-2 py-1 bg-white/80 rounded-full">
              PNG, JPG up to 2MB
            </p>
          </div>
          <input
            id="logo-upload"
            type="file"
            className="sr-only"
            accept="image/*"
            onChange={handleLogoUpload}
          />
        </label>
      </div>
    )}
  </div>
        <p className="mt-2 text-xs  text-gray-500">
          For best results, use a square image with a transparent background
        </p>
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
