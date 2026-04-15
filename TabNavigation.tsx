import type { TabType } from "../App";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'comments', label: 'Comment Assistant' },
    { id: 'bold', label: 'Bold Text' },
    { id: 'connect', label: 'Smart Connect' },
    { id: 'resume', label: 'Resume Studio' }
  ];

  return (
    <div className="flex gap-1 p-1 rounded-lg overflow-x-auto" style={{ backgroundColor: '#F1F5F9' }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap"
          style={{
            backgroundColor: activeTab === tab.id ? '#FFFFFF' : 'transparent',
            color: activeTab === tab.id ? '#0A66C2' : '#64748B',
            boxShadow: activeTab === tab.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}