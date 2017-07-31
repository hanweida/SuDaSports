package com.sudasports.nativeview;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.sudasports.CircleView;

/**
 * Created by jerry on 2017/8/1.
 */
public class CircleViewManager extends SimpleViewManager<CircleView> {
    @Override
    public String getName() {
        return "RCTCircleCustom";
    }

        /**
         * 创建UI组件实例
         */
        @Override
        protected CircleView createViewInstance(ThemedReactContext reactContext) {
            return new CircleView(reactContext);
        }

        /**
         * 传输背景色参数
         */
        @ReactProp(name = "color")
        public void setColor(CircleView view, Integer color) {
            view.setColor(color);
        }

        /**
         * 传输半径参数
         */
        @ReactProp(name = "radius")
        public void setRadius(CircleView view, Integer radius) {
            view.setRadius(radius);
        }
}
