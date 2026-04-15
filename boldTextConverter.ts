// Unicode bold character mappings
const BOLD_MATH_MAP: Record<string, string> = {
  'a': '\uD835\uDC00', 'b': '\uD835\uDC01', 'c': '\uD835\uDC02', 'd': '\uD835\uDC03',
  'e': '\uD835\uDC04', 'f': '\uD835\uDC05', 'g': '\uD835\uDC06', 'h': '\uD835\uDC07',
  'i': '\uD835\uDC08', 'j': '\uD835\uDC09', 'k': '\uD835\uDC0A', 'l': '\uD835\uDC0B',
  'm': '\uD835\uDC0C', 'n': '\uD835\uDC0D', 'o': '\uD835\uDC0E', 'p': '\uD835\uDC0F',
  'q': '\uD835\uDC10', 'r': '\uD835\uDC11', 's': '\uD835\uDC12', 't': '\uD835\uDC13',
  'u': '\uD835\uDC14', 'v': '\uD835\uDC15', 'w': '\uD835\uDC16', 'x': '\uD835\uDC17',
  'y': '\uD835\uDC18', 'z': '\uD835\uDC19',
  'A': '\uD835\uDC00'.toUpperCase(), 'B': '\uD835\uDC01'.toUpperCase(), 'C': '\uD835\uDC02'.toUpperCase(),
  'D': '\uD835\uDC03'.toUpperCase(), 'E': '\uD835\uDC04'.toUpperCase(), 'F': '\uD835\uDC05'.toUpperCase(),
  'G': '\uD835\uDC06'.toUpperCase(), 'H': '\uD835\uDC07'.toUpperCase(), 'I': '\uD835\uDC08'.toUpperCase(),
  'J': '\uD835\uDC09'.toUpperCase(), 'K': '\uD835\uDC0A'.toUpperCase(), 'L': '\uD835\uDC0B'.toUpperCase(),
  'M': '\uD835\uDC0C'.toUpperCase(), 'N': '\uD835\uDC0D'.toUpperCase(), 'O': '\uD835\uDC0E'.toUpperCase(),
  'P': '\uD835\uDC0F'.toUpperCase(), 'Q': '\uD835\uDC10'.toUpperCase(), 'R': '\uD835\uDC11'.toUpperCase(),
  'S': '\uD835\uDC12'.toUpperCase(), 'T': '\uD835\uDC13'.toUpperCase(), 'U': '\uD835\uDC14'.toUpperCase(),
  'V': '\uD835\uDC15'.toUpperCase(), 'W': '\uD835\uDC16'.toUpperCase(), 'X': '\uD835\uDC17'.toUpperCase(),
  'Y': '\uD835\uDC18'.toUpperCase(), 'Z': '\uD835\uDC19'.toUpperCase(),
  '0': '\uD835\uD7CE', '1': '\uD835\uD7CF', '2': '\uD835\uD7D0', '3': '\uD835\uD7D1',
  '4': '\uD835\uD7D2', '5': '\uD835\uD7D3', '6': '\uD835\uD7D4', '7': '\uD835\uD7D5',
  '8': '\uD835\uD7D6', '9': '\uD835\uD7D7'
};

const BOLD_SANS_MAP: Record<string, string> = {
  'a': '\uD835\uDDA4', 'b': '\uD835\uDDA5', 'c': '\uD835\uDDA6', 'd': '\uD835\uDDA7',
  'e': '\uD835\uDDA8', 'f': '\uD835\uDDA9', 'g': '\uD835\uDDAA', 'h': '\uD835\uDDAB',
  'i': '\uD835\uDDAC', 'j': '\uD835\uDDAD', 'k': '\uD835\uDDAE', 'l': '\uD835\uDDAF',
  'm': '\uD835\uDDB0', 'n': '\uD835\uDDB1', 'o': '\uD835\uDDB2', 'p': '\uD835\uDDB3',
  'q': '\uD835\uDDB4', 'r': '\uD835\uDDB5', 's': '\uD835\uDDB6', 't': '\uD835\uDDB7',
  'u': '\uD835\uDDB8', 'v': '\uD835\uDDB9', 'w': '\uD835\uDDBA', 'x': '\uD835\uDDBB',
  'y': '\uD835\uDDBC', 'z': '\uD835\uDDBD',
  'A': '\uD835\uDD70', 'B': '\uD835\uDD71', 'C': '\uD835\uDD72', 'D': '\uD835\uDD73',
  'E': '\uD835\uDD74', 'F': '\uD835\uDD75', 'G': '\uD835\uDD76', 'H': '\uD835\uDD77',
  'I': '\uD835\uDD78', 'J': '\uD835\uDD79', 'K': '\uD835\uDD7A', 'L': '\uD835\uDD7B',
  'M': '\uD835\uDD7C', 'N': '\uD835\uDD7D', 'O': '\uD835\uDD7E', 'P': '\uD835\uDD7F',
  'Q': '\uD835\uDD80', 'R': '\uD835\uDD81', 'S': '\uD835\uDD82', 'T': '\uD835\uDD83',
  'U': '\uD835\uDD84', 'V': '\uD835\uDD85', 'W': '\uD835\uDD86', 'X': '\uD835\uDD87',
  'Y': '\uD835\uDD88', 'Z': '\uD835\uDD89',
  '0': '\uD835\uDEF0', '1': '\uD835\uDEF1', '2': '\uD835\uDEF2', '3': '\uD835\uDEF3',
  '4': '\uD835\uDEF4', '5': '\uD835\uDEF5', '6': '\uD835\uDEF6', '7': '\uD835\uDEF7',
  '8': '\uD835\uDEF8', '9': '\uD835\uDEF9'
};

export function convertToBoldMath(text: string): string {
  return text.split('').map(char => BOLD_MATH_MAP[char] || char).join('');
}

export function convertToBoldSans(text: string): string {
  return text.split('').map(char => BOLD_SANS_MAP[char] || char).join('');
}