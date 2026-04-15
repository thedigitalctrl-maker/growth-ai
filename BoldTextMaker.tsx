import React, { useState } from 'react';
import { Copy, Check, Type } from 'lucide-react';
import { convertToBoldMath, convertToBoldSans } from '../utils/boldConverter';

interface BoldTextMakerProps {
  onCopy?: (text: string) => void;
}

const BoldTextMaker: React.FC<BoldTextMakerProps> = ({ onCopy }) => {
  const [inputText, setInputText] = useState('');
  const [boldMath, setBoldMath] = useState('');
  const [boldSans, setBoldSans] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleConvert = () => {
    setBoldMath(convertToBoldMath(inputText));
    setBoldSans(convertToBoldSans(inputText));
  };

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      if (onCopy) onCopy(text);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedId(id);
      if (onCopy) onCopy(text);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold" style={{ color: '#2C3E50' }}>
          Bold Text Maker
        </h2>
        <p className="text-sm mt-2" style={{ color: '#64748B' }}>
          Create bold text for LinkedIn headlines and posts
        </p>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <label 
          htmlFor="bold-input" 
          className="block text-sm font-semibold"
          style={{ color: '#2C3E50' }}
        >
          Type or Paste Text
        </label>
        <textarea
          id="bold-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to convert to bold..."
          className="textarea"
          style={{ minHeight: '80px' }}
        />
      </div>

      {/* Convert Button */}
      <button
        onClick={handleConvert}
        disabled={!inputText.trim()}
        className="btn btn-primary w-full"
      >
        <Type className="w-4 h-4" />
        Convert to Bold
      </button>

      {/* Outputs */}
      {(boldMath || boldSans) && (
        <div className="space-y-4 pt-4 animate-fade-in">
          {/* Mathematical Bold */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-sm font-medium" style={{ color: '#64748B' }}>
                  Mathematical Bold
                </span>
                <p className="text-xs" style={{ color: '#94A3B8' }}>
                  Classic bold style - works everywhere
                </p>
              </div>
              <button
                onClick={() => handleCopy(boldMath, 'math')}
                className="btn btn-outline text-sm"
                style={{
                  backgroundColor: copiedId === 'math' ? '#0A66C2' : '#FFFFFF',
                  color: copiedId === 'math' ? '#FFFFFF' : '#2C3E50'
                }}
              >
                {copiedId === 'math' ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <p 
              className="text-lg font-bold break-all p-3 rounded-lg"
              style={{ backgroundColor: '#F8FAFC', color: '#2C3E50' }}
            >
              {boldMath}
            </p>
          </div>

          {/* Sans-Serif Bold */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-sm font-medium" style={{ color: '#64748B' }}>
                  Sans-Serif Bold
                </span>
                <p className="text-xs" style={{ color: '#94A3B8' }}>
                  Modern clean bold - great for headlines
                </p>
              </div>
              <button
                onClick={() => handleCopy(boldSans, 'sans')}
                className="btn btn-outline text-sm"
                style={{
                  backgroundColor: copiedId === 'sans' ? '#0A66C2' : '#FFFFFF',
                  color: copiedId === 'sans' ? '#FFFFFF' : '#2C3E50'
                }}
              >
                {copiedId === 'sans' ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <p 
              className="text-lg font-bold break-all p-3 rounded-lg"
              style={{ backgroundColor: '#F8FAFC', color: '#2C3E50' }}
            >
              {boldSans}
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!boldMath && !boldSans && (
        <div className="text-center py-12">
          <Type className="w-12 h-12 mx-auto mb-4" style={{ color: '#CBD5E1' }} />
          <p className="text-sm" style={{ color: '#94A3B8' }}>
            Enter text above and click Convert to Bold to see results.
          </p>
        </div>
      )}
    </div>
  );
};

export default BoldTextMaker;