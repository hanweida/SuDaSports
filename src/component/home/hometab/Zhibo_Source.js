'use strict';
import React, {Component} from 'react';
import {
    FlatList,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TouchableOpacity,
    NativeModules,
    Dimensions,
    SectionList
} from 'react-native';


export default class Zhibo_Source extends React.PureComponent{

    static navigationOptions = ({navigation}) => ({
        title: '标题',
        headerTitleStyle: {fontSize: 18, color: 'red'},
        headerStyle: {height: 40},
    });

    render(){
        //赋值为navi

        //alert(navi.state.params.item.guest_team);

        //获取navigation的属性方法，navigate,goBack,state都是navigation的方法
        //const {navigate,goBack,state} = this.props.navigation;
        //alert(state.params.item.guest_team);
        const navi = this.props.navigation;
        const {navigate,goBack,state} = navi;
        alert(state.params.item.guest_team);
        return(
            <View>
                <Text>
                    Zhibo_Source
                </Text>
            </View>
        );
    }
}