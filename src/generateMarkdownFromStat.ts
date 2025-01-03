import { TotalStat } from './generateTotalStat';

export const generateMarkdownFromStat = (content: TotalStat) => {
  const stringContent = `${content.name ? `name: ${name}. ` : ''}hit: ${content.hit}. total: ${content.total}. percent: ${content.percent.toFixed(4)}%.`;
  return stringContent;
};
