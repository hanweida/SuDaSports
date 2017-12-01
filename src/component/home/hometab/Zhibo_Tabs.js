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
import Zhibo_All from './Zhibo_All'
import FlatList_All from '../homepage/FlatList_All'
import SegmentedControlTab from 'react-native-segmented-control-tab'

/** 直播Tab选项*/
export default class Zhibo_Tabs extends Component{
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            selectedIndices: [0],
            customStyleIndex: 1,
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
                        values={['全部', 'NBA']}
                        selectedIndex={this.state.customStyleIndex}
                        onTabPress={this.handleCustomIndexSelect}
                        borderRadius={0}
                        tabsContainerStyle={{ height: 44, backgroundColor: '#FFFFFF',width:360,alignSelf:'center'}}
                        tabStyle={{ backgroundColor: '#FFFFFF',borderWidth:1,borderColor:'#DFDFDF' }}
                        activeTabStyle={{ backgroundColor: 'white', marginTop: 0, }}
                        tabTextStyle={{ color: '#000000'}}
                        activeTabTextStyle={{ color: '#F66A85' }} />
                </View>

                <View style={styles.container}>
                    {this.state.customStyleIndex === 0 &&
                    <View style={styles.container}>
                        <FlatList_All></FlatList_All>
                    </View>
                    }
                    {this.state.customStyleIndex === 1 &&
                    <View style={styles.tabContent}><Text>222</Text></View>}
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
        justifyContent:'center',
        backgroundColor:'#000000',
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
})

