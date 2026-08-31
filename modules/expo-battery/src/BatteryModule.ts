import { NativeModule, requireNativeModule } from 'expo';

import { BatteryModuleEvents } from './BatteryModule.types';

declare class BatteryModule extends NativeModule<BatteryModuleEvents> {
  /**
   * Resolves with the current battery level as an integer percentage
   * (0-100), or -1 if the platform can't report one (e.g. a simulator).
   */
  getBatteryLevel(): Promise<number>;
}

// Loads the native module object from the JSI or falls back to
// the bridge module (from NativeModulesProxy) if the JSI module is not
// available.
export default requireNativeModule<BatteryModule>('BatteryModule');
