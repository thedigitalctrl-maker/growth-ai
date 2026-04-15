import React from 'react';

type TabType = 'comments' | 'bold' | 'connect' | 'resume';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'comments', label: 'Comment Assistant' },
    { id: 'bold', label: 'Bold Text Maker' },
    { id: 'connect', label: 'Smart Connect' },
    { id: 'resume', label: 'Resume Builder' }
  ];

  return (
    <div className="tabs-container">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;