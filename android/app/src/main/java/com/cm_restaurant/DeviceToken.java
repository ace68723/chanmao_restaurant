package com.cm_restaurant;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.firebase.iid.FirebaseInstanceId;

/**
 * Created by aiden on 2018-01-18.
 */

public class DeviceToken extends ReactContextBaseJavaModule {


    private static ReactApplicationContext reactContext;
    ReactApplicationContext mReactContext;
    @Override
    public String getName() {
        return "DeviceToken";
    }
    public DeviceToken(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext=reactContext;
        this.reactContext = reactContext;
    }

    @ReactMethod
    public void gettoken()
    {
        final String refreshedToken = FirebaseInstanceId.getInstance().getToken();
        Log.d("testservice1","Refreshed token: " + refreshedToken);
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(3000);
                    mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("token",refreshedToken);
                } catch (InterruptedException e){


                }
            }
        }).start();
    }



}
