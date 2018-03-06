/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component,PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    NativeModules,
    processColor,
    WebView,
    Image
} from 'react-native';

import SegmentedControlTab from 'react-native-segmented-control-tab'
import ScrollableTabView  from 'react-native-scrollable-tab-view';
import Zhibo_Tabs from '../hometab/Zhibo_Tabs'
import Zhibo_NBA from '../hometab/Zhibo_NBA'
import Zhibo_Source from '../hometab/Zhibo_Source'
import Recommend_Tab from '../hometab/Recommend_Tab'
import Video_Tab from '../hometab/Video_Tab'
import News_Tab from '../hometab/News_Tabs'
import FlatList_All from '../homepage/FlatList_All'

import {StackNavigator, TabNavigator} from "react-navigation"

class naviHome extends Component{
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            selectedIndices: [0],
            customStyleIndex: 1,
        }
    }

    static navigationOptions = {
        tabBarLabel: '首页',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('../../../img/tab_icon_home_sel@2x.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    handleSingleIndexSelect = (index) => {
        this.setState({
            ...this.state,
            selectedIndex: index,
        });
    }

    handleMultipleIndexSelect = (index) => {
        if (this.state.selectedIndices.includes(index)) {
            this.setState({
                ...this.state,
                selectedIndices: this.state.selectedIndices.filter((i) => i !== index),
            });
        }
        else {
            this.setState({
                ...this.state,
                selectedIndices: [
                    ...this.state.selectedIndices,
                    index,
                ],
            });
        }
    }

    handleCustomIndexSelect = (index) => {
        this.setState({
            ...this.state,
            customStyleIndex: index,
        });
    }

    componentDidMount() {
        this.handleCustomIndexSelect(0);
    }

    componentWillMount() {
        this.setState({
            customStyleIndex: 1,
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.tab}>
                    <SegmentedControlTab
                        values={['推荐','直播', '视频', '新闻']}
                        selectedIndex={this.state.customStyleIndex}
                        onTabPress={this.handleCustomIndexSelect}
                        borderRadius={8}
                        tabsContainerStyle={{ height: 30, backgroundColor: '#FFFFFF',width:258,alignSelf:'center'}}
                        tabStyle={{ backgroundColor: '#FFFFFF', borderWidth: 0,borderColor:'#E7E7E7', borderStyle :'solid',borderWidth:1, }}
                        activeTabStyle={{ backgroundColor: 'white', marginTop: 0, }}
                        tabTextStyle={{ color: '#000000'}}
                        activeTabTextStyle={{ color: '#2979FF' }} />
                </View>

                <View style={styles.container}>
                    {this.state.customStyleIndex === 0 &&
                    <View style={styles.container}>
                        <Recommend_Tab></Recommend_Tab>
                    </View>
                    }
                    {this.state.customStyleIndex === 1 &&
                    <View style={styles.container}>
                        <Zhibo_NBA prop={this.props}></Zhibo_NBA>
                    </View>
                    }
                    {this.state.customStyleIndex === 2 &&
                    <View style={styles.container}>
                        <Video_Tab></Video_Tab>
                    </View>
                    }
                    {this.state.customStyleIndex === 3 &&
                    <View style={styles.container}>
                        <News_Tab></News_Tab>
                    </View>
                    }
                </View>
            </View>
        );
    }
}

const RouteConfigs = {
    naviHome: {
        screen: naviHome // screen属性为必须配置属性
    },
    Zhibo_Source: {
        screen: Zhibo_Source ,
        navigationOptions: {
            title: '标题',
            headerTitleStyle: {fontSize: 18, color: 'red'},
            headerStyle: {height: 40},
        },
    },

}

const StackNavigatorConfig = {
    initialRouteName: 'naviHome',
    initialRouteParams: {initPara: '初始页面参数'},
    navigationOptions: {
        title: '标题',
        headerTitleStyle: {fontSize: 18, color: 'red'},
        headerStyle: {height: 0},
    },
    paths: 'page/main',
    mode: 'card',
    headerMode: 'screen',
    cardStyle: {backgroundColor: "#ffffff"},
    transitionConfig: (() => ({
    })),
    onTransitionStart: (() => {
        console.log('页面跳转动画开始')
    }),
    onTransitionEnd: (() => {
        console.log('页面跳转动画结束')
    }),
}
const Navigator = StackNavigator(RouteConfigs, StackNavigatorConfig)
export default class Home extends Component {
    render() {
        return (
            <Navigator/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    tab:{
        flexDirection:'row',
        height: 48,
        justifyContent:'center',
        borderBottomColor:'#F66A85',
        backgroundColor:'#FFFFFF'
    },
    tabViewText: {
        color: '#444444',
        fontWeight: 'bold',
        marginTop: 50,
        fontSize: 18
    },
    titleText: {
        color: '#444444',
        padding: 20,
        fontSize: 14,
        fontWeight: '500'
    },
    headerText: {
        padding: 8,
        fontSize: 14,
        color: '#444444'
    },
    tabContent: {
        backgroundColor: '#000000',
        flexGrow:1
    },
    Seperator: {
        marginHorizontal: -10,
        alignSelf: 'stretch',
        borderTopWidth: 1,
        borderTopColor: '#888888',
        marginTop: 24
    }
})
