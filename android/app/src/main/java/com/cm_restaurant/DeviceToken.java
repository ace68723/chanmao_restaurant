package com.cm_restaurant;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.firebase.iid.FirebaseInstanceId;

/**
 * Created by aiden on 2018-01-18.
 */

public class DeviceToken extends ReactContextBaseJavaModule {
    @Override
    public String getName() {
        return "DeviceToken";
    }
    public DeviceToken(ReactApplicationContext reactContext) {
        super(reactContext);

    }
    @ReactMethod
    public String gettoken()
    {
        String refreshedToken = FirebaseInstanceId.getInstance().getToken();
        Log.d("testservice1","Refreshed token: " + refreshedToken);
        return refreshedToken;
    }
}
