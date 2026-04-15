export function AboutSection() {
  return (
    <div 
      className="rounded-xl p-4 sm:p-5 mb-6 shadow-sm border"
      style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">✨</span>
        <h3 
          className="font-semibold text-lg"
          style={{ color: '#0A66C2' }}
        >
          About Growth AI
        </h3>
      </div>
      
      <div 
        className="text-sm space-y-2"
        style={{ color: '#2C3E50' }}
      >
        <p>
          <strong>Boost your LinkedIn engagement</strong> with AI-powered comment suggestions. 
          Choose from 5 unique tones to match your personal brand.
        </p>
        <p className="text-slate-600">
          🎯 <strong>Daily Limit:</strong> 10 free generations per day • Bold text maker is unlimited
        </p>
      </div>

      <details className="mt-3 group">
        <summary 
          className="cursor-pointer text-xs font-medium flex items-center gap-1 hover:underline"
          style={{ color: '#0A66C2' }}
        >
          <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
          Tap for full guide
        </summary>
        
        <div 
          className="mt-3 p-3 sm:p-4 rounded-lg text-xs sm:text-sm space-y-3"
          style={{ backgroundColor: '#F8FAFC' }}
        >
          <div>
            <h4 className="font-semibold mb-1" style={{ color: '#0A66C2' }}>
              📝 How to Use AI Comments
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-slate-600">
              <li>Copy a LinkedIn post you want to engage with</li>
              <li>Paste it into the text area above</li>
              <li>Select your desired comment tone</li>
              <li>Click "Generate" to get 3 unique suggestions</li>
              <li>Copy your favorite and personalize it</li>
            </ol>
          </div>

          <div>
            <h4 className="font-semibold mb-1" style={{ color: '#0A66C2' }}>
              🔤 Bold Text Maker
            </h4>
            <p className="text-slate-600">
              Make your LinkedIn headlines and key phrases stand out with Unicode bold text. 
              Works in posts, comments, and your profile headline — unlimited use!
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-1" style={{ color: '#0A66C2' }}>
              💡 Pro Tips
            </h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Personalize AI comments for authentic engagement</li>
              <li>Use bold text sparingly for maximum impact</li>
              <li>Early comments get more visibility</li>
              <li>Ask questions to spark discussions</li>
            </ul>
          </div>
        </div>
      </details>
    </div>
  );
}