#import "ChronBatchWrapper.h"
#import "RCTLog.h"

@import Batch;

@implementation ChronBatchWrapper

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(initialize:(NSString *)apiKey)
{
  [BatchPush setupPush];
  [Batch startWithAPIKey:apiKey];
  [BatchPush registerForRemoteNotifications];
}

@end
