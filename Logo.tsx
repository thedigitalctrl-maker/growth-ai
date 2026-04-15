interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const dimensions = {
    sm: { width: 32, height: 32 },
    md: { width: 40, height: 40 },
    lg: { width: 48, height: 48 }
  };

  const { width, height } = dimensions[size];

  return (
    <div className="flex items-center gap-2">
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle cx="100" cy="100" r="90" fill="white" stroke="#0F6B5E" strokeWidth="4"/>
        
        {/* Upward arrow / growth arc */}
        <path 
          d="M60 120 L100 70 L140 120" 
          stroke="#0F6B5E" 
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none"
        />
        
        {/* Stylized G integrated with arrow */}
        <path 
          d="M100 70 L100 130 C100 150 120 155 130 140 L140 120" 
          stroke="#0A66C2" 
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none"
        />
        
        {/* Small accent dot */}
        <circle cx="100" cy="70" r="6" fill="#70B5F9"/>
      </svg>
      
      {showText && (
        <span className="font-semibold" style={{ color: '#2C3E50' }}>
          Growth AI
        </span>
      )}
    </div>
  );
}