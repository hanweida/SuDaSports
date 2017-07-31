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

  onNavigationStateChange = (navState) => {
    // this.setState({
    //   backButtonEnabled: navState.canGoBack,
    //   forwardButtonEnabled: navState.canGoForward,
    //   url: navState.url,
    //   status: navState.title,
    //   loading: navState.loading,
    //   scalesPageToFit: true
    // });
  };

  render() {
    let tabNames = this.state.tabNames;
    let tabIconNames = this.state.tabIconNames;
     let tabIconNamesSelect = this.state.tabIconNamesSelect;
    return (
      <ScrollableTabView
        renderTabBar={() => <FootCustom tabNames={tabNames} tabIconNames={tabIconNames} tabIconNamesSelect={tabIconNamesSelect} />}
        tabBarPosition='bottom'
        style={styles.footer}
        scrollWithoutAnimation={true}
        onChangeTab={
          (obj) => {
            console.log('被选中的tab下标：' + obj.i);
          }
        }

        onScroll={
          (position) => {
            console.log('滑动时的位置：' + position);
          }
        }
        locked={false}
        initialPage={0}
        prerenderingSiblingsNumber={1}
        >
        
        <View tabLabel="1" style={styles.center}>

          <WebView
                 ref={webView=>this.webView=webView}
                 //injectedJavaScript="(function(){document.getElementsByClassName('mv_head')[0].style.display='none'; document.getElementsByClassName('mv_app')[0].style.display='none';var divs =document.getElementsByTagName('div');var divAd = divs[divs.length-4].innerHTML; if(divAd.indexOf('广告') >-1 ){divs[divs.length-4].style.display='none';divAd='';}}()) "
                 
                 //document.getElementsByClassName('mv_head')[0].style.display='none';}
                //injectedJavaScript="document.getElementsByClassName('mv_head').innerHTML=''"
                //injectedJavaScript="document.getElementsByTagName('mv_head')[0].innerHTML=''"
                source={{uri: 'http://nba.tmiaoo.com'}}
                    //source={{uri: 'http://nba.tmiaoo.com//le/lexl.php?leid=1020170429214037&?classid=3&id=9883'}}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    automaticallyAdjustContentInsets={true}
                    onNavigationStateChange={this.onNavigationStateChange}
                    scalesPageToFit ={true}
                    automaticallyAdjustContentInsets={true}
                    mediaPlaybackRequiresUserAction={true}
                    
                />
                 <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.instructions}>
            Lock To Landscape
          </Text>
        </TouchableOpacity>
                </View>
        <View tabLabel="2" style={styles.center}></View>
        <View tabLabel="3" style={styles.center}></View>
      </ScrollableTabView>
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
