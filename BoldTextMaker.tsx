import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import { convertToBoldMath, convertToBoldSans } from "../utils/boldTextConverter";

interface BoldTextMakerProps {
  onCopy?: (text: string) => void;
}

export function BoldTextMaker({ onCopy }: BoldTextMakerProps) {
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
      if (onCopy) {
        onCopy(text);
      }
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedId(id);
      if (onCopy) {
        onCopy(text);
      }
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="space-y-2">
        <Label htmlFor="bold-input" style={{ color: '#2C3E50' }}>Type or Paste Text</Label>
        <Textarea
          id="bold-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to convert to bold..."
          className="min-h-24 resize-none"
        />
      </div>

      {/* Convert button */}
      <Button
        onClick={handleConvert}
        disabled={!inputText.trim()}
        className="w-full font-semibold"
        style={{ backgroundColor: '#0A66C2', color: '#FFFFFF' }}
      >
        Convert to Bold
      </Button>

      {/* Outputs */}
      {(boldMath || boldSans) && (
        <div className="space-y-4 pt-4">
          {/* Mathematical Bold */}
          <Card className="border-slate-200">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: '#64748B' }}>
                  Mathematical Bold
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(boldMath, 'math')}
                >
                  {copiedId === 'math' ? (
                    <>
                      <Check className="w-3 h-3 mr-1" />
                      Copied to clipboard
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <p className="text-lg font-bold break-all" style={{ color: '#2C3E50' }}>
                {boldMath}
              </p>
            </CardContent>
          </Card>

          {/* Sans-Serif Bold */}
          <Card className="border-slate-200">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: '#64748B' }}>
                  Sans-Serif Bold
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(boldSans, 'sans')}
                >
                  {copiedId === 'sans' ? (
                    <>
                      <Check className="w-3 h-3 mr-1" />
                      Copied to clipboard
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <p className="text-lg font-bold break-all" style={{ color: '#2C3E50' }}>
                {boldSans}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty state */}
      {!boldMath && !boldSans && (
        <p className="text-sm text-center py-8" style={{ color: '#94A3B8' }}>
          Enter text above and click Convert to Bold to see results.
        </p>
      )}
    </div>
  );
}