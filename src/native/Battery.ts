import { useCallback, useEffect, useState } from 'react';
import { AppState } from 'react-native';

import BatteryModuleNative from '../../modules/expo-battery';

const DEFAULT_POLL_INTERVAL_MS = 30_000;

/**
 * Current battery level as an integer percentage (0-100), or `null` if the
 * platform can't report one (e.g. the iOS Simulator).
 */
export async function getBatteryLevel(): Promise<number | null> {
  const level = await BatteryModuleNative.getBatteryLevel();
  return level < 0 ? null : level;
}

/**
 * Live battery percentage for display in a header/status area. Refreshes on
 * a timer and whenever the app returns to the foreground, since the OS
 * doesn't push battery changes to us on demand.
 */
export function useBatteryLevel(pollIntervalMs = DEFAULT_POLL_INTERVAL_MS) {
  const [level, setLevel] = useState<number | null>(null);

  const refresh = useCallback(() => {
    getBatteryLevel()
      .then(setLevel)
      .catch(() => setLevel(null));
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, pollIntervalMs);
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') refresh();
    });
    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, [refresh, pollIntervalMs]);

  return level;
}
