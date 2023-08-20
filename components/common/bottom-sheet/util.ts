export function clamp(number: number, lower: number, upper: number) {
  number = +number;
  lower = +lower;
  upper = +upper;
  lower = lower === lower ? lower : 0;
  upper = upper === upper ? upper : 0;
  if (number === number) {
    number = number <= upper ? number : upper;
    number = number >= lower ? number : lower;
  }
  return number;
}

export function makeSnapPoints(points: number[], maxHeight: number) {
  const pointsSet = points.reduce((acc, snapPoint) => {
    acc.add(clamp(snapPoint, 0, maxHeight));
    return acc;
  }, new Set<number>());

  const snapPoints = Array.from(pointsSet);

  const minSnap = Math.min(...snapPoints);
  if (Number.isNaN(minSnap)) {
    throw new TypeError("minSnap is NaN");
  }
  const maxSnap = Math.max(...snapPoints);
  if (Number.isNaN(maxSnap)) {
    throw new TypeError("maxSnap is NaN");
  }

  return {
    snapPoints,
    minSnap,
    maxSnap,
  };
}
