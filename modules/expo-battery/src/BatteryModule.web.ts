import { NativeModule } from 'expo';

import { BatteryModuleEvents } from './BatteryModule.types';

type NavigatorWithBattery = Navigator & {
  getBattery?: () => Promise<{ level: number }>;
};

// Web fallback backed by the Battery Status API where the browser
// supports it; resolves -1 otherwise so callers have one contract
// across platforms.
class BatteryModuleWeb extends NativeModule<BatteryModuleEvents> {
  async getBatteryLevel(): Promise<number> {
    const getBattery = (navigator as NavigatorWithBattery).getBattery;
    if (typeof getBattery !== 'function') {
      return -1;
    }
    const battery = await getBattery();
    return Math.round(battery.level * 100);
  }
}

export default new BatteryModuleWeb();
