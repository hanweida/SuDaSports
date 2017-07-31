package com.sudasports.nativeview;

import android.support.annotation.Nullable;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.sudasports.utils.X5WebView;

/**
 * Created by jerry on 2017/7/31.
 */
public class ReactWebviewManager extends SimpleViewManager<X5WebView> {

    public static final String REACT_CLASS = "RCTWebView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected X5WebView createViewInstance(ThemedReactContext reactContext) {
        return new X5WebView(reactContext);
    }

    @Override
    public void onDropViewInstance(X5WebView view) {
        super.onDropViewInstance(view);
    }

    @ReactProp(name = "source")
    public void setSource(X5WebView x5WebView, @Nullable String source){
        System.out.println("setSource Invoke");
        if(source != null){
            System.out.println("setSource Start [" + source+"]");
            x5WebView.setUrl(source);
            x5WebView.loadUrl(source);
        }
    }
}
