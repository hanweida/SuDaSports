package com.sudasports;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.sudasports.nativeview.CircleViewManager;
import com.sudasports.nativeview.ReactWebviewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by jerry on 2017/8/1.
 */
public class CirclePackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(new CircleViewManager());
    }
}
