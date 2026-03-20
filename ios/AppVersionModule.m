#import <React/RCTBridgeModule.h>

@interface AppVersionModule : NSObject <RCTBridgeModule>
@end

@implementation AppVersionModule

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport {
  NSString *version = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"] ?: @"";
  return @{ @"appVersion": version };
}

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

@end
