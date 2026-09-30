const RELEASE_TRACK_PATTERN = /^v?(\d+)\.(\d+)\.x$/;

function normalizeReleaseTrack(value) {
  if (typeof value !== 'string') {
    throw new Error(`REST_RELEASE_TRACK_INVALID: expected a string, received ${JSON.stringify(value)}`);
  }

  const match = RELEASE_TRACK_PATTERN.exec(value);
  if (!match) {
    throw new Error(`REST_RELEASE_TRACK_INVALID: "${value}" must match major.minor.x (for example 2.6.x or v3.0.x)`);
  }

  return `${match[1]}.${match[2]}.x`;
}

function compareReleaseTracks(left, right) {
  const leftNormalized = normalizeReleaseTrack(left);
  const rightNormalized = normalizeReleaseTrack(right);
  const [leftMajor, leftMinor] = leftNormalized.split('.').map(Number);
  const [rightMajor, rightMinor] = rightNormalized.split('.').map(Number);

  if (leftMajor !== rightMajor) return leftMajor < rightMajor ? -1 : 1;
  if (leftMinor !== rightMinor) return leftMinor < rightMinor ? -1 : 1;
  return 0;
}

module.exports = {
  normalizeReleaseTrack,
  compareReleaseTracks,
};
