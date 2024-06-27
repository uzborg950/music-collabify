import * as colors from "@mui/material/colors";
export const randomMuiColorGenerator = () => {
  const colorNames = Object.keys(colors);

  const randomColor = colorNames[Math.floor(Math.random() * colorNames.length)];
  if (!Object.values(randomColor).length) return colors.red["900"];
  // @ts-ignore - Tbh i created this function for fun so didn't bother working out the correct typing
  return colors[randomColor]["900"] as string;
};
