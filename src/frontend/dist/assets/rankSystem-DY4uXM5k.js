const RANKS = [
  {
    name: "Rookie",
    image: "/assets/generated/rank-rookie-transparent.dim_128x128.png",
    color: "text-zinc-400",
    glowColor: "#9ca3af",
    minTasks: 0
  },
  {
    name: "Focused",
    image: "/assets/generated/rank-focused-transparent.dim_128x128.png",
    color: "text-blue-400",
    glowColor: "#60a5fa",
    minTasks: 10
  },
  {
    name: "Consistent",
    image: "/assets/generated/rank-consistent-transparent.dim_128x128.png",
    color: "text-emerald-400",
    glowColor: "#34d399",
    minTasks: 25
  },
  {
    name: "Disciplined",
    image: "/assets/generated/rank-disciplined-transparent.dim_128x128.png",
    color: "text-teal-400",
    glowColor: "#2dd4bf",
    minTasks: 50
  },
  {
    name: "Elite",
    image: "/assets/generated/rank-elite-transparent.dim_128x128.png",
    color: "text-violet-400",
    glowColor: "#a78bfa",
    minTasks: 100
  },
  {
    name: "Beast",
    image: "/assets/generated/rank-beast-transparent.dim_128x128.png",
    color: "text-red-400",
    glowColor: "#f87171",
    minTasks: 200
  },
  {
    name: "Machine",
    image: "/assets/generated/rank-machine-transparent.dim_128x128.png",
    color: "text-orange-400",
    glowColor: "#fb923c",
    minTasks: 350
  },
  {
    name: "Apex",
    image: "/assets/generated/rank-apex-transparent.dim_128x128.png",
    color: "text-yellow-400",
    glowColor: "#facc15",
    minTasks: 500
  }
];
function getRankFromTasks(totalCompletedTasks) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (totalCompletedTasks >= r.minTasks) rank = r;
  }
  return rank;
}
function getNextRank(current) {
  const idx = RANKS.findIndex((r) => r.name === current.name);
  return idx < RANKS.length - 1 ? RANKS[idx + 1] : null;
}
export {
  getNextRank as a,
  getRankFromTasks as g
};
