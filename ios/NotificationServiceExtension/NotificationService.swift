//
//  NotificationService.swift
//  NotificationServiceExtension
//
//  Created by Shri Hunashikatti on 17/03/2023.
//

import UserNotifications
import PushSDK

class NotificationService: PSDKServiceExtension {

    var contentHandler: ((UNNotificationContent) -> Void)?
    var bestAttemptContent: UNMutableNotificationContent?

    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
      if request.isPushologiesRequest {
          super.didReceive(request, withContentHandler: contentHandler)
      }
    }
    
    override func serviceExtensionTimeWillExpire() {
        // Called just before the extension will be terminated by the system.
        // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
        if let contentHandler = contentHandler, let bestAttemptContent =  bestAttemptContent {
            contentHandler(bestAttemptContent)
        }
    }

}
