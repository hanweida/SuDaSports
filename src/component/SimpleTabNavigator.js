/**
 * Created by YiBing on 2017/5/5.
 * 本程序效果：类似Android中的ViewPager--有2个页面，可以随手势来回切换，也可以点击Tab切换。
 * API Definition -- TabNavigator(RouteConfigs, TabNavigatorConfig)。
 *
 * RouteConfigs -- 和StackNavigator的RouteConfigs一样，可以看上一篇文章（React Navigation--StackNavigator 详细的例子<a target="_blank" href="http://blog.csdn.net/yibing2011/article/details/71195316">http://blog.csdn.net/yibing2011/article/details/71195316</a>）。
 *
 * TabNavigatorConfig --
 *   1. tabBarComponent - component to use as the tab bar,
 *      e.g. TabBarBottom (this is the default on iOS),
 *          TabBarTop (this is the default on Android)
 *   2. tabBarPosition - position of the tab bar, can be 'top' or 'bottom'
 *   3. swipeEnabled - whether to allow swiping between tabs
 *   4. animationEnabled - whether to animate when changing tabs
 *   5. lazy - whether to lazily render tabs as needed as opposed to rendering them upfront
 *   6. tabBarOptions - configure the tab bar.
 *      tabBarOptions for TabBarBottom (default tab bar on iOS):
 *          (1) activeTintColor - label and icon color of the active tab
 *          (2) activeBackgroundColor - background color of the active tab
 *          (3) inactiveTintColor - label and icon color of the inactive tab
 *          (4) inactiveBackgroundColor - background color of the inactive tab
 *          (5) showLabel - whether to show label for tab, default is true
 *          (6) style - style object for the tab bar
 *          (7) labelStyle - style object for the tab label
 *          Example:
 *            tabBarOptions: {
 *                  activeTintColor: '#e91e63',
 *                  labelStyle: {
 *                      fontSize: 12,
 *                  },
 *                  style: {
 *                      backgroundColor: 'blue',
 *                  },
 *            }
 *      tabBarOptions for TabBarTop (default tab bar on Android):
 *          (1) activeTintColor - label and icon color of the active tab
 *          (2) inactiveTintColor - label and icon color of the inactive tab
 *          (3) showIcon - whether to show icon for tab, default is false
 *          (4) showLabel - whether to show label for tab, default is true
 *          (5) upperCaseLabel - whether to make label uppercase, default is true
 *          (6) pressColor - color for material ripple (Android >= 5.0 only)
 *          (7) pressOpacity - opacity for pressed tab (iOS and Android < 5.0 only)
 *          (8) scrollEnabled - whether to enable scrollable tabs
 *          (9) tabStyle - style object for the tab
 *          (10)indicatorStyle - style object for the tab indicator (line at the bottom of the tab)
 *          (11)labelStyle - style object for the tab label
 *          (12)iconStyle - style object for the tab icon
 *          (13)style - style object for the tab bar
 *          Example:
 *            tabBarOptions: {
 *                  labelStyle: {
 *                      fontSize: 12,
 *                  },
 *                  style: {
 *                      backgroundColor: 'blue',
 *                  },
 *            }
 *   7. initialRouteName - The routeName for the initial tab route when first loading
 *   8. order - Array of routeNames which defines the order of the tabs
 *   9. paths - Provide a mapping of routeName to path config, which overrides the paths set in the routeConfigs.
 *   10.backBehavior - Should the back button cause a tab switch to the initial tab? If yes, set to initialRoute,
 *      otherwise none. Defaults to initialRoute behavior.
 *
 * Screen Navigation Options --
 *   1. title - Generic title that can be used as a fallback for headerTitle and tabBarLabel
 *   2. tabBarVisible - True or false to show or hide the tab bar, if not set then defaults to true
 *   3. tabBarIcon - React Element or a function that given { focused: boolean, tintColor: string }
 *                   returns a React.Element, to display in tab bar
 *   4. tabBarLabel - Title string of a tab displayed in the tab bar or React Element or a function that given
 *                    { focused: boolean, tintColor: string } returns a React.Element, to display in tab bar.
 *                    When undefined, scene title is used. To hide, see tabBarOptions.showLabel in the previous section.
 *
 *
 * Navigator Props --
 *   The navigator component created by TabNavigator(...) takes the following props:
 *      1. screenProps - Pass down extra options to child screens and navigation options, for example:
 *         const TabNav = TabNavigator({
 *              // config
 *          });
 *          <TabNav screenProps={
 *                // this prop will get passed to the screen components as this.props.screenProps
 *              }
 *           />
 */

import React from 'react';

import {
    Button,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Alert
} from 'react-native';

import {
    TabNavigator,
} from 'react-navigation';

import ZhiBoScreen from  './home/homepage/ZhiBoScreen'


class MyNotificationsScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Notifications',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../img/tab_icon_home_sel@2x.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.goBack()}
                title="Go back home"
            />
        );
    }
}

class MyNotifiScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Notifications',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../img/tab_icon_home_sel@2x.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.goBack()}
                title="Go back home"
            />
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
    viewScreen:{
        width: 200,
        height: 200,
        backgroundColor: '#000000'
    },
    container:{
        flexDirection:'row',
        height: 48,
        justifyContent:'center',
        borderBottomColor:'#F66A85',
        backgroundColor:'#F66A85'
    },
    button_tab:{
        height:30,
        width:86,
        borderColor:'#FFFFFF',
        borderStyle :'solid',
        backgroundColor: '#F66A85',
        borderWidth:1,
        alignSelf:'center'
    },
    button_left_tab:{
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8,
    },
    button_right_tab:{
        borderTopRightRadius:8,
        borderBottomRightRadius:8,
    },
    button_center_tab:{
        borderLeftWidth:0,
        borderRightWidth:0
    },
    button_text_view:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
    },
    button_text:{
        fontSize:15,
        fontFamily:'PingFangSC-Regular',
        color:'#FFFFFF'
    },
    unpress_button_text:{
        fontSize:15,
        fontFamily:'PingFangSC-Regular',
        color:'#FFFFFF'
    },
    press_button_text:{
        fontSize:15,
        fontFamily:'PingFangSC-Regular',
        color:'#F66A85'
    },
    press_button:{
        backgroundColor: '#FFFFFF'
    },
    unpress_button:{
        backgroundColor: '#F66A85',
    },
    app_name:{

    },
    statusbar:{
        flex:1,
    },
    pic_suda:{

    }
});

const SimpleTabNavigator = TabNavigator(
    {
        首页: {
            screen: ZhiBoScreen,
        },
        Notifications: {
            screen: MyNotificationsScreen,
        },
        Notifica: {
            screen: MyNotifiScreen,
        },
    },
    {
        tabBarPosition: 'bottom',
        swipeEnabled: false, // 禁止左右滑动
        tabBarOptions: {
            activeTintColor: '#FF0000',
            inactiveTintColor: '#2B2B2B', // 文字和图片默认颜色
            showIcon: true,
            indicatorStyle: {height: 0},
            style: {
                backgroundColor: '#FFFFFF', // TabBar 背景色
                height:0
            },
            labelStyle: {
                fontSize: 11, // 文字大小
            },
            tabStyle:{
                height:70
            }
        },
    }
);

export default SimpleTabNavigator;