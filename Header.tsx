import { Logo } from "./Logo";

interface HeaderProps {
  used: number;
  limit: number;
}

export function Header({ used, limit }: HeaderProps) {
  return (
    <header 
      className="sticky top-0 z-50 border-b"
      style={{ borderColor: '#E2E8F0', backgroundColor: '#FFFFFF' }}
    >
      <div className="max-w-xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Logo size="md" showText={true} />
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: '#F1F5F9' }}>
            <span className="text-sm" style={{ color: '#64748B' }}>Daily usage:</span>
            <span 
              className="text-sm font-semibold"
              style={{ color: used >= limit ? '#DC2626' : '#0F6B5E' }}
            >
              {used}/{limit}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}