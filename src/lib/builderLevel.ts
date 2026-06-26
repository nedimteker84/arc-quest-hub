export function getBuilderLevel(builderScore: number) {
  if (builderScore >= 500) {
    return {
      label: "Elite Builder",
      emoji: "💎",
      description: "High consistency and strong activity.",
    }
  }

  if (builderScore >= 150) {
    return {
      label: "Arc Builder",
      emoji: "🚀",
      description: "Growing Arc ecosystem contributor.",
    }
  }

  if (builderScore >= 50) {
    return {
      label: "Active Builder",
      emoji: "⚡",
      description: "Consistent daily activity started.",
    }
  }

  return {
    label: "New Builder",
    emoji: "🌱",
    description: "Start building your Arc activity.",
  }
}