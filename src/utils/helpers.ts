import { Stats } from 'fs';
/** Prints the '=' character and input strings to add some flavor to stdout.  */
export function printPrettyLine(x: string = '') {
  const char = '=';
  const terminalWidth = 40;

  x = x.trim();
  if (!x) return console.log(char.repeat(terminalWidth));
  if (x.length > terminalWidth) return console.log(x);

  const sideLen = Math.floor((terminalWidth - x.length) / 2);
  const side = char.repeat(sideLen - 1);
  const final = `${side} ${x} ${side}`;
  console.log(final.length < terminalWidth ? `${final}${char}` : final);
}
