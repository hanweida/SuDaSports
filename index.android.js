/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  NativeModules,
   processColor,
   PropTypes 
} from 'react-native';

import App from './App'
import RCTWebView from './src/component/nativemodules/CustomWebView'
import RCTCircleCustom from './src/component/nativemodules/CircleCustom'

export default class SuDaSports extends Component {
_click(){
     NativeModules.WebviewRNModule.show('正在打开视频');
  }

  render() {
    return (
         <RCTWebView
            style={{flex:1}}
          >
          </RCTWebView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webView: {
        flex: 1
    }
});
AppRegistry.registerComponent('SuDaSports', () => SuDaSports);
