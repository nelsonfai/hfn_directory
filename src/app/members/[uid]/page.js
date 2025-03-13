'use client'
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Mail, Phone, Globe, ChevronLeft } from 'lucide-react';
import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react'; 

export default function MemberDetailPage() {
  const memberData = {
    organizationLogo: '',
    organizationName: 'Sunshine Healthcare Alliance',
    organizationType: ['healthcare-provider', 'ngo'],
    organizationTypeOther: '',
    yearEstablished: '2010',
    address: '25 Medical Center Road, Ikeja',
    region: 'Lagos',
    website: 'https://www.sunshinehealthcare.org',
    email: 'info@sunshinehealthcare.org',
    phone: '+234-801-234-5678',
    primaryContactName: 'Dr. Adebayo Johnson',
    primaryDesignation: 'Executive Director',
    primaryEmail: 'adebayo@sunshinehealthcare.org',
    primaryPhone: '+234-801-234-5679',
    secondaryContactName: 'Ms. Funmi Adeyemi',
    secondaryDesignation: 'Operations Manager',
    secondaryEmail: 'funmi@sunshinehealthcare.org',
    secondaryPhone: '+234-801-234-5680',
    description: 'Sunshine Healthcare Alliance is a leading provider of primary healthcare services with a focus on maternal and child health across Nigeria. Our mission is to improve healthcare access in underserved communities through innovative and sustainable approaches.',
    specialization: ['primary-healthcare', 'public-health', 'capacity-building'],
    specializationOther: 'Community health education',
    memberOfAssociations: true,
    associations: 'Nigerian Medical Association, African Healthcare Federation',
    membershipNumber: 'NMA-12345, AHF-5678',
    collaboratesWithGovOrg: true,
    governmentCollaborations: 'Federal Ministry of Health, Lagos State Primary Healthcare Board',
    usesDigitalSolutions: true,
    digitalSolutionsTypes: 'Electronic Medical Records, Telemedicine, Mobile Health Applications',
    interestedInDigitalCollaboration: true,
    isLicensed: true,
    regulatoryAuthority: 'Nigerian Medical and Dental Council',
    registrationNumber: 'NMDC-2010-12345',
    hasInternationalCertifications: true,
    certifications: 'ISO 9001:2015, WHO Quality Standards',
    interestedInCollaboration: true,
    collaborationAreas: ['research', 'capacity-building', 'public-health'],
    collaborationAreasOther: 'Community outreach programs',
    allowFeatureInPublications: true,
    linkedIn: 'https://www.linkedin.com/company/sunshine-healthcare-alliance',
    twitter: 'https://twitter.com/sunshinehealth_ng',
    facebook: 'https://www.facebook.com/sunshinehealthcareng',
    instagram: 'https://www.instagram.com/sunshine_healthcare_ng',
  };

  // Generate organization initials if no logo is available
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const organizationInitials = getInitials(memberData.organizationName);

  const [expandedSections, setExpandedSections] = useState({
    general: true,
    services: true,
    contact: true,
    affiliations: false,
    technology: false,
    regulatory: false,
    collaboration: false,
    media: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatOrganizationTypes = (types) => {
    const typeLabels = {
      'healthcare-provider': 'Healthcare Provider',
      'pharmaceutical': 'Pharmaceutical Company',
      'insurance': 'Health Insurance Provider',
      'tech-firm': 'Health Technology Firm',
      'association': 'Professional Association',
      'government': 'Government/Regulatory Body',
      'ngo': 'NGO',
      'academic': 'Academic/Research Institution',
      'other': 'Other'
    };

    return types.map(type => typeLabels[type] || type).join(', ');
  };

  const specLabels = {
    'primary-healthcare': 'Primary Healthcare',
    'secondary-healthcare': 'Secondary Healthcare',
    'tertiary-healthcare': 'Tertiary Healthcare',
    'pharmaceuticals': 'Pharmaceuticals',
    'medical-equipment': 'Medical Equipment & Supplies',
    'health-insurance': 'Health Insurance & Financing',
    'public-health': 'Public Health & Advocacy',
    'health-technology': 'Health Technology & Innovation',
    'capacity-building': 'Capacity Building & Training',
    'research': 'Research & Development',
    'other': 'Other'
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="bg-gradient-to-r from-[#fb8c01] to-[#5fb775] py-6 w-full  shadow-sm">
        <div className="container mx-auto px-6 w-full">
          <div className="flex items-center mb-6">
            <Link
              href="/members"
              className="text-white flex items-center hover:underline text-sm font-medium transition-all duration-200 ease-in-out"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Directory
            </Link>
          </div>
          
          <div className="md:flex items-center">
            {memberData.organizationLogo ? (
              <img 
                src={memberData.organizationLogo} 
                alt={`${memberData.organizationName} logo`} 
                className="h-16 w-16 rounded-lg shadow-lg mr-4"
              />
            ) : (
              <div className="h-16 w-16 rounded-lg bg-white shadow-lg flex items-center justify-center mr-4">
                <span className="text-[#fb8c01] text-2xl font-bold">{organizationInitials}</span>
              </div>
            )}
            <div className="mt-2 md:mt-2">
              <h1 className="text-3xl font-bold text-white mb-1">{memberData.organizationName}</h1>
              <p className="text-white text-sm font-medium opacity-90">
                {formatOrganizationTypes(memberData.organizationType)} • Established {memberData.yearEstablished}
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden    transition-shadow duration-200">
              <div
                className="flex justify-between items-center p-5 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => toggleSection('general')}
              >
                <h2 className="text-lg font-semibold text-gray-800">Organization Overview</h2>
                <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  {expandedSections.general ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </div>

              {expandedSections.general && (
                <div className="px-5 py-4 border-t border-gray-100">
                  <p className="text-gray-700 mb-5 leading-relaxed text-sm">
                    {memberData.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h3 className="text-xs font-medium text-gray-500 mb-1">Year Established</h3>
                      <p className="text-gray-800 font-medium">{memberData.yearEstablished}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h3 className="text-xs font-medium text-gray-500 mb-1">Region</h3>
                      <p className="text-gray-800 font-medium">{memberData.region}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h3 className="text-xs font-medium text-gray-500 mb-1">Organization Type</h3>
                      <p className="text-gray-800 font-medium">{formatOrganizationTypes(memberData.organizationType)}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h3 className="text-xs font-medium text-gray-500 mb-1">Address</h3>
                      <p className="text-gray-800 font-medium">{memberData.address}</p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden    transition-shadow duration-200">
              <div
                className="flex justify-between items-center p-5 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => toggleSection('services')}
              >
                <h2 className="text-lg font-semibold text-gray-800">Services & Specialization</h2>
                <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  {expandedSections.services ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </div>

              {expandedSections.services && (
                <div className="px-5 py-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {memberData.specialization.map((spec) => (
                      <span
                        key={spec}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#5fb77518] text-[#5fb775] border border-[#5fb77530]"
                      >
                        {specLabels[spec] || spec}
                      </span>
                    ))}
                    {memberData.specializationOther && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#5fb77518] text-[#5fb775] border border-[#5fb77530]">
                        {memberData.specializationOther}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </section>

            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden    transition-shadow duration-200">
              <div
                className="flex justify-between items-center p-5 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => toggleSection('affiliations')}
              >
                <h2 className="text-lg font-semibold text-gray-800">Affiliations & Memberships</h2>
                <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  {expandedSections.affiliations ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </div>

              {expandedSections.affiliations && (
                <div className="px-5 py-4 border-t border-gray-100">
                  {memberData.memberOfAssociations ? (
                    <div className="mb-4">
                      <h3 className="text-xs font-medium text-gray-500 mb-1">Professional Associations</h3>
                      <p className="text-gray-800">{memberData.associations}</p>
                    </div>
                  ) : (
                    <p className="text-gray-600 italic text-sm">Not a member of any associations</p>
                  )}

                  {memberData.collaboratesWithGovOrg && (
                    <div>
                      <h3 className="text-xs font-medium text-gray-500 mb-1">Government Collaborations</h3>
                      <p className="text-gray-800">{memberData.governmentCollaborations}</p>
                    </div>
                  )}
                </div>
              )}
            </section>

            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden    transition-shadow duration-200">
              <div
                className="flex justify-between items-center p-5 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => toggleSection('technology')}
              >
                <h2 className="text-lg font-semibold text-gray-800">Technology & Innovation</h2>
                <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  {expandedSections.technology ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </div>

              {expandedSections.technology && (
                <div className="px-5 py-4 border-t border-gray-100">
                  {memberData.usesDigitalSolutions ? (
                    <div className="mb-4">
                      <h3 className="text-xs font-medium text-gray-500 mb-1">Digital Solutions</h3>
                      <p className="text-gray-800">{memberData.digitalSolutionsTypes}</p>
                    </div>
                  ) : (
                    <p className="text-gray-600 italic text-sm">Does not currently use digital solutions</p>
                  )}

                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${memberData.interestedInDigitalCollaboration ? 'bg-[#5fb775]' : 'bg-gray-300'}`}></div>
                    <p className="text-gray-700 text-sm">
                      {memberData.interestedInDigitalCollaboration ? 'Open to digital collaboration' : 'Not seeking digital collaboration'}
                    </p>
                  </div>
                </div>
              )}
            </section>

            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden    transition-shadow duration-200">
              <div
                className="flex justify-between items-center p-5 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => toggleSection('regulatory')}
              >
                <h2 className="text-lg font-semibold text-gray-800">Regulatory Compliance</h2>
                <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  {expandedSections.regulatory ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </div>

              {expandedSections.regulatory && (
                <div className="px-5 py-4 border-t border-gray-100">
                  {memberData.isLicensed ? (
                    <div className="mb-4">
                      <h3 className="text-xs font-medium text-gray-500 mb-1">Regulatory Authority</h3>
                      <p className="text-gray-800">{memberData.regulatoryAuthority}</p>
                      <h3 className="text-xs font-medium text-gray-500 mb-1 mt-3">Registration Number</h3>
                      <p className="text-gray-800">{memberData.registrationNumber}</p>
                    </div>
                  ) : (
                    <p className="text-gray-600 italic text-sm">Licensing information not available</p>
                  )}

                  {memberData.hasInternationalCertifications && (
                    <div>
                      <h3 className="text-xs font-medium text-gray-500 mb-1">Certifications</h3>
                      <p className="text-gray-800">{memberData.certifications}</p>
                    </div>
                  )}
                </div>
              )}
            </section>

            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden    transition-shadow duration-200">
              <div
                className="flex justify-between items-center p-5 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => toggleSection('collaboration')}
              >
                <h2 className="text-lg font-semibold text-gray-800">Collaboration Interests</h2>
                <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  {expandedSections.collaboration ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </div>

              {expandedSections.collaboration && (
                <div className="px-5 py-4 border-t border-gray-100">
                  {memberData.interestedInCollaboration ? (
                    <div>
                      <h3 className="text-xs font-medium text-gray-500 mb-2">Collaboration Areas</h3>
                      <div className="flex flex-wrap gap-2">
                        {memberData.collaborationAreas.map((area) => (
                          <span
                            key={area}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#fb8c0118] text-[#fb8c01] border border-[#fb8c0130]"
                          >
                            {area.charAt(0).toUpperCase() + area.slice(1).replace(/-/g, ' ')}
                          </span>
                        ))}
                        {memberData.collaborationAreasOther && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#fb8c0118] text-[#fb8c01] border border-[#fb8c0130]">
                            {memberData.collaborationAreasOther}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600 italic text-sm">Not currently seeking collaborations</p>
                  )}
                </div>
              )}
            </section>
          </div>

          <div className="space-y-5">
            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden    transition-shadow duration-200">
              <div
                className="flex justify-between items-center p-5 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => toggleSection('contact')}
              >
                <h2 className="text-lg font-semibold text-gray-800">Contact Information</h2>
                <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  {expandedSections.contact ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </div>

              {expandedSections.contact && (
                <div className="px-5 py-4 border-t border-gray-100">
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Mail className="h-4 w-4 text-[#5fb775] mr-2" />
                        <a href={`mailto:${memberData.email}`} className="text-[#5fb775] hover:underline text-sm">{memberData.email}</a>
                      </div>
                      <div className="flex items-center mb-2">
                        <Phone className="h-4 w-4 text-[#5fb775] mr-2" />
                        <a href={`tel:${memberData.phone}`} className="text-[#5fb775] hover:underline text-sm">{memberData.phone}</a>
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 text-[#5fb775] mr-2" />
                        <a href={memberData.website} target="_blank" rel="noopener noreferrer" className="text-[#5fb775] hover:underline text-sm">{memberData.website}</a>
                      </div>
                    </div>

                    <div className="pt-2">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Contact Persons</h3>

                      <div className="bg-gray-50 rounded-lg p-4 mb-3">
                        <h4 className="font-medium text-gray-800 text-sm">{memberData.primaryContactName}</h4>
                        <p className="text-xs text-gray-600 mb-2">{memberData.primaryDesignation}</p>
                        <div className="flex items-center text-xs mb-1">
                          <Mail className="h-3 w-3 text-gray-500 mr-1" />
                          <a href={`mailto:${memberData.primaryEmail}`} className="text-gray-600 hover:text-[#5fb775]">{memberData.primaryEmail}</a>
                        </div>
                        <div className="flex items-center text-xs">
                          <Phone className="h-3 w-3 text-gray-500 mr-1" />
                          <a href={`tel:${memberData.primaryPhone}`} className="text-gray-600 hover:text-[#5fb775]">{memberData.primaryPhone}</a>
                        </div>
                      </div>

                      {memberData.secondaryContactName && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-800 text-sm">{memberData.secondaryContactName}</h4>
                          <p className="text-xs text-gray-600 mb-2">{memberData.secondaryDesignation}</p>
                          <div className="flex items-center text-xs mb-1">
                            <Mail className="h-3 w-3 text-gray-500 mr-1" />
                            <a href={`mailto:${memberData.secondaryEmail}`} className="text-gray-600 hover:text-[#5fb775]">{memberData.secondaryEmail}</a>
                          </div>
                          <div className="flex items-center text-xs">
                            <Phone className="h-3 w-3 text-gray-500 mr-1" />
                            <a href={`tel:${memberData.secondaryPhone}`} className="text-gray-600 hover:text-[#5fb775]">{memberData.secondaryPhone}</a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </section>

            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden    transition-shadow duration-200">
              <div
                className="flex justify-between items-center p-5 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => toggleSection('media')}
              >
                <h2 className="text-lg font-semibold text-gray-800">Social Media</h2>
                <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  {expandedSections.media ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </div>

              {expandedSections.media && (
                <div className="px-5 py-4 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-3">
                    <a href={memberData.linkedIn} target="_blank" rel="noopener noreferrer" 
                      className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                      <Linkedin className="h-4 w-4 text-[#5fb775] mr-2" />
                      <span className="text-gray-700 text-sm">LinkedIn</span>
                    </a>
                    <a href={memberData.twitter} target="_blank" rel="noopener noreferrer" 
                      className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                      <Twitter className="h-4 w-4 text-[#5fb775] mr-2" />
                      <span className="text-gray-700 text-sm">Twitter</span>
                    </a>
                    <a href={memberData.facebook} target="_blank" rel="noopener noreferrer" 
                      className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                      <Facebook className="h-4 w-4 text-[#5fb775] mr-2" />
                      <span className="text-gray-700 text-sm">Facebook</span>
                    </a>
                    <a href={memberData.instagram} target="_blank" rel="noopener noreferrer" 
                      className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                      <Instagram className="h-4 w-4 text-[#5fb775] mr-2" />
                      <span className="text-gray-700 text-sm">Instagram</span>
                    </a>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}