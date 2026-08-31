// Reexport the native module. On web, it resolves to BatteryModule.web.ts
// and on native platforms to BatteryModule.ts
export { default } from './src/BatteryModule';
export * from './src/BatteryModule.types';
