package com.pushtest;

import android.app.Application;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;

import java.util.List;

import com.pushologies.pushologiesnotifications.PushSDKConfig;
import com.pushologies.pushologiesnotifications.PushSDKConnectionType;
import com.pushologies.pushologiesnotifications.PushSDKModule;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost =
            new DefaultReactNativeHost(this) {
                @Override
                public boolean getUseDeveloperSupport() {
                    return BuildConfig.DEBUG;
                }

                @Override
                protected List<ReactPackage> getPackages() {
                    @SuppressWarnings("UnnecessaryLocalVariable")
                    List<ReactPackage> packages = new PackageList(this).getPackages();
                    // Packages that cannot be autolinked yet can be added manually here, for example:
                    // packages.add(new MyReactNativePackage());
                    return packages;
                }

                @Override
                protected String getJSMainModuleName() {
                    return "index";
                }

                @Override
                protected boolean isNewArchEnabled() {
                    return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
                }

                @Override
                protected Boolean isHermesEnabled() {
                    return BuildConfig.IS_HERMES_ENABLED;
                }
            };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        // Initialise the PushSDK

        PushSDKModule.initSDKWithPushSDKConfig(this,
                new PushSDKConfig(
                        "XXXX-XXXXX-XXXX-XXXX", //api key
                        "XXXX+XXXXX+XXXXXXXXX", //api secret
                        "0.0.1", // your app version
                        null, // set your customer id here or enter null
                        PushSDKConnectionType.ALL, // content download connection type
                        true, // enable location data
                        true, // enable debug logs
                        true, // enable geofence based notifications
                        20, // max geofence limit,
                        "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX", // tenant id
                        10000L, //inAppOpenDelay
                        R.drawable.cleanpushlogo, // large icon which appears on the right side of the notification
                        R.drawable.cleanpushlogo, // small icon which appears on the left
                        R.color.white// background colour for the small icon
                )
        );
        SoLoader.init(this, /* native exopackage */ false);
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            // If you opted-in for the New Architecture, we load the native entry point for this app.
            DefaultNewArchitectureEntryPoint.load();
        }
        ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    }
}
