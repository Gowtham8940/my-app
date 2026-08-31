import ExpoModulesCore
import UIKit

// Exposes the device's current battery level to JS as a 0-100 integer
// percentage. Returns -1 when the platform can't report a level (e.g. the
// iOS Simulator, which has no battery), so the JS wrapper can render a
// placeholder instead of a bogus value.
public class BatteryModule: Module {
  public func definition() -> ModuleDefinition {
    Name("BatteryModule")

    AsyncFunction("getBatteryLevel") { () -> Int in
      let device = UIDevice.current
      device.isBatteryMonitoringEnabled = true

      let level = device.batteryLevel // -1.0 (unknown) or 0.0...1.0
      if level < 0 {
        return -1
      }
      return Int((level * 100).rounded())
    }
  }
}
