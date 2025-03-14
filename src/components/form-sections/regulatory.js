import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CustomRadio from '../ui/CustomRadio'; // Ensure the path is correct

const Regulatory = () => {
  const { register, control, watch, formState: { errors } } = useFormContext();

  const isLicensed = watch('isLicensed');
  const hasInternationalCertifications = watch('hasInternationalCertifications');
  const regulatoryAuthorityType = watch('regulatoryAuthorityType');

  // Regulatory authority options
  const regulatoryOptions = [
    { value: '', label: 'Select an authority' },
    { value: 'NAFDAC', label: 'NAFDAC' },
    { value: 'NHIS', label: 'NHIS' },
    { value: 'MDCN', label: 'MDCN' },
    { value: 'PCN', label: 'PCN' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Are you licensed/registered with relevant regulatory bodies? <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-8 mt-2">
          <CustomRadio
            id="isLicensedYes"
            name="isLicensed"
            value="true"
            register={register}
            watch={watch}
            errors={errors}
            label="Yes"
          />
          <CustomRadio
            id="isLicensedNo"
            name="isLicensed"
            value="false"
            register={register}
            watch={watch}
            errors={errors}
            label="No"
          />
        </div>
        {errors.isLicensed && (
          <p className="mt-1 text-sm text-red-600">{errors.isLicensed.message}</p>
        )}
      </div>

      {isLicensed === "true" && (
        <div className="border-l-4 border-[#fb8c01] pl-4 py-2 mb-8 transition-all duration-300 ease-in">
          <div className="space-y-4">
            <div>
              <label htmlFor="regulatoryAuthorityType" className="block text-sm font-medium text-gray-700 mb-1">
                Please select regulatory authority <span className="text-red-500">*</span>
              </label>
              <Controller
                name="regulatoryAuthorityType"
                control={control}
                rules={{ required: isLicensed === "true" ? "Regulatory authority is required" : false }}
                render={({ field }) => (
                  <>
                    <select
                      id="regulatoryAuthorityType"
                      {...field}
                      className={`w-full px-4 py-2 border ${
                        errors.regulatoryAuthorityType ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb8c01] focus:border-[#fb8c01] transition-colors`}
                    >
                      {regulatoryOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.regulatoryAuthorityType && (
                      <p className="mt-1 text-sm text-red-600">{errors.regulatoryAuthorityType.message}</p>
                    )}
                  </>
                )}
              />
            </div>

            {regulatoryAuthorityType === 'other' && (
              <div>
                <label htmlFor="otherRegulatoryAuthority" className="block text-sm font-medium text-gray-700 mb-1">
                  Please specify other regulatory authority <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="otherRegulatoryAuthority"
                  control={control}
                  rules={{ 
                    required: regulatoryAuthorityType === 'other' ? "Please specify the other regulatory authority" : false 
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        type="text"
                        id="otherRegulatoryAuthority"
                        {...field}
                        className={`w-full px-4 py-2 border ${
                          errors.otherRegulatoryAuthority ? 'border-red-500' : 'border-gray-300'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb8c01] focus:border-[#fb8c01] transition-colors`}
                      />
                      {errors.otherRegulatoryAuthority && (
                        <p className="mt-1 text-sm text-red-600">{errors.otherRegulatoryAuthority.message}</p>
                      )}
                    </>
                  )}
                />
              </div>
            )}

            <div>
              <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Registration Number <span className="text-red-500">*</span>
              </label>
              <Controller
                name="registrationNumber"
                control={control}
                rules={{ required: isLicensed === "true" ? "Registration number is required" : false }}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      id="registrationNumber"
                      {...field}
                      className={`w-full px-4 py-2 border ${
                        errors.registrationNumber ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb8c01] focus:border-[#fb8c01] transition-colors`}
                    />
                    {errors.registrationNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.registrationNumber.message}</p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Do you hold any international certifications or accreditations (e.g., ISO, WHO, JCI)? <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-8 mt-2">
          <CustomRadio
            id="hasInternationalCertificationsYes"
            name="hasInternationalCertifications"
            value="true"
            register={register}
            watch={watch}
            errors={errors}
            label="Yes"
          />
          <CustomRadio
            id="hasInternationalCertificationsNo"
            name="hasInternationalCertifications"
            value="false"
            register={register}
            watch={watch}
            errors={errors}
            label="No"
          />
        </div>
        {errors.hasInternationalCertifications && (
          <p className="mt-1 text-sm text-red-600">{errors.hasInternationalCertifications.message}</p>
        )}
      </div>

      {hasInternationalCertifications === "true" && (
        <div className="border-l-4 border-[#fb8c01] pl-4 py-2 transition-all duration-300 ease-in">
          <label htmlFor="certifications" className="block text-sm font-medium text-gray-700 mb-1">
            Please specify the certifications <span className="text-red-500">*</span>
          </label>
          <Controller
            name="certifications"
            control={control}
            rules={{ required: hasInternationalCertifications === "true" ? "Please specify the certifications" : false }}
            render={({ field }) => (
              <>
                <textarea
                  id="certifications"
                  {...field}
                  rows="3"
                  className={`w-full px-4 py-2 border ${
                    errors.certifications ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb8c01] focus:border-[#fb8c01] transition-colors`}
                />
                {errors.certifications && (
                  <p className="mt-1 text-sm text-red-600">{errors.certifications.message}</p>
                )}
              </>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default Regulatory;