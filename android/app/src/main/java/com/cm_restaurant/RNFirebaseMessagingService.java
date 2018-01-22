package com.cm_restaurant;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.cm_restaurant.DeviceToken;
/**
 * Created by aiden on 2018-01-22.
 */

public class RNFirebaseMessagingService extends FirebaseMessagingService {
    ReactApplicationContext mReactContext;
    @Override
    public void onCreate() {
        super.onCreate();
        Log.i("Service", "消息服务已启动");
    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(3000);
                    mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("Message","MessageReceived");
                } catch (InterruptedException e){


                }
            }
        }).start();
        Log.i("Service", "===============通知来啦=================");
        Log.i("Service", "onMessageReceived: " + remoteMessage.getFrom());
        if (remoteMessage.getData().size() > 0) {
            Log.i("Service", "" + remoteMessage.getData());
        }
        if (remoteMessage.getNotification() != null) {
            Log.i("Service", "" + remoteMessage.getNotification().getBody());
        }


    }
}
