package com.heroui

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

class AppVersionModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "AppVersionModule"

  override fun getConstants(): Map<String, Any> =
    mapOf("appVersion" to BuildConfig.VERSION_NAME)
}
