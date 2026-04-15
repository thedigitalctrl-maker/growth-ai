// Unicode bold character mappings
const BOLD_MATH_MAP: Record<string, string> = {
  'a': '\u{1D41A}', 'b': '\u{1D41B}', 'c': '\u{1D41C}', 'd': '\u{1D41D}',
  'e': '\u{1D41E}', 'f': '\u{1D41F}', 'g': '\u{1D420}', 'h': '\u{1D421}',
  'i': '\u{1D422}', 'j': '\u{1D423}', 'k': '\u{1D424}', 'l': '\u{1D425}',
  'm': '\u{1D426}', 'n': '\u{1D427}', 'o': '\u{1D428}', 'p': '\u{1D429}',
  'q': '\u{1D42A}', 'r': '\u{1D42B}', 's': '\u{1D42C}', 't': '\u{1D42D}',
  'u': '\u{1D42E}', 'v': '\u{1D42F}', 'w': '\u{1D430}', 'x': '\u{1D431}',
  'y': '\u{1D432}', 'z': '\u{1D433}',
  'A': '\u{1D400}', 'B': '\u{1D401}', 'C': '\u{1D402}', 'D': '\u{1D403}',
  'E': '\u{1D404}', 'F': '\u{1D405}', 'G': '\u{1D406}', 'H': '\u{1D407}',
  'I': '\u{1D408}', 'J': '\u{1D409}', 'K': '\u{1D40A}', 'L': '\u{1D40B}',
  'M': '\u{1D40C}', 'N': '\u{1D40D}', 'O': '\u{1D40E}', 'P': '\u{1D40F}',
  'Q': '\u{1D410}', 'R': '\u{1D411}', 'S': '\u{1D412}', 'T': '\u{1D413}',
  'U': '\u{1D414}', 'V': '\u{1D415}', 'W': '\u{1D416}', 'X': '\u{1D417}',
  'Y': '\u{1D418}', 'Z': '\u{1D419}',
  '0': '\u{1D7CE}', '1': '\u{1D7CF}', '2': '\u{1D7D0}', '3': '\u{1D7D1}',
  '4': '\u{1D7D2}', '5': '\u{1D7D3}', '6': '\u{1D7D4}', '7': '\u{1D7D5}',
  '8': '\u{1D7D6}', '9': '\u{1D7D7}'
};

const BOLD_SANS_MAP: Record<string, string> = {
  'a': '\u{1D5EE}', 'b': '\u{1D5EF}', 'c': '\u{1D5F0}', 'd': '\u{1D5F1}',
  'e': '\u{1D5F2}', 'f': '\u{1D5F3}', 'g': '\u{1D5F4}', 'h': '\u{1D5F5}',
  'i': '\u{1D5F6}', 'j': '\u{1D5F7}', 'k': '\u{1D5F8}', 'l': '\u{1D5F9}',
  'm': '\u{1D5FA}', 'n': '\u{1D5FB}', 'o': '\u{1D5FC}', 'p': '\u{1D5FD}',
  'q': '\u{1D5FE}', 'r': '\u{1D5FF}', 's': '\u{1D600}', 't': '\u{1D601}',
  'u': '\u{1D602}', 'v': '\u{1D603}', 'w': '\u{1D604}', 'x': '\u{1D605}',
  'y': '\u{1D606}', 'z': '\u{1D607}',
  'A': '\u{1D5D4}', 'B': '\u{1D5D5}', 'C': '\u{1D5D6}', 'D': '\u{1D5D7}',
  'E': '\u{1D5D8}', 'F': '\u{1D5D9}', 'G': '\u{1D5DA}', 'H': '\u{1D5DB}',
  'I': '\u{1D5DC}', 'J': '\u{1D5DD}', 'K': '\u{1D5DE}', 'L': '\u{1D5DF}',
  'M': '\u{1D5E0}', 'N': '\u{1D5E1}', 'O': '\u{1D5E2}', 'P': '\u{1D5E3}',
  'Q': '\u{1D5E4}', 'R': '\u{1D5E5}', 'S': '\u{1D5E6}', 'T': '\u{1D5E7}',
  'U': '\u{1D5E8}', 'V': '\u{1D5E9}', 'W': '\u{1D5EA}', 'X': '\u{1D5EB}',
  'Y': '\u{1D5EC}', 'Z': '\u{1D5ED}',
  '0': '\u{1D7EC}', '1': '\u{1D7ED}', '2': '\u{1D7EE}', '3': '\u{1D7EF}',
  '4': '\u{1D7F0}', '5': '\u{1D7F1}', '6': '\u{1D7F2}', '7': '\u{1D7F3}',
  '8': '\u{1D7F4}', '9': '\u{1D7F5}'
};

export function convertToBoldMath(text: string): string {
  return text.split('').map(char => BOLD_MATH_MAP[char] || char).join('');
}

export function convertToBoldSans(text: string): string {
  return text.split('').map(char => BOLD_SANS_MAP[char] || char).join('');
}