import React,{ PropTypes }from 'react';
import {requireNativeComponent,View} from 'react-native';
 
var CustomWebView = {
    name:'RCTWebView',
    propTypes:{
        style: View.propTypes.style,
        source:PropTypes.string,
        ...View.propTypes,//包含默认的View的属性，如果没有这句会报‘has no propType for native prop’错误
    }
};
var RCTCustomWebViewView = requireNativeComponent('RCTWebView' ,CustomWebView);
module.exports = RCTCustomWebViewView;