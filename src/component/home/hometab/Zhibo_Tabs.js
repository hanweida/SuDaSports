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
    Dimensions
} from 'react-native'

import Zhibo_NBA from './Zhibo_NBA'
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
        var deviceWidthDp = Dimensions.get('window').width;
        return (
            <View style={styles.container}>
                <View style={styles.tab}>
                    <SegmentedControlTab
                        values={['NBA赛事','所有赛事']}
                        selectedIndex={this.state.customStyleIndex}
                        onTabPress={this.handleCustomIndexSelect}
                        borderRadius={0}
                        tabsContainerStyle={{height: 30,backgroundColor: '#FFFFFF',width: deviceWidthDp,alignSelf:'center'}}
                        tabStyle={{ backgroundColor: '#FFFFFF',borderWidth:0.5,borderColor:'#DFDFDF' }}
                        activeTabStyle={{ backgroundColor: 'white', marginTop: 0, }}
                        tabTextStyle={{ color: '#000000'}}
                        activeTabTextStyle={{ color: '#2979FF' }} />
                </View>

                <View style={styles.container}>
                    {this.state.customStyleIndex === 0 &&
                        <View style={styles.container}>
                            <Zhibo_NBA></Zhibo_NBA>
                        </View>
                    }
                    {this.state.customStyleIndex === 1 &&
                    <View style={styles.container}>
                        <FlatList_All></FlatList_All>
                    </View>
                    }
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

