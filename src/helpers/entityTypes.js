export default {
  default: {
    name: "Default Entity",
    rarity: null,
    x: null,
    y: null,
    lastY: null,
    lastX: null,
    owner: null,
    walkRange: null,
    sailRange: null,

    strength: -5,
    maxStrength: 0,
    minStrength: -10,
    strengthUpgrade: null,
    strengthDowngrade: null,

    health: 5,
    maxHealth: 10,
    minHealth: 0,
    healthUpgrade: null,
    healthDowngrade: "destroyEntity",

    skill: null,
    skillRange: null,

    onChange: null,
    onSpawn: null,
    onDeath: null,
    onMove: null,
    onSkill: null,
    onTick: null,
    // buffs: [{}],
  },
};
