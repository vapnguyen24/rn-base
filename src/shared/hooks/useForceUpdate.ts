import { useMemo } from 'react';
import { APP_VERSION } from '@core/config/constants';

/**
 * Compare two semver strings (e.g. "1.2.3").
 * Returns -1 if a < b, 0 if equal, 1 if a > b.
 */
function compareSemver(a: string, b: string): number {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff < 0) return -1;
    if (diff > 0) return 1;
  }
  return 0;
}

/**
 * Returns true when the running app version is older than minimumVersion.
 * Pass minimumVersion from your API / remote config response.
 * While minimumVersion is undefined (loading), returns false so the app
 * does not flash the modal before the check completes.
 */
export function useForceUpdate(minimumVersion: string | undefined): boolean {
  return useMemo(() => {
    if (!minimumVersion) return false;
    return compareSemver(APP_VERSION, minimumVersion) < 0;
  }, [minimumVersion]);
}
