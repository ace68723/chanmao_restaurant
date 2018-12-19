package com.cm_restaurant;

import android.app.Activity;
import android.os.Bundle;

import com.reactnativenavigation.controllers.SplashActivity;

import cn.jpush.android.api.JPushInterface;

public class MainActivity extends SplashActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    private static Activity mCurrentMainActivity = null;
    protected String getMainComponentName() {
        return "cm_restaurant";
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mCurrentMainActivity = this;
        JPushInterface.init(this);
    }

    public static Activity getActivity() {
        Activity activity = mCurrentMainActivity;
        return activity;
    }
    @Override
    protected void onPause() {
        super.onPause();
        JPushInterface.onPause(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        JPushInterface.onResume(this);
    }
}
