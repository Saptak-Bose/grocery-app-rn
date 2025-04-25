export interface Coord {
  latitude: number;
  longitude: number;
}

type Point = [number, number];

export function quadraticBezierCurve(
  p1: Point,
  p2: Point,
  controlPoint: Point,
  numPoints: number
): Coord[] {
  const points: Coord[] = [];
  const step = 1 / (numPoints - 1);

  for (let t = 0; t <= 1; t += step) {
    const x =
      (1 - t) ** 2 * p1[0] + 2 * (1 - t) * t * controlPoint[0] + t ** 2 * p2[0];
    const y =
      (1 - t) ** 2 * p1[1] + 2 * (1 - t) * t * controlPoint[1] + t ** 2 * p2[1];
    points.push({ latitude: x, longitude: y });
  }

  return points;
}

export function calculateControlPoint(p1: Point, p2: Point): Point {
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  const d = Math.hypot(dx, dy);
  const scale = 1;
  const h = d * scale;
  const w = d / 2;
  const x_m = (p1[0] + p2[0]) / 2;
  const y_m = (p1[1] + p2[1]) / 2;

  const factor = w / (2 * d);
  const x_c = x_m + ((h * dy) / (2 * d)) * factor;
  const y_c = y_m - ((h * dx) / (2 * d)) * factor;

  return [x_c, y_c];
}

export function getPoints(places: Coord[]): Coord[] {
  if (places.length < 2) {
    throw new Error("getPoints requires at least two places");
  }

  const p1: Point = [places[0].latitude, places[0].longitude];
  const p2: Point = [places[1].latitude, places[1].longitude];
  const controlPoint = calculateControlPoint(p1, p2);

  return quadraticBezierCurve(p1, p2, controlPoint, 100);
}
