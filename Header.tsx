import React from 'react';

interface HeaderProps {
  usageCount: number;
  maxUsage: number;
}

const Header: React.FC<HeaderProps> = ({ usageCount, maxUsage }) => {
  return (
    <header 
      className="sticky top-0 z-50 px-4 py-3 md:px-6 md:py-4"
      style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#0F6B5E' }}
          >
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <span className="font-bold text-lg" style={{ color: '#2C3E50' }}>
            Growth AI
          </span>
        </div>

        {/* Usage Counter */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: '#F1F5F9' }}>
          <span className="text-sm" style={{ color: '#64748B' }}>Daily:</span>
          <span className="font-semibold text-sm" style={{ color: '#0F6B5E' }}>
            {usageCount}/{maxUsage}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;