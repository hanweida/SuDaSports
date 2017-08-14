package com.sudasports.nativeview;

import android.support.annotation.Nullable;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.sudasports.utils.X5WebView;
import com.tencent.smtt.sdk.WebView;

/**
 * Created by jerry on 2017/7/31.
 */
public class ReactWebviewManager extends SimpleViewManager<WebView> {

    public static final String REACT_CLASS = "RCTWebView";
    public String mHomeUrl = "http://nba.tmiaoo.com";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected WebView createViewInstance(ThemedReactContext reactContext) {
        WebView x5WebView = new WebView(reactContext);
        x5WebView.getSettings().setJavaScriptEnabled(true);// 支持js
        x5WebView.getSettings().setUseWideViewPort(true); //自适应屏幕
        x5WebView.loadUrl(mHomeUrl);
        return x5WebView;
    }

//    @ReactProp(name = "source")
//    public void setSource(X5WebView x5WebView, @Nullable String source){
//        System.out.println("setSource Invoke");
//        if(source != null){
//            System.out.println("setSource Start [" + source+"]");
//            x5WebView.setUrl(source);
//            x5WebView.loadUrl(source);
//        }
//    }
}
