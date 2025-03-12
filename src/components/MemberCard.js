import React from 'react';
import Link from 'next/link';
import { MapPin, Mail, Phone, Globe, ExternalLink } from 'lucide-react';

const MemberCard = ({ member }) => {
  // Simple hash function to determine which branded color to use
  const getBrandedColor = (name) => {
    const nameHash = name
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0) % 2;
    
    // Use only the primary colors instead of gradients
    return nameHash === 0 
      ? '#fb8c01'  // Orange (primary brand color)
      : '#5fb775'; // Green (secondary brand color)
  };
  
  // Extract initials for logo placeholder
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const brandColor = getBrandedColor(member.organizationName);
  const initials = getInitials(member.organizationName);

  return (
    <div className="bg-white border border-gray-200  rounded-lg overflow-hidden transition-all duration-300 hover:shadow-sm hover:border-gray-200">
      <div className="p-5">
        <div className="flex items-start mb-4 gap-3">
          {/* Logo or initials placeholder - single color instead of gradient */}
          <div 
            className="flex-shrink-0 w-12 h-12 rounded-md flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: brandColor }}
          >
            {initials}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-1" title={member.organizationName}>
              {member.organizationName}
            </h3>
            
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{member.region}</span>
            </div>
          </div>
        </div>
        
        {member.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2" title={member.description}>
            {member.description}
          </p>
        )}
        
        {member.organizationType?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {member.organizationType.map((type, index) => (
              <span 
                key={`${member.id}-${type}-${index}`}
                className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600"
              >
                {formatLabel(type)}
              </span>
            ))}
          </div>
        )}
        
        {member.specialization?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {member.specialization.map((spec, index) => (
              <span 
                key={`${member.id}-${spec}-${index}`}
                className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600"
              >
                {formatLabel(spec)}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-1 gap-1.5">
          {member.email && (
            <div className="flex items-center">
              <Mail className="h-3.5 w-3.5 text-gray-400 mr-2" />
              <a href={`mailto:${member.email}`} className="text-xs text-gray-500 hover:text-gray-700 truncate">
                {member.email}
              </a>
            </div>
          )}
          
          {member.phone && (
            <div className="flex items-center">
              <Phone className="h-3.5 w-3.5 text-gray-400 mr-2" />
              <a href={`tel:${member.phone}`} className="text-xs text-gray-500 hover:text-gray-700">
                {member.phone}
              </a>
            </div>
          )}
          
          {member.website && (
            <div className="flex items-center">
              <Globe className="h-3.5 w-3.5 text-gray-400 mr-2" />
              <a href={member.website} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-gray-700 truncate">
                {member.website}
              </a>
            </div>
          )}
        </div>
        
        <div className="mt-3 flex ">
          <Link href={`/members/${member.id}`} passHref>
            <span 
              className="inline-flex items-center text-xs font-medium cursor-pointer transition-colors duration-200"
              style={{ color: brandColor }}
            >
              View Profile
              <ExternalLink className="h-3.5 w-3.5 ml-1" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Helper function to format labels
const formatLabel = (value) => {
  const formatted = value.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  return formatted;
};

export default MemberCard;