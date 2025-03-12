import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { ChevronLeft, ChevronRight, Send, Clock, CheckCircle, X } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';

// Form sections components
import GeneralInfo from './form-sections/generalInfo';
import ContactDetails from './form-sections/contactDetails';
import ServicesSpecialization from './form-sections/ServicesSpecialization';
import Affiliations from './form-sections/affiliations';
import Technology from './form-sections/technology';
import Regulatory from './form-sections/regulatory';
import Collaboration from './form-sections/collaboration';
import Media from './form-sections/media';
import AdditionalInfo from './form-sections/additionalInfo';
import Declaration from './form-sections/declaration';

// Storage key for localStorage
const STORAGE_KEY = 'hfn_form_data';
// Expiration time in milliseconds (1 hour)
const EXPIRATION_TIME = 60 * 60 * 1000;

const MultiStepForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const defaultValues = {
    // General Information
    organizationName: '',
    organizationType: [],
    organizationTypeOther: '',
    yearEstablished: '',
    address: '',
    region: '',
    website: '',
    email: '',
    phone: '',
    
    // Contact Person Details
    primaryContactName: '',
    primaryDesignation: '',
    primaryEmail: '',
    primaryPhone: '',
    secondaryContactName: '',
    secondaryDesignation: '',
    secondaryEmail: '',
    secondaryPhone: '',
    
    // Services & Specialization
    description: '',
    specialization: [],
    specializationOther: '',
    
    // Affiliations & Memberships
    memberOfAssociations: false,
    associations: '',
    membershipNumber: '',
    collaboratesWithGovOrg: false,
    governmentCollaborations: '',
    
    // Technology & Innovation
    usesDigitalSolutions: false,
    digitalSolutionsTypes: '',
    interestedInDigitalCollaboration: false,
    
    // Regulatory Compliance & Certifications
    isLicensed: false,
    regulatoryAuthority: '',
    registrationNumber: '',
    hasInternationalCertifications: false,
    certifications: '',
    
    // Collaboration & Networking
    interestedInCollaboration: false,
    collaborationAreas: [],
    collaborationAreasOther: '',
    
    // Media & Publicity
    allowFeatureInPublications: false,
    linkedIn: '',
    twitter: '',
    facebook: '',
    instagram: '',
    
    // Additional Information
    additionalInfo: '',
    
    // Declaration & Consent
    fullName: '',
    consentGiven: false,
    date: '',
  };
  
  // Load stored data from localStorage on component mount
  const loadStoredFormData = () => {
    if (typeof window !== 'undefined') {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        
        if (storedData) {
          const { data, timestamp } = JSON.parse(storedData);
          const currentTime = new Date().getTime();
          
          // Check if data has expired
          if (currentTime - timestamp < EXPIRATION_TIME) {
            return data;
          } else {
            // Data has expired, remove it
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error('Error loading stored form data:', error);
      }
    }
    return null;
  };
  
  // Initialize form with stored data or default values
  const methods = useForm({
    defaultValues: loadStoredFormData() || defaultValues,
    mode: "onChange"
  });
  
  // Save form data to localStorage whenever it changes
  useEffect(() => {
    const subscription = methods.watch((formData) => {
      const storageData = {
        data: formData,
        timestamp: new Date().getTime()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
    });
    
    return () => subscription.unsubscribe();
  }, [methods]);

  const totalSteps = 10;
  
  const nextStep = async () => {
    const isValid = await methods.trigger(getFieldsToValidate());
  
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Optionally, you can alert the user that there are validation errors
      //alert('Please fill out all required fields before proceeding.');
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const getFieldsToValidate = () => {
    switch(currentStep) {
      case 1:
        return ["organizationName", "organizationType", "organizationTypeOther", "yearEstablished", "email"];
      case 2:
        return ["primaryContactName", "primaryEmail"];
      case 3:
        return ["description","specialization"];
      case 4:
        return ["memberOfAssociations", "associations", "membershipNumber", "collaboratesWithGovOrg","governmentCollaborations"];
      case 5:
        return ["usesDigitalSolutions", "interestedInDigitalCollaboration"];
      case 6:
        return ["isLicensed", "regulatoryAuthority", "registrationNumber","certifications"];
      case 7:
        return ["interestedInCollaboration", "collaborationAreas", "collaborationAreasOther"];
      case 8:
        return ["allowFeatureInPublications"];
      case 9:
        return []; // No required fields for Additional Information
      case 10:
        return ["fullName", "consentGiven", "date"];
      default:
        return [];
    }
  };
  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const organizationId = data.organizationName.toLowerCase().replace(/\s+/g, '-');
      
      // Clear localStorage after successful submission
      localStorage.removeItem(STORAGE_KEY);
       // Reset the form to default values
    methods.reset(defaultValues);

      // Show success modal instead of alert
      setShowSuccessModal(true);
      setIsSubmitting(false);
      
      // Redirect will be handled by button in modal
    } catch (error) {
      console.error('Error submitting form: ', error);
      alert('There was an error submitting your form. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  const handleCloseModal = () => {
    setShowSuccessModal(false);
    router.push('/members');
  };
  
  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return <GeneralInfo />;
      case 2:
        return <ContactDetails />;
      case 3:
        return <ServicesSpecialization />;
      case 4:
        return <Affiliations />;
      case 5:
        return <Technology />;
      case 6:
        return <Regulatory />;
      case 7:
        return <Collaboration />;
      case 8:
        return <Media />;
      case 9:
        return <AdditionalInfo />;
      case 10:
        return <Declaration />;
      default:
        return <GeneralInfo />;
    }
  };
  
  const getStepTitle = () => {
    switch(currentStep) {
      case 1: return "General Information";
      case 2: return "Contact Person Details";
      case 3: return "Services & Specialization";
      case 4: return "Affiliations & Memberships";
      case 5: return "Technology & Innovation";
      case 6: return "Regulatory Compliance & Certifications";
      case 7: return "Collaboration & Networking";
      case 8: return "Media & Publicity";
      case 9: return "Additional Information";
      case 10: return "Declaration & Consent";
      default: return "General Information";
    }
  };

  // Calculate completion percentage
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-[#fb8c01] to-[#5fb775] py-6">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-white mb-2">HFN Stakeholder Directory Questionnaire</h1>
        
          <p className="text-white font-bold">
              *** Confidentiality Notice: The information collected will be used solely for the
              purpose of creating the HFN membership directory and enhancing collaboration
              among stakeholders
          </p>
        </div>
      </div>
      
      {/* Step indicator */}
      <div className="container mx-auto px-4  py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-1 gap-2 sm:gap-0">
        <div className="w-full sm:w-auto">
          <h2 className="text-lg sm:text-xl font-semibold text-[#5fb775]">
            Section {currentStep}: {getStepTitle()}
          </h2>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
          <span className="text-xs sm:text-sm text-gray-500 hidden sm:inline">Progress</span>
          <div className="w-full sm:w-32 h-2 bg-gray-200 rounded-full overflow-hidden flex-grow sm:flex-grow-0">
            <div 
              className="h-full bg-gradient-to-r from-[#fb8c01] to-[#5fb775] transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
            {currentStep} / {totalSteps}
          </span>
        </div>
      </div>
      
      {/* Local storage notification */}
      <div className="flex items-center text-xs text-gray-500 mt-1">
        <Clock className="h-3 w-3 mr-1" />
        Form progress saved locally, expires in 1 hour
      </div>
    </div>
      
      {/* Form content */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="max-w-4xl mx-auto">
              {renderStep()}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="container mx-auto px-6 py-6 border-t border-gray-200">
            <div className="max-w-4xl mx-auto flex justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex cursor-pointer items-center px-6 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#fb8c01] focus:ring-opacity-50"
                  disabled={isSubmitting}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>
              ) : (
                <div></div>
              )}
              
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-6 py-2 bg-[#fb8c01] text-white rounded hover:bg-[#e07e01] transition-colors focus:outline-none focus:ring-2 focus:ring-[#fb8c01] focus:ring-opacity-50 cursor-pointer"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center px-6 py-2 bg-[#5fb775] text-white rounded hover:bg-[#4ea364] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5fb775] focus:ring-opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                  {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
                </button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
          <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 max-w-md w-full mx-4 sm:mx-0 animate-fadeIn">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-[#5fb775] mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Submission Successful!</h3>
              </div>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Thank you for submitting your information to the HFN Stakeholder Directory. Your details have been recorded successfully.
              </p>
              <p className="text-gray-600">
                We will review your submission and get back to you if we need any additional information.
              </p>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={handleCloseModal}
                className="px-6 cursor-pointer py-2 bg-gradient-to-r from-[#fb8c01] to-[#5fb775] text-white rounded-md hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5fb775] focus:ring-opacity-50"
              >
                View Members Directory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;