package com.cm_restaurant;

import com.facebook.react.ReactPackage;
import com.reactnativenavigation.NavigationApplication;

import java.util.Arrays;
import java.util.List;
import com.learnium.RNDeviceInfo.RNDeviceInfo;

public class MainApplication extends NavigationApplication {


    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
                new RNDeviceInfo(),
                new customPackage()
        );
    }
    @Override
    public String getJSMainModuleName() {
        return "index";
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}
