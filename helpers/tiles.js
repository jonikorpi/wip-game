export default {
  water: {
    name: "Water",
    impassable: undefined,
    sailable: true,
    difficult: undefined,
    axes: {
      water: {
        max: 10,
        min: 10,
        upgrade: undefined,
        downgrade: "shoal",
      },
      heat: {
        max: 10,
        min: 10,
        upgrade: "shoal",
        downgrade: "ice",
      },
    },
    onChange: undefined,
    onSpawn: undefined,
    onDeath: undefined,
  },

  shoal: {
    name: "Shoal",
    impassable: undefined,
    sailable: true,
    difficult: true,
    axes: {
      water: {
        max: 10,
        min: 10,
        upgrade: "water",
        downgrade: "ground",
      },
      heat: {
        max: 10,
        min: 10,
        upgrade: "ground",
        downgrade: "ice",
      },
    },
    onChange: undefined,
    onSpawn: undefined,
    onDeath: undefined,
  },
};
