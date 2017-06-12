const size = 1;
const height = size * 2;
const width = Math.sqrt(3) / 2 * size * 2;

const axialDirections = [
  [+1, 0],
  [+1, -1],
  [0, -1],
  [-1, 0],
  [-1, +1],
  [0, +1],
];

const direction = direction => {
  return axialDirections[direction];
};

const toHex = cube => {
  var q = cube[0];
  var r = cube[2];
  return [q, r];
};

const toCube = hex => {
  var x = hex[0];
  var z = hex[1];
  var y = -x - z;
  return [x, y, z];
};

const neighbor = (hex, directionKey) => {
  const directionModifier = direction(directionKey);
  return [hex[0] + directionModifier[0], hex[1] + directionModifier[1]];
};

const distanceBetweenCubes = (a, b) => {
  return Math.max(
    Math.abs(a[0] - b[0]),
    Math.abs(a[1] - b[1]),
    Math.abs(a[2] - b[2])
  );
};

const distanceBetween = (a, b) => {
  const ac = toCube(a);
  const bc = toCube(b);
  return distanceBetweenCubes(ac, bc);
};

const hexesWithin = (hex, N) => {
  const cube = toCube(hex);
  let results = [];

  let dx = -N;
  while (dx <= N) {
    let dy = -N;
    while (dy <= N) {
      if (dy >= Math.max(-N, -dx - N) && dy <= Math.min(N, -dx + N)) {
        const dz = -dx - dy;
        results.push(toHex([cube[0] + dx, cube[1] + dy, cube[2] + dz]));
      }
      dy++;
    }
    dx++;
  }

  return results;
};

const rectangleOfHexes = (width, height) => {
  let results = [];
  const originOffset = -Math.floor(height) + 1;

  for (let r = originOffset; r < height + originOffset; r++) {
    const offset = Math.floor(-r / 2);
    for (let q = -offset; q < width - offset; q++) {
      results.push(toHex([q, -q - r, -r]));
    }
  }

  return results;
};

const pixelCoordinates = hex => {
  const x = size * Math.sqrt(3) * (hex[0] + hex[1] / 2);
  const y = height / 2 * 3 / 2 * hex[1];

  return [x, y];
};

export default {
  size: size,
  height: height,
  width: width,

  perRegionX: 11,
  perRegionY: 8,

  direction: direction,
  toHex: toHex,
  toCube: toCube,
  neighbor: neighbor,
  distanceBetweenCubes: distanceBetweenCubes,
  distanceBetween: distanceBetween,
  hexesWithin: hexesWithin,
  rectangleOfHexes: rectangleOfHexes,
  pixelCoordinates: pixelCoordinates,

  roundingWidth: size / 10,
  randomRange: size / 5,
  beachWidth: size / 20,

  baseHexCoordinates: [
    [width / 3, height / 13],
    [width / 2, 0],
    [width / 3 * 2, height / 13],

    [width / 9 * 7, height / 13 * 1.666],
    [width, height / 4],
    [width, height / 8 * 3],

    [width, height / 8 * 5],
    [width, height * 0.75],
    [width * 6.25 / 8, height * 6 / 7],

    [width / 8 * 5, height * 15 / 16],
    [width / 2, height],
    [width * 3 / 8, height * 15 / 16],

    [width / 9 * 2, height * 6 / 7],
    [0, height * 0.75],
    [0, height / 8 * 5],

    [0, height / 8 * 3],
    [0, height / 4],
    [width / 9 * 2, height / 13 * 1.666],
  ],
};
