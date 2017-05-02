export default {
  nothing: {},

  monument: {
    name: "Monument",
    rarity: 3,
    owner: undefined,
    movementRange: undefined,
    range: undefined,
    axes: {
      durability: {
        max: 100,
        min: 500,
        upgrade: undefined,
        downgrade: "nothing",
      },
      culture: {
        max: 100,
        min: 10,
        upgrade: "greatMonument",
        downgrade: undefined,
      },
    },
    onChange: undefined,
    onSpawn: "destroyPlayer",
    onDeath: undefined,
    onUse: "respawnPlayer",
    onTick: undefined,
  },
};
