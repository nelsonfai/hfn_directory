import React from 'react';
import { useFormContext } from 'react-hook-form';

const ContactDetails = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-10">
      <div>


        <div className="space-y-6">
          <div>
            <label htmlFor="primaryContactName" className="block text-sm font-medium text-gray-700 mb-2">
              Primary Contact Person&apos;s Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="primaryContactName"
              className={`w-full px-4 py-2 border ${errors.primaryContactName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
              {...register('primaryContactName', { 
                required: 'Primary contact name is required' 
              })}
            />
            {errors.primaryContactName && (
              <p className="mt-1 text-sm text-red-600">{errors.primaryContactName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="primaryDesignation" className="block text-sm font-medium text-gray-700 mb-2">
              Designation/Role <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="primaryDesignation"
              className={`w-full px-4 py-2 border ${errors.primaryDesignation ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
              {...register('primaryDesignation', { 
                required: 'Designation/Role is required' 
              })}
            />
            {errors.primaryDesignation && (
              <p className="mt-1 text-sm text-red-600">{errors.primaryDesignation.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="primaryEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="primaryEmail"
              className={`w-full px-4 py-2 border ${errors.primaryEmail ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
              {...register('primaryEmail', {
                required: 'Email address is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
            />
            {errors.primaryEmail && (
              <p className="mt-1 text-sm text-red-600">{errors.primaryEmail.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="primaryPhone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="primaryPhone"
              className={`w-full px-4 py-2 border ${errors.primaryPhone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
              {...register('primaryPhone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                  message: 'Please enter a valid phone number'
                }
              })}
            />
            {errors.primaryPhone && (
              <p className="mt-1 text-sm text-red-600">{errors.primaryPhone.message}</p>
            )}
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Secondary Contact Person (if any)</h3>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="secondaryContactName" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="secondaryContactName"
                  className={`w-full px-4 py-2 border ${errors.secondaryContactName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
                  {...register('secondaryContactName')}
                />
                {errors.secondaryContactName && (
                  <p className="mt-1 text-sm text-red-600">{errors.secondaryContactName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="secondaryDesignation" className="block text-sm font-medium text-gray-700 mb-2">
                  Designation
                </label>
                <input
                  type="text"
                  id="secondaryDesignation"
                  className={`w-full px-4 py-2 border ${errors.secondaryDesignation ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
                  {...register('secondaryDesignation')}
                />
                {errors.secondaryDesignation && (
                  <p className="mt-1 text-sm text-red-600">{errors.secondaryDesignation.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="secondaryEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="secondaryEmail"
                  className={`w-full px-4 py-2 border ${errors.secondaryEmail ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
                  {...register('secondaryEmail', {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address'
                    }
                  })}
                />
                {errors.secondaryEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.secondaryEmail.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="secondaryPhone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="secondaryPhone"
                  className={`w-full px-4 py-2 border ${errors.secondaryPhone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
                  {...register('secondaryPhone', {
                    pattern: {
                      value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                      message: 'Please enter a valid phone number'
                    }
                  })}
                />
                {errors.secondaryPhone && (
                  <p className="mt-1 text-sm text-red-600">{errors.secondaryPhone.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;