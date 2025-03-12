import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import CustomRadio from '../ui/CustomRadio'; // Ensure the path is correct

const Media = ({ onSubmitData, defaultValues = {} }) => {
  const {
    control,
    watch,
    formState: { errors },
    register,
    setValue
  } = useFormContext();

  const watchAllowFeature = watch("allowFeatureInPublications");

  const onSubmit = (data) => {
    onSubmitData(data);
  };

  const handleAllowFeatureChange = () => {
    setValue("allowFeatureInPublications", !watchAllowFeature);
  };

  return (

      <div className="p-4 rounded-lg">

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Would you like your organization to be featured in HFN publications, newsletters, or website? <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-8 mt-2">
            <CustomRadio
              id="allowFeatureInPublicationsYes"
              name="allowFeatureInPublications"
              value="true"
              register={register}
              watch={watch}
              errors={errors}
              label="Yes"
            />
            <CustomRadio
              id="allowFeatureInPublicationsNo"
              name="allowFeatureInPublications"
              value="false"
              register={register}
              watch={watch}
              errors={errors}
              label="No"
            />
          </div>
          {errors.allowFeatureInPublications && (
            <p className="mt-1 text-sm text-red-600">{errors.allowFeatureInPublications.message}</p>
          )}
        </div>

        <div className="mt-6">
          <h4 className="text-md font-medium text-gray-700 mb-3">Social Media Handles (if applicable)</h4>

          <div className="space-y-4">
            <div>
              <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn
              </label>
              <Controller
                name="linkedIn"
                control={control}
                rules={{
                  pattern: {
                    value: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/i,
                    message: 'Please enter a valid LinkedIn URL'
                  }
                }}
                render={({ field }) => (
                  <input
                    type="text"
                    id="linkedIn"
                    placeholder="https://linkedin.com/in/your-profile"
                    {...field}
                    className={`w-full px-4 py-2 border ${errors.linkedIn ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
                    />
                )}
              />
              {errors.linkedIn && (
                <p className="mt-1 text-sm text-red-600">{errors.linkedIn.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
                Twitter/X
              </label>
              <Controller
                name="twitter"
                control={control}
                rules={{
                  pattern: {
                    value: /^(https?:\/\/)?(www\.)?twitter\.com\/.*$/i,
                    message: 'Please enter a valid Twitter/X URL'
                  }
                }}
                render={({ field }) => (
                  <input
                    type="text"
                    id="twitter"
                    placeholder="https://twitter.com/your-handle"
                    {...field}
                    className={`w-full px-4 py-2 border ${errors.twitter ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
                    />
                )}
              />
              {errors.twitter && (
                <p className="mt-1 text-sm text-red-600">{errors.twitter.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">
                Facebook
              </label>
              <Controller
                name="facebook"
                control={control}
                rules={{
                  pattern: {
                    value: /^(https?:\/\/)?(www\.)?facebook\.com\/.*$/i,
                    message: 'Please enter a valid Facebook URL'
                  }
                }}
                render={({ field }) => (
                  <input
                    type="text"
                    id="facebook"
                    placeholder="https://facebook.com/your-page"
                    {...field}
                    className={`w-full px-4 py-2 border ${errors.facebook ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
                    />
                )}
              />
              {errors.facebook && (
                <p className="mt-1 text-sm text-red-600">{errors.facebook.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
                Instagram
              </label>
              <Controller
                name="instagram"
                control={control}
                rules={{
                  pattern: {
                    value: /^(https?:\/\/)?(www\.)?instagram\.com\/.*$/i,
                    message: 'Please enter a valid Instagram URL'
                  }
                }}
                render={({ field }) => (
                  <input
                    type="text"
                    id="instagram"
                    placeholder="https://instagram.com/your-handle"
                    {...field}
                    className={`w-full px-4 py-2 border ${errors.instagram ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fb8c01]'} rounded focus:outline-none focus:ring-1 focus:border-[#fb8c01] transition-colors`}
                    />
                )}
              />
              {errors.instagram && (
                <p className="mt-1 text-sm text-red-600">{errors.instagram.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Media;
