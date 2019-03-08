package com.cm_restaurant;

import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by aiden on 2018-01-18.
 */

public class SystemSound extends ReactContextBaseJavaModule {
    ReactApplicationContext mContext;
    @Override
    public String getName() {
        return "SystemSound";
    }
    public SystemSound(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext=reactContext;

    }
    @ReactMethod
    public void playSound()
    {

        Uri uri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        Ringtone rt = RingtoneManager.getRingtone(mContext, uri);



        rt.play();
    }

}
