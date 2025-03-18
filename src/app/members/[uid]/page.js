'use client';

import React,{ useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Mail, Phone, Globe, ChevronLeft } from 'lucide-react';
import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import useFirebase from '@/hooks/useFirebase';

export default function MemberDetailPage({params}) {
  const unwrappedParams = React.use(params);
  const { uid } = unwrappedParams;

  console.log('ID:', uid);
  const { getMemberById } = useFirebase();

  // Convert to client component with useState for data
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch member data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMemberById(uid);
        console.log('data',data)

        setMemberData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (uid) {
      fetchData();
    }
  }, [uid, getMemberById]);

  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const [expandedSections, setExpandedSections] = useState({
    general: true,
    services: true,
    contact: true,
    ceo: true,
    affiliations: false,
    technology: false,
    regulatory: false,
    collaboration: false,
    media: false,
    additional: false
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
      'tech-firm': 'Health Technology & Innovation Company',
      'medical-equipment': 'Medical Equipment Manufacturer/Distributor',
      'oem': 'Original Equipment Manufacturer (OEM)',
      'staffing-agency': 'Medical/Nursing Staffing Agency',
      'laboratory': 'Medical Laboratory/Diagnostic Center',
      'association': 'Professional Association/Society',
      'ngo': 'Non-Governmental Organisation (NGO)',
      'academic': 'Academic/Research Institution',
      'other': 'Others'
    };

    return types?.map(type => typeLabels[type] || type).join(', ') || '';
  };

  const specLabels = {
    'primary-healthcare': 'Primary Healthcare',
    'secondary-healthcare': 'Secondary Healthcare',
    'tertiary-healthcare': 'Tertiary Healthcare',
    'pharmaceuticals': 'Pharmaceuticals Manufacturing & Distribution',
    'medical-equipment': 'Medical Equipment & Devices',
    'health-insurance': 'Health Insurance & Financing',
    'digital-health': 'Health Technology & Digital Health Solutions',
    'staffing-and-hr': 'Medical/Nursing Staffing & Human Resources',
    'medical-laboratory': 'Medical Laboratory & Diagnostics',
    'public-health': 'Public Health & Advocacy',
    'capacity-building': 'Capacity Building & Training',
    'research': 'Research & Development',
    'policy-regulation': 'Policy & Regulation',
    'other': 'Others'
  };

  if (loading) return <div className="flex justify-center items-center p-10 min-h-[65vh]">Loading member data...</div>;
  if (error) return (
    <div className="bg-white flex justify-center items-center border border-gray-100 rounded-lg p-8 text-center w-full min-h-[65vh]">
      <p className="text-gray-700 text-lg mb-4">No member found matching the member id.</p>
    </div>
  );
  if (!memberData) return <div className="p-10">No member data found</div>;

  const organizationInitials = getInitials(memberData.organizationName);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="bg-gradient-to-r from-[#fb8c01] to-[#5fb775] py-6 w-full shadow-sm">
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
            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden transition-shadow duration-200">
              <div
                className="flex justify-between items-center p-5 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => toggleSection('general')}
              >
                <h2 className="text-lg font-semibold text-gray-800">Organisation Overview</h2>
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
                      <h3 className="text-xs font-medium text-gray-500 mb-1">Organisation Type</h3>
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

            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden transition-shadow duration-200">
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
                  <div className="flex flex-wrap gap-2 mb-4">
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

                  {memberData.specialization.includes('medical-equipment') && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <h3 className="text-xs font-medium text-gray-500 mb-1">Customs Assistance</h3>
                      <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${memberData.interestedInDigitalCollaboration ? 'bg-[#5fb775]' : 'bg-gray-300'}`}></div>

                      <p className="text-gray-800 font-medium">
                        {memberData.requiresCustomsAssistance ? 'Requires customs clearance assistance' : 'Does not require customs assistance'}
                      </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden transition-shadow duration-200">
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

                      {memberData.membershipNumber && (
                        <div className="mt-3">
                          <h3 className="text-xs font-medium text-gray-500 mb-1">Membership Numbers</h3>
                          <p className="text-gray-800">{memberData.membershipNumber}</p>
                        </div>
                      )}
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

            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden transition-shadow duration-200">
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

            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden transition-shadow duration-200">
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

            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden transition-shadow duration-200">
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

            {memberData.additionalInfo && (
              <section className="bg-white border border-gray-100 rounded-xl overflow-hidden transition-shadow duration-200">
                <div
                  className="flex justify-between items-center p-5 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => toggleSection('additional')}
                >
                  <h2 className="text-lg font-semibold text-gray-800">Additional Information</h2>
                  <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                    {expandedSections.additional ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>

                {expandedSections.additional && (
                  <div className="px-5 py-4 border-t border-gray-100">
                    <p className="text-gray-700 text-sm">{memberData.additionalInfo}</p>
                  </div>
                )}
              </section>
            )}
          </div>

          <div className="space-y-5">
            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden transition-shadow duration-200">
              <div
                className="flex justify-between items-center p-5 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => toggleSection('ceo')}
              >
                <h2 className="text-lg font-semibold text-gray-800">CEO/Head of Organisation</h2>
                <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  {expandedSections.ceo ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </div>

              {expandedSections.ceo && (
                <div className="px-5 py-4 border-t border-gray-100">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 text-sm">{memberData.ceoName}</h4>
                    <p className="text-xs text-gray-600 mb-2">{memberData.ceoDesignation}</p>
                    <div className="flex items-center text-xs mb-1">
                      <Mail className="h-3 w-3 text-gray-500 mr-1" />
                      <a href={`mailto:${memberData.ceoEmail}`} className="text-gray-600 hover:text-[#5fb775]">{memberData.ceoEmail}</a>
                    </div>
                    <div className="flex items-center text-xs">
                      <Phone className="h-3 w-3 text-gray-500 mr-1" />
                      <a href={`tel:${memberData.ceoPhone}`} className="text-gray-600 hover:text-[#5fb775]">{memberData.ceoPhone}</a>
                    </div>
                    {memberData.isCeoPrimaryContact && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-600">Primary Contact for the Organization</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>

            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden transition-shadow duration-200">
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

                      {/* Show primary contact - either CEO or specific primary contact */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-3">
                        <h4 className="font-medium text-gray-800 text-sm">{memberData.primaryContactName ||  memberData.ceoName}</h4>
                        <p className="text-xs text-gray-600 mb-2">{memberData.primaryDesignation}</p>
                        <div className="flex items-center text-xs mb-1">
                          <Mail className="h-3 w-3 text-gray-500 mr-1" />
                          <a href={`mailto:${memberData.primaryEmail}`} className="text-gray-600 hover:text-[#5fb775]">{memberData.primaryEmail || memberData.ceoEmail}</a>
                        </div>
                        <div className="flex items-center text-xs">
                          <Phone className="h-3 w-3 text-gray-500 mr-1" />
                          <a href={`tel:${memberData.primaryPhone}`} className="text-gray-600 hover:text-[#5fb775]">{memberData.primaryPhone || memberData.ceoPhone}</a>
                        </div>
                        {memberData.isCeoPrimaryContact && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="text-xs text-gray-600 italic">CEO/Head of Organisation</p>
                          </div>
                        )}
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

            <section className="bg-white border border-gray-100 rounded-xl overflow-hidden transition-shadow duration-200">
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
                    {memberData.linkedIn && (
                      <a href={memberData.linkedIn} target="_blank" rel="noopener noreferrer"
                        className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                        <Linkedin className="h-4 w-4 text-[#5fb775] mr-2" />
                        <span className="text-gray-700 text-sm">LinkedIn</span>
                      </a>
                    )}
                    {memberData.twitter && (
                      <a href={memberData.twitter} target="_blank" rel="noopener noreferrer"
                        className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                        <Twitter className="h-4 w-4 text-[#5fb775] mr-2" />
                        <span className="text-gray-700 text-sm">Twitter</span>
                      </a>
                    )}
                    {memberData.facebook && (
                      <a href={memberData.facebook} target="_blank" rel="noopener noreferrer"
                        className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                        <Facebook className="h-4 w-4 text-[#5fb775] mr-2" />
                        <span className="text-gray-700 text-sm">Facebook</span>
                      </a>
                    )}
                    {memberData.instagram && (
                      <a href={memberData.instagram} target="_blank" rel="noopener noreferrer"
                        className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                        <Instagram className="h-4 w-4 text-[#5fb775] mr-2" />
                        <span className="text-gray-700 text-sm">Instagram</span>
                      </a>
                    )}
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
