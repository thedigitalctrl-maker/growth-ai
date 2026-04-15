export function Footer() {
  return (
    <footer className="border-t py-6" style={{ borderColor: '#E2E8F0', backgroundColor: '#FFFFFF' }}>
      <div className="max-w-xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <a 
            href="#" 
            className="hover:underline"
            style={{ color: '#64748B' }}
          >
            Feedback
          </a>
          <a 
            href="#" 
            className="hover:underline"
            style={{ color: '#64748B' }}
          >
            Privacy
          </a>
          <a 
            href="#" 
            className="hover:underline"
            style={{ color: '#64748B' }}
          >
            Terms
          </a>
        </div>
        <p className="text-center text-xs mt-4" style={{ color: '#94A3B8' }}>
          Growth AI - LinkedIn Comment Assistant
        </p>
      </div>
    </footer>
  );
}