import React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    WebView,
    Platform,
    BackAndroid,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native'

import FootCustom from './foot_custom';
import ScrollableTabView  from 'react-native-scrollable-tab-view';
import SimpleTabNavigator  from './SimpleTabNavigator';

import px2dp from '../util/px2dp'
WEBVIEW_REF = 'webview';
export default class Footer extends Component{
    constructor(props) {
    super(props);
    this.state = {
      tabNames: ['首页', '赛程', '新闻'],
      tabIconNames: [require('../img/tab_icon/tab_icon_home_default@2x.png'), require('../img/tab_icon/tab_icon_news_default@2x.png'), require('../img/tab_icon/tab_icon_schedule_default@2x.png')],
      tabIconNamesSelect: [require('../img/tab_icon/tab_icon_home_sel@2x.png'), require('../img/tab_icon/tab_icon_news_sel@2x.png'), require('../img/tab_icon/tab_icon_schedule_sel@2x.png')],
  };
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
        BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);

      // BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
     BackAndroid.addEventListener('hardwareBackPress', function() {
         this.onBackAndroid;
            return true;
        });
    }
  }
  onBackAndroid = () => {
    ToastAndroid.show('This is a toast with short duration', ToastAndroid.SHORT);
    this.webView.goBack();
    true;
    // const { navigator } = this.props;
    // const routers = navigator.getCurrentRoutes();
    // console.log('当前路由长度：'+routers.length);
    // if (routers.length > 1) {
    // navigator.pop();
    // return true;//接管默认行为
    // }
    // return false;//默认行为
  };

  render() {
    let tabNames = this.state.tabNames;
    let tabIconNames = this.state.tabIconNames;
     let tabIconNamesSelect = this.state.tabIconNamesSelect;
    return (
        <SimpleTabNavigator
            style={styles.container}
        >
        </SimpleTabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  footer:{
      borderTopColor :'#FC4035',
      borderTopWidth:1,
      height: 10
  },
  center:{
    flex:1
  },

   button: {
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 3,
    backgroundColor: 'grey',
  }

});
