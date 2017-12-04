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
import Zhibo_Tab from '../hometab/Zhibo_Tabs'
import News_Tab from '../hometab/News_Tabs'
import FlatList_All from '../homepage/FlatList_All'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            selectedIndices: [0],
            customStyleIndex: 1,
        }
    }

    static navigationOptions = {
        tabBarLabel: 'Notifications',
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
                        values={['直播', '新闻', '狂言NBA']}
                        selectedIndex={this.state.customStyleIndex}
                        onTabPress={this.handleCustomIndexSelect}
                        borderRadius={8}
                        tabsContainerStyle={{ height: 30, backgroundColor: '#F66A85',width:258,alignSelf:'center'}}
                        tabStyle={{ backgroundColor: '#F66A85', borderWidth: 0,borderColor:'#FFFFFF', borderStyle :'solid',borderWidth:1, }}
                        activeTabStyle={{ backgroundColor: 'white', marginTop: 0, }}
                        tabTextStyle={{ color: '#FFFFFF'}}
                        activeTabTextStyle={{ color: '#F66A85' }} />
                </View>

                <View style={styles.container}>
                    {this.state.customStyleIndex === 0 &&
                        <View style={styles.container}>
                            <Zhibo_Tab></Zhibo_Tab>
                        </View>
                    }
                    {this.state.customStyleIndex === 1 &&
                        <View style={styles.container}>
                            <News_Tab></News_Tab>
                        </View>
                    }
                    {this.state.customStyleIndex === 2 &&
                    <View style={styles.tabContent}><Text>333</Text></View>}
                </View>
            </View>
        );
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
        backgroundColor:'#F66A85'
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
