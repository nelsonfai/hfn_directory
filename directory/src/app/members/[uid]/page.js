'use client'
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Mail, Phone, Globe, User, Briefcase } from 'lucide-react';
import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react'; 

export default function MemberDetailPage() {
  const memberData = {
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="bg-gradient-to-r from-[#fb8c01] to-[#5fb775] py-8 w-full shadow-md">
        <div className="container mx-auto px-6 w-full">
          <div className="flex items-center mb-4">
            <Link
              href="/members"
              className="text-white flex items-center hover:underline"
            >
              <ChevronDown className="h-5 w-5 mr-2 transform rotate-90" />
              Back to Directory
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{memberData.organizationName}</h1>
          <p className="text-white font-medium">
            {formatOrganizationTypes(memberData.organizationType)} • Established {memberData.yearEstablished}
          </p>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div
                className="flex justify-between items-center p-6 cursor-pointer"
                onClick={() => toggleSection('general')}
              >
                <h2 className="text-xl font-semibold text-gray-800">Organization Overview</h2>
                <button className="text-gray-500">
                  {expandedSections.general ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                </button>
              </div>

              {expandedSections.general && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {memberData.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Year Established</h3>
                      <p className="text-gray-800">{memberData.yearEstablished}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Region</h3>
                      <p className="text-gray-800">{memberData.region}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Organization Type</h3>
                      <p className="text-gray-800">{formatOrganizationTypes(memberData.organizationType)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
                      <p className="text-gray-800">{memberData.address}</p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div
                className="flex justify-between items-center p-6 cursor-pointer"
                onClick={() => toggleSection('services')}
              >
                <h2 className="text-xl font-semibold text-gray-800">Services & Specialization</h2>
                <button className="text-gray-500">
                  {expandedSections.services ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                </button>
              </div>

              {expandedSections.services && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {memberData.specialization.map((spec) => (
                      <span
                        key={spec}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#5fb77522] text-[#5fb775]"
                      >
                        {specLabels[spec] || spec}
                      </span>
                    ))}
                    {memberData.specializationOther && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#5fb77522] text-[#5fb775]">
                        {memberData.specializationOther}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </section>

            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div
                className="flex justify-between items-center p-6 cursor-pointer"
                onClick={() => toggleSection('affiliations')}
              >
                <h2 className="text-xl font-semibold text-gray-800">Affiliations & Memberships</h2>
                <button className="text-gray-500">
                  {expandedSections.affiliations ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                </button>
              </div>

              {expandedSections.affiliations && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                  {memberData.memberOfAssociations ? (
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Professional Associations</h3>
                      <p className="text-gray-800">{memberData.associations}</p>
                    </div>
                  ) : (
                    <p className="text-gray-600 italic">Not a member of any associations</p>
                  )}

                  {memberData.collaboratesWithGovOrg && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Government Collaborations</h3>
                      <p className="text-gray-800">{memberData.governmentCollaborations}</p>
                    </div>
                  )}
                </div>
              )}
            </section>

            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div
                className="flex justify-between items-center p-6 cursor-pointer"
                onClick={() => toggleSection('technology')}
              >
                <h2 className="text-xl font-semibold text-gray-800">Technology & Innovation</h2>
                <button className="text-gray-500">
                  {expandedSections.technology ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                </button>
              </div>

              {expandedSections.technology && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                  {memberData.usesDigitalSolutions ? (
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Digital Solutions</h3>
                      <p className="text-gray-800">{memberData.digitalSolutionsTypes}</p>
                    </div>
                  ) : (
                    <p className="text-gray-600 italic">Does not currently use digital solutions</p>
                  )}

                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${memberData.interestedInDigitalCollaboration ? 'bg-[#5fb775]' : 'bg-gray-300'}`}></div>
                    <p className="text-gray-700">
                      {memberData.interestedInDigitalCollaboration ? 'Open to digital collaboration' : 'Not seeking digital collaboration'}
                    </p>
                  </div>
                </div>
              )}
            </section>

            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div
                className="flex justify-between items-center p-6 cursor-pointer"
                onClick={() => toggleSection('regulatory')}
              >
                <h2 className="text-xl font-semibold text-gray-800">Regulatory Compliance</h2>
                <button className="text-gray-500">
                  {expandedSections.regulatory ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                </button>
              </div>

              {expandedSections.regulatory && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                  {memberData.isLicensed ? (
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Regulatory Authority</h3>
                      <p className="text-gray-800">{memberData.regulatoryAuthority}</p>
                      <h3 className="text-sm font-medium text-gray-500 mb-1 mt-3">Registration Number</h3>
                      <p className="text-gray-800">{memberData.registrationNumber}</p>
                    </div>
                  ) : (
                    <p className="text-gray-600 italic">Licensing information not available</p>
                  )}

                  {memberData.hasInternationalCertifications && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Certifications</h3>
                      <p className="text-gray-800">{memberData.certifications}</p>
                    </div>
                  )}
                </div>
              )}
            </section>

            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div
                className="flex justify-between items-center p-6 cursor-pointer"
                onClick={() => toggleSection('collaboration')}
              >
                <h2 className="text-xl font-semibold text-gray-800">Collaboration Interests</h2>
                <button className="text-gray-500">
                  {expandedSections.collaboration ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                </button>
              </div>

              {expandedSections.collaboration && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                  {memberData.interestedInCollaboration ? (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Collaboration Areas</h3>
                      <div className="flex flex-wrap gap-2">
                        {memberData.collaborationAreas.map((area) => (
                          <span
                            key={area}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#fb8c0122] text-[#fb8c01]"
                          >
                            {area.charAt(0).toUpperCase() + area.slice(1).replace(/-/g, ' ')}
                          </span>
                        ))}
                        {memberData.collaborationAreasOther && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#fb8c0122] text-[#fb8c01]">
                            {memberData.collaborationAreasOther}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600 italic">Not currently seeking collaborations</p>
                  )}
                </div>
              )}
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div
                className="flex justify-between items-center p-6 cursor-pointer"
                onClick={() => toggleSection('contact')}
              >
                <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
                <button className="text-gray-500">
                  {expandedSections.contact ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                </button>
              </div>

              {expandedSections.contact && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <Mail className="h-5 w-5 text-[#5fb775] mr-2" />
                        <a href={`mailto:${memberData.email}`} className="text-[#5fb775] hover:underline">{memberData.email}</a>
                      </div>
                      <div className="flex items-center mb-2">
                        <Phone className="h-5 w-5 text-[#5fb775] mr-2" />
                        <a href={`tel:${memberData.phone}`} className="text-[#5fb775] hover:underline">{memberData.phone}</a>
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-5 w-5 text-[#5fb775] mr-2" />
                        <a href={memberData.website} target="_blank" rel="noopener noreferrer" className="text-[#5fb775] hover:underline">{memberData.website}</a>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <h3 className="text-md font-medium text-gray-700 mb-3">Contact Persons</h3>

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-800">{memberData.primaryContactName}</h4>
                        <p className="text-sm text-gray-600 mb-1">{memberData.primaryDesignation}</p>
                        <div className="flex items-center text-sm mb-1">
                          <Mail className="h-4 w-4 text-gray-500 mr-1" />
                          <a href={`mailto:${memberData.primaryEmail}`} className="text-gray-600 hover:text-[#5fb775]">{memberData.primaryEmail}</a>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 text-gray-500 mr-1" />
                          <a href={`tel:${memberData.primaryPhone}`} className="text-gray-600 hover:text-[#5fb775]">{memberData.primaryPhone}</a>
                        </div>
                      </div>

                      {memberData.secondaryContactName && (
                        <div>
                          <h4 className="font-medium text-gray-800">{memberData.secondaryContactName}</h4>
                          <p className="text-sm text-gray-600 mb-1">{memberData.secondaryDesignation}</p>
                          <div className="flex items-center text-sm mb-1">
                            <Mail className="h-4 w-4 text-gray-500 mr-1" />
                            <a href={`mailto:${memberData.secondaryEmail}`} className="text-gray-600 hover:text-[#5fb775]">{memberData.secondaryEmail}</a>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 text-gray-500 mr-1" />
                            <a href={`tel:${memberData.secondaryPhone}`} className="text-gray-600 hover:text-[#5fb775]">{memberData.secondaryPhone}</a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </section>

            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div
                className="flex justify-between items-center p-6 cursor-pointer"
                onClick={() => toggleSection('media')}
              >
                <h2 className="text-xl font-semibold text-gray-800">Social Media</h2>
                <button className="text-gray-500">
                  {expandedSections.media ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                </button>
              </div>

              {expandedSections.media && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                  <div className="flex items-center mb-2">
                    <Linkedin className="h-5 w-5 text-[#5fb775] mr-2" />
                    <a href={memberData.linkedIn} target="_blank" rel="noopener noreferrer" className="text-[#5fb775] hover:underline">LinkedIn</a>
                  </div>
                  <div className="flex items-center mb-2">
                    <Twitter className="h-5 w-5 text-[#5fb775] mr-2" />
                    <a href={memberData.twitter} target="_blank" rel="noopener noreferrer" className="text-[#5fb775] hover:underline">Twitter</a>
                  </div>
                  <div className="flex items-center mb-2">
                    <Facebook className="h-5 w-5 text-[#5fb775] mr-2" />
                    <a href={memberData.facebook} target="_blank" rel="noopener noreferrer" className="text-[#5fb775] hover:underline">Facebook</a>
                  </div>
                  <div className="flex items-center">
                    <Instagram className="h-5 w-5 text-[#5fb775] mr-2" />
                    <a href={memberData.instagram} target="_blank" rel="noopener noreferrer" className="text-[#5fb775] hover:underline">Instagram</a>
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
