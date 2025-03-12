import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import CustomRadio from '../ui/CustomRadio'; // Ensure the path is correct
import CustomCheckbox from '../ui/CustomCheckbox'; // Ensure the path is correct

const Collaboration = ({ onSubmitData, defaultValues = {} }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    register,
    setValue
  } = useFormContext();

  const watchInterestedInCollaboration = watch("interestedInCollaboration");
  const watchedCollaborationAreas = watch("collaborationAreas");

  const collaborationOptions = [
    { value: 'research', label: 'Joint Research & Development' },
    { value: 'partnerships', label: 'Public-Private Partnerships' },
    { value: 'training', label: 'Capacity Building & Training' },
    { value: 'advocacy', label: 'Health Advocacy & Policy Influence' },
    { value: 'digital', label: 'Digital Health & Innovation' },
    { value: 'supply', label: 'Supply Chain & Procurement' },
    { value: 'other', label: 'Others' }
  ];

  const onSubmit = (data) => {
    onSubmitData(data);
  };

  const handleCollaborationAreaChange = (value) => {
    const newValue = [...watchedCollaborationAreas];
    if (newValue.includes(value)) {
      const index = newValue.indexOf(value);
      if (index > -1) {
        newValue.splice(index, 1);
      }
    } else {
      newValue.push(value);
    }
    setValue('collaborationAreas', newValue);
  };

  return (
      <div className="p-4 rounded-lg">

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Would you be interested in collaborating with other HFN members? <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-8 mt-2">
            <CustomRadio
              id="interestedInCollaborationYes"
              name="interestedInCollaboration"
              value="true"
              register={register}
              watch={watch}
              errors={errors}
              label="Yes"
            />
            <CustomRadio
              id="interestedInCollaborationNo"
              name="interestedInCollaboration"
              value="false"
              register={register}
              watch={watch}
              errors={errors}
              label="No"
            />
          </div>
          {errors.interestedInCollaboration && (
            <p className="mt-1 text-sm text-red-600">{errors.interestedInCollaboration.message}</p>
          )}
        </div>

        {watchInterestedInCollaboration === "true" && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Areas of Collaboration (Select all that apply) <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {collaborationOptions.map((option) => (
                <CustomCheckbox
                  key={option.value}
                  id={`collaboration-${option.value}`}
                  name="collaborationAreas"
                  value={option.value}
                  register={register}
                  watch={watch}
                  errors={errors}
                  label={option.label}
                  onChange={() => handleCollaborationAreaChange(option.value)}
                />
              ))}
            </div>

            {errors.collaborationAreas && (
              <p className="mt-1 text-sm text-red-600">Please select at least one area of collaboration</p>
            )}

            {watchedCollaborationAreas && watchedCollaborationAreas.includes('other') && (
              <Controller
                name="collaborationAreasOther"
                control={control}
                rules={{
                  required: watchedCollaborationAreas.includes('other') ? 'Please specify other areas' : false
                }}
                render={({ field }) => (
                  <div className="mt-3">
                    <label htmlFor="collaborationAreasOther" className="block text-sm font-medium text-gray-700 mb-1">
                      Please specify other areas
                    </label>
                    <input
                      type="text"
                      id="collaborationAreasOther"
                      {...field}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb8c01] focus:border-transparent"
                    />
                    {errors.collaborationAreasOther && (
                      <p className="mt-1 text-sm text-red-600">{errors.collaborationAreasOther.message}</p>
                    )}
                  </div>
                )}
              />
            )}
          </div>
        )}
      </div>
  );
};

export default Collaboration;
