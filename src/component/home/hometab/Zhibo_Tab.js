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

export default class Zhibo_Tab extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['全部', 'NBA'],
        };
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            //BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);

            // BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    componentWillUnmount() {
        // if (Platform.OS === 'android') {
        //     BackAndroid.addEventListener('hardwareBackPress', function() {
        //         this.onBackAndroid;
        //         return true;
        //     });
        // }
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
        return (
            <ScrollableTabView
                renderTabBar={() => <FootCustom tabNames={tabNames}  />}
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
                    <Text>dddddd</Text>
                </View>
                <View tabLabel="2" style={styles.center}>
                    <View>
                        <Text>dddddd</Text>
                    </View>
                </View>
            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    footer:{
        borderTopColor :'#FC4035',
        borderTopWidth:1,
        height: 2
    },
    center:{

        flex:1
    },
    button: {
        padding: 5,
        margin: 5,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'grey',
    }

});
