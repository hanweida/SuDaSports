import React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native'

//import FootCustom from './foot_custom';
import ScrollableTabView  from 'react-native-scrollable-tab-view';
export default class Footer extends Component{
    constructor(props) {
    super(props);

    this.state = {
      tabNames: ['首页', '赛程', '新闻'],
      tabIconNames: ['../img/tab_icon_home_default@2x.png', 'tab_icon_news_default@2x.png', 'tab_icon_schedule_default@2x.png'],
    };
  }

  render() {
    let tabNames = this.state.tabNames;
    let tabIconNames = this.state.tabIconNames;
    return (
        <View></View>
      /*<ScrollableTabView
        renderTabBar={() => <FootCustom tabNames={tabNames} tabIconNames={tabIconNames}/>}
        tabBarPosition='bottom'

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
        initialPage={3}
        prerenderingSiblingsNumber={1}
        >

        <View tabLabel="1" style={styles.center}></View>
        <View tabLabel="2" style={styles.center}></View>
        <View tabLabel="3" style={styles.center}></View>
        <View tabLabel="4" style={styles.center}></View>
        <View tabLabel="5" style={styles.center}></View>
      </ScrollableTabView>*/
    );
  }
}