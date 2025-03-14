import React from 'react';
import { useFormContext } from 'react-hook-form';
import CustomCheckbox from '../ui/CustomCheckbox';

const CEODetails = () => {
  const { register, watch, formState: { errors }, setValue } = useFormContext();
  
  const isCeoPrimaryContact = watch('isCeoPrimaryContact');
  
  const handlePrimaryContactChange = () => {
    setValue("isCeoPrimaryContact", !isCeoPrimaryContact);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white ">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">CEO/Head of Organization</h3>
        <p className="text-sm text-gray-500 mb-6">
          Please provide details about the CEO or Head of your organization.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="ceoName" className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="ceoName"
              {...register("ceoName", {
                required: "Name is required"
              })}
              placeholder="Full Name"
              className={`w-full px-4 py-2 border ${
                errors.ceoName ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb8c01] focus:border-[#fb8c01] transition-colors`}
            />
            {errors.ceoName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.ceoName.message}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="ceoDesignation" className="block text-sm font-medium text-gray-700 mb-1">
              Designation/Title
            </label>
            <input
              type="text"
              id="ceoDesignation"
              {...register("ceoDesignation")}
              placeholder="e.g. CEO, Managing Director, Executive Director"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb8c01] focus:border-[#fb8c01] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="ceoEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="ceoEmail"
              {...register("ceoEmail", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              placeholder="email@example.com"
              className={`w-full px-4 py-2 border ${
                errors.ceoEmail ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb8c01] focus:border-[#fb8c01] transition-colors`}
            />
            {errors.ceoEmail && (
              <p className="mt-1 text-sm text-red-600">
                {errors.ceoEmail.message}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="ceoPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="ceoPhone"
              {...register("ceoPhone")}
              placeholder="+254 XXX XXX XXX"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb8c01] focus:border-[#fb8c01] transition-colors"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <CustomCheckbox
            id="isCeoPrimaryContact"
            name="isCeoPrimaryContact"
            register={register}
            watch={watch}
            errors={errors}
            label="The CEO/Head of Organisation is the primary contact person for this organization"
            onChange={handlePrimaryContactChange}
          />
          <p className="text-xs text-gray-500 mt-2 ml-7">
            If checked, the CEO details will be used as the primary contact and the next section will be optional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CEODetails;