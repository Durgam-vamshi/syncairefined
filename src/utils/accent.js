export const getAccentVars = (color) => ({
  "--accent": color,
  "--accent-10": `${color}0A`,
  "--accent-15": `${color}15`,
  "--accent-18": `${color}18`,
  "--accent-22": `${color}22`,
  "--accent-25": `${color}25`,
  "--accent-28": `${color}28`,
  "--accent-30": `${color}30`,
  "--accent-35": `${color}35`,
  "--accent-40": `${color}40`,
  "--accent-55": `${color}55`,
  "--accent-77": `${color}77`,
});

export const getPriceVar = (price) => ({
  "--price-color": price === "Free" ? "var(--accent-cool)" : "var(--text-tertiary)",
});
