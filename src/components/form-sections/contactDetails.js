import React from 'react';
import { useFormContext } from 'react-hook-form';

const ContactDetails = () => {
  const { register, formState: { errors }, watch } = useFormContext();
  const isCeoPrimaryContact = watch('isCeoPrimaryContact');
  
  return (
    <div className="space-y-6">
      <div className="bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Contact Person Details 
            {isCeoPrimaryContact && <span className="text-sm font-normal text-gray-500 ml-2">(Optional)</span>}
          </h3>
          
          {isCeoPrimaryContact && (
            <div className="px-3 py-1 bg-green-50 text-[#5fb775] text-xs rounded-full">
              CEO is primary contact
            </div>
          )}
        </div>
        
        {isCeoPrimaryContact ? (
          <p className="text-sm text-gray-500 mb-6">
            Since the CEO is set as the primary contact, this section is optional. You may add a secondary contact person if needed.
          </p>
        ) : (
          <p className="text-sm text-gray-500 mb-6">
            Please provide details of the main contact person for your organization.
          </p>
        )}
        
        {/* Primary Contact */}
        <div className="mb-8">
          <h4 className="text-md font-medium text-gray-800 mb-4">
            {isCeoPrimaryContact ? "Secondary Contact Person" : "Primary Contact Person"}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="primaryContactName" className="block text-sm font-medium text-gray-700 mb-1">
                Name {!isCeoPrimaryContact && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                id="primaryContactName"
                {...register("primaryContactName", {
                  required: !isCeoPrimaryContact ? "Name is required" : false
                })}
                placeholder="Full Name"
                className={`w-full px-4 py-2 border ${
                  errors.primaryContactName && !isCeoPrimaryContact ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-[#5fb775] focus:border-[#fb8c01] transition-colors`}
              />
              {errors.primaryContactName && !isCeoPrimaryContact && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.primaryContactName.message}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="primaryDesignation" className="block text-sm font-medium text-gray-700 mb-1">
                Designation/Title
              </label>
              <input
                type="text"
                id="primaryDesignation"
                {...register("primaryDesignation")}
                placeholder="e.g. Project Manager, Director"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5fb775] focus:border-[#fb8c01] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="primaryEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email {!isCeoPrimaryContact && <span className="text-red-500">*</span>}
              </label>
              <input
                type="email"
                id="primaryEmail"
                {...register("primaryEmail", {
                  required: !isCeoPrimaryContact ? "Email is required" : false,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                placeholder="email@example.com"
                className={`w-full px-4 py-2 border ${
                  errors.primaryEmail && !isCeoPrimaryContact ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-[#5fb775] focus:border-[#fb8c01] transition-colors`}
              />
              {errors.primaryEmail && !isCeoPrimaryContact && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.primaryEmail.message}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="primaryPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="primaryPhone"
                {...register("primaryPhone")}
                placeholder="+254 XXX XXX XXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5fb775] focus:border-[#fb8c01] transition-colors"
              />
            </div>
          </div>
        </div>
        
        {/* Secondary Contact Section */}
        {!isCeoPrimaryContact && (
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-4">
              Secondary Contact Person <span className="text-sm font-normal text-gray-500">(Optional)</span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="secondaryContactName" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="secondaryContactName"
                  {...register("secondaryContactName")}
                  placeholder="Full Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5fb775] focus:border-[#fb8c01] transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="secondaryDesignation" className="block text-sm font-medium text-gray-700 mb-1">
                  Designation/Title
                </label>
                <input
                  type="text"
                  id="secondaryDesignation"
                  {...register("secondaryDesignation")}
                  placeholder="e.g. Assistant, Coordinator"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5fb775] focus:border-[#fb8c01] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="secondaryEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="secondaryEmail"
                  {...register("secondaryEmail", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder="email@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5fb775] focus:border-[#fb8c01] transition-colors"
                />
                {errors.secondaryEmail && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.secondaryEmail.message}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="secondaryPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="secondaryPhone"
                  {...register("secondaryPhone")}
                  placeholder="+254 XXX XXX XXX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5fb775] focus:border-[#fb8c01] transition-colors"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactDetails;