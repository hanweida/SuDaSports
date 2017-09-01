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

import SimpleTabNavigator  from './SimpleTabNavigator';
import FlatList_All  from './home/homepage/FlatList_All';
export default class Footer extends Component{
    constructor(props) {
        super(props);
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
  };

  render() {
    return (
        <SimpleTabNavigator
            style={styles.container}
        >
        </SimpleTabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  center:{
    flex:1
  },
});
