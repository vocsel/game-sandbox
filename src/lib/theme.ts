const sizes = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export const createMediaQueries = ({ breakpoints, callback }) => Object.keys(breakpoints)
  .map((point) => (breakpoints[point] ? `@media (min-width: ${sizes[point]}px) {${callback(breakpoints[point])}}` : ""))
  .join("\n");
