Pod::Spec.new do |s|
  s.name           = 'BatteryModule'
  s.version        = '1.0.0'
  s.summary        = 'Local Expo module exposing the device battery level.'
  s.description    = 'Reads the current battery percentage via UIDevice for use in the app header.'
  s.author         = ''
  s.homepage       = 'https://docs.expo.dev/modules/'
  s.platforms      = {
    :ios => '16.4',
    :tvos => '16.4'
  }
  s.source         = { git: '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  # Swift/Objective-C compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
  }

  s.source_files = "**/*.{h,m,mm,swift,hpp,cpp}"
end
