'use client'
import { useState, useEffect } from 'react';
import MemberCard from '@/components/MemberCard';
import { Loader2 } from 'lucide-react';

export default function MembersDirectory() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    organizationType: '',
    specialization: '',
    region: '',
  });

  const [regions, setRegions] = useState([]);
  const organizationTypes = [
    { value: '', label: 'All Types' },
    { value: 'healthcare-provider', label: 'Healthcare Provider' },
    { value: 'pharmaceutical', label: 'Pharmaceutical Company' },
    { value: 'insurance', label: 'Health Insurance Provider' },
    { value: 'tech-firm', label: 'Health Technology Firm' },
    { value: 'association', label: 'Professional Association' },
    { value: 'government', label: 'Government/Regulatory Body' },
    { value: 'ngo', label: 'NGO' },
    { value: 'academic', label: 'Academic/Research Institution' },
    { value: 'other', label: 'Others' }
  ];

  const specializations = [
    { value: '', label: 'All Specializations' },
    { value: 'primary-healthcare', label: 'Primary Healthcare' },
    { value: 'secondary-healthcare', label: 'Secondary Healthcare' },
    { value: 'tertiary-healthcare', label: 'Tertiary Healthcare' },
    { value: 'pharmaceuticals', label: 'Pharmaceuticals' },
    { value: 'medical-equipment', label: 'Medical Equipment & Supplies' },
    { value: 'health-insurance', label: 'Health Insurance & Financing' },
    { value: 'public-health', label: 'Public Health & Advocacy' },
    { value: 'health-technology', label: 'Health Technology & Innovation' },
    { value: 'capacity-building', label: 'Capacity Building & Training' },
    { value: 'research', label: 'Research & Development' },
    { value: 'other', label: 'Others' }
  ];

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        // Simulate a network request with a timeout
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock data
        const mockData = [
          {
            id: '1',
            organizationName: 'Sunshine Healthcare Alliance',
            description: 'A leading provider of primary healthcare services focusing on maternal and child health across Nigeria.',
            organizationType: ['healthcare-provider'],
            specialization: ['primary-healthcare', 'public-health'],
            region: 'South West',
            email: 'info@sunshinehealthcare.org',
            website: 'https://www.sunshinehealthcare.org',
            phone: '+234-801-234-5678'
          },
          {
            id: '2',
            organizationName: 'NigeriaMed Pharmaceuticals',
            description: 'Manufacturer and distributor of essential medicines with a focus on affordable healthcare solutions.',
            organizationType: ['pharmaceutical'],
            specialization: ['pharmaceuticals', 'medical-equipment'],
            region: 'North Central',
            email: 'contact@nigeriamed.com',
            website: 'https://www.nigeriamed.com',
            phone: '+234-802-345-6789'
          },
          {
            id: '3',
            organizationName: 'HealthTech Nigeria',
            description: 'Developing innovative digital health solutions to enhance healthcare delivery and accessibility.',
            organizationType: ['tech-firm'],
            specialization: ['health-technology', 'capacity-building'],
            region: 'Lagos',
            email: 'hello@healthtechng.com',
            website: 'https://www.healthtechng.com',
            phone: '+234-803-456-7890'
          },
          {
            id: '4',
            organizationName: 'Nigerian Medical Research Institute',
            description: 'Conducting groundbreaking research in tropical diseases and public health challenges in Africa.',
            organizationType: ['academic', 'government'],
            specialization: ['research', 'public-health'],
            region: 'Abuja',
            email: 'research@nmri.gov.ng',
            website: 'https://www.nmri.gov.ng',
            phone: '+234-804-567-8901'
          }
        ];

        const regionsSet = new Set(mockData.map(member => member.region));

        setMembers(mockData);
        setFilteredMembers(mockData);
        setRegions(Array.from(regionsSet).sort());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching members:', error);
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    // Apply filters and search
    let results = [...members];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        member =>
          member.organizationName?.toLowerCase().includes(term) ||
          member.description?.toLowerCase().includes(term)
      );
    }

    // Apply organization type filter
    if (filters.organizationType) {
      results = results.filter(
        member => member.organizationType?.includes(filters.organizationType)
      );
    }

    // Apply specialization filter
    if (filters.specialization) {
      results = results.filter(
        member => member.specialization?.includes(filters.specialization)
      );
    }

    // Apply region filter
    if (filters.region) {
      results = results.filter(
        member => member.region === filters.region
      );
    }

    setFilteredMembers(results);
  }, [searchTerm, filters, members]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      organizationType: '',
      specialization: '',
      region: '',
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header with shadow */}
      <div className="bg-gradient-to-r from-[#fb8c01] to-[#5fb775] py-8 w-full shadow-sm">
        <div className="container mx-auto px-6 w-full">
          <h1 className="text-3xl font-bold text-white mb-3">HFN Members Directory</h1>
          <p className="text-white font-medium">
            Find and connect with healthcare professionals and organizations across Nigeria.
          </p>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 md:px-6  py-8 pt-0 w-full">
        {/* Search and Filters - Modernized UI with collapsible filters */}
        <div className="bg-white   mb-8 overflow-hidden w-full mt-0 border border-gray-100">
          {/* Search bar and filter toggle in same row */}
          <div className="p-6 flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-5 py-3 pl-12 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5fb775] focus:border-transparent transition-all"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-gray-400 absolute left-4 top-3.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <button
              onClick={toggleFilters}
              className="flex items-center justify-center px-5 py-3 bg-[#fb8c01] text-white rounded-lg hover:bg-[#e17d01] transition-colors focus:outline-none focus:ring-2 focus:ring-[#fb8c01] focus:ring-opacity-50 font-medium md:w-auto w-full"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Collapsible Filters */}
          {showFilters && (
            <div className="px-6 pb-6 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-[#fb8c01] hover:text-orange-600 text-sm font-medium flex items-center transition-colors focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Organization Type Filter */}
                <div>
                  <label htmlFor="organizationType" className="block text-sm font-medium text-gray-600 mb-2">
                    Organization Type
                  </label>
                  <div className="relative">
                    <select
                      id="organizationType"
                      name="organizationType"
                      value={filters.organizationType}
                      onChange={handleFilterChange}
                      className="w-full appearance-none bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5fb775] focus:border-transparent transition-all"
                    >
                      {organizationTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Specialization Filter */}
                <div>
                  <label htmlFor="specialization" className="block text-sm font-medium text-gray-600 mb-2">
                    Specialization
                  </label>
                  <div className="relative">
                    <select
                      id="specialization"
                      name="specialization"
                      value={filters.specialization}
                      onChange={handleFilterChange}
                      className="w-full appearance-none bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5fb775] focus:border-transparent transition-all"
                    >
                      {specializations.map((spec) => (
                        <option key={spec.value} value={spec.value}>
                          {spec.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Region Filter */}
                <div>
                  <label htmlFor="region" className="block text-sm font-medium text-gray-600 mb-2">
                    Region
                  </label>
                  <div className="relative">
                    <select
                      id="region"
                      name="region"
                      value={filters.region}
                      onChange={handleFilterChange}
                      className="w-full appearance-none bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5fb775] focus:border-transparent transition-all"
                    >
                      <option value="">All Regions</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="w-full">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className=" animate-spin w-12 h-12 text-[#5fb775] " />
            </div>
          ) : (
            <>
              <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
                <p className="text-gray-600 font-medium">
                  {filteredMembers.length} {filteredMembers.length === 1 ? 'result' : 'results'} found
                </p>

              </div>

              {filteredMembers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {filteredMembers.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-gray-100 rounded-lg p-8 text-center w-full">
                  <p className="text-gray-700 text-lg mb-4">No members found matching your criteria.</p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2.5 bg-[#fb8c01] text-white rounded-lg hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#fb8c01] focus:ring-opacity-50 font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}