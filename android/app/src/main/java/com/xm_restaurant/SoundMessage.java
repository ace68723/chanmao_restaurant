package com.xm_restaurant;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by aiden on 2018-01-22.
 */

public class SoundMessage extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    ReactApplicationContext mReactContext;
    @Override
    public String getName() {
        return "SoundMessage";
    }
    public SoundMessage(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext=reactContext;
        this.reactContext = reactContext;
    }
    public static void sendEvent() {
        Log.d("testEvent","sendEventStart");
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("Message", "MessageReceived");
    }
}
