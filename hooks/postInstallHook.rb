post_install do |installer|
  installer.pods_project.targets.each do |target|
    if ['iProov', 'Starscream', 'DatadogSDK', 'SwiftProtobuf'].include? target.name
      target.build_configurations.each do |config|
          config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
      end
    end
  end
end
