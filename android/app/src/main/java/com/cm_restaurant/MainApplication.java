package com.cm_restaurant;
import cn.jpush.reactnativejpush.JPushPackage; // add this import

import com.facebook.react.ReactPackage;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import java.util.Arrays;
import java.util.List;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
public class MainApplication extends NavigationApplication {
        private boolean SHUTDOWN_TOAST = false;
        private boolean SHUTDOWN_LOG = false;
        @Override
        protected ReactGateway createReactGateway() {
            ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
                @Override
                protected String getJSMainModuleName() {
                    return "index";
                }
            };
            return new ReactGateway(this, isDebug(), host);
        }
    
        @Override
        public boolean isDebug() {
            return BuildConfig.DEBUG;
        }
    
        protected List<ReactPackage> getPackages() {
            // Add additional packages you require here
            // No need to add RnnPackage and MainReactPackage
            return Arrays.<ReactPackage>asList(
                new RNDeviceInfo(),
                new customPackage(),
                new RealmReactPackage(), // add this line
                new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG)
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
