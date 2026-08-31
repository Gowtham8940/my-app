package expo.modules.battery

import android.content.Context
import android.os.BatteryManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

// Exposes the device's current battery level to JS as a 0-100 integer
// percentage. Returns -1 when the BatteryManager service is unavailable so
// the JS wrapper can render a placeholder instead of a bogus value.
class BatteryModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("BatteryModule")

    AsyncFunction("getBatteryLevel") {
      val batteryManager = appContext.reactContext
        ?.getSystemService(Context.BATTERY_SERVICE) as? BatteryManager

      batteryManager?.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY) ?: -1
    }
  }
}
